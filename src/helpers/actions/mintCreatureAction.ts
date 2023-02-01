import { toast } from 'react-toastify';

import * as msg from '@/constants';
import { mintCreature } from '@/helpers/blockchain/mint-creature';
import { checkBalance } from '@/helpers/stacks/balance';
import { updateCoinBalance } from '@/helpers/update-coin-balance';
import { CreatureMintIn } from '@/interfaces/contract/CreatureMintIn';
import { store } from '@/store';
import { creatureRacerApi } from '@/store/services/creatureRacer.service';
import { stacksApi } from '@/store/services/stacks.service';

import { promiseRetry } from '../promise-retry';

const { VITE_MINT_COST: STACKS_MINT_COST } = import.meta.env;

export const mintCreatureAction = async (creatureId: string, name?: string, royalties = 0) => {
    const notifyId = toast.loading(msg.CHECKING_BALANCE, { toastId: 1 });
    const wallet = store.getState().account.user.wallet;

    try {
        const hasFunds = await checkBalance({ stacks: STACKS_MINT_COST });

        if (!hasFunds) {
            toast.update(notifyId, {
                render: msg.INSUFFICIENT_FUNDS,
                type: 'warning',
                isLoading: false,
                autoClose: 5000,
            });

            return;
        }

        const exposure = await store.dispatch(
            creatureRacerApi.endpoints.creatureExposureMetadata.initiate({ creatureId }),
        );

        const sign = await store.dispatch(
            creatureRacerApi.endpoints.signCreature.initiate({ creatureId }),
        );

        if (!('data' in exposure) || !('data' in sign)) {
            toast.update(notifyId, {
                render: msg.STH_WENT_WRONG_TRY_AGAIN,
                type: 'error',
                isLoading: false,
                autoClose: 5000,
            });

            return;
        }

        toast.update(notifyId, {
            render: msg.WAITING_FOR_CONFIRMATION,
            type: 'info',
            isLoading: true,
        });

        const { nftId } = exposure.data;

        const finishedTx = await mintCreature(sign.data);

        if (!finishedTx) {
            throw new Error(msg.TRANSACTION_FAILED);
        }

        const fetchTransaction = async () => {
            const getTransaction = store.dispatch(
                stacksApi.endpoints.getTransaction.initiate(
                    { txId: finishedTx.txId, wallet },
                    {
                        forceRefetch: true,
                    },
                ),
            );

            const { data: transaction } = await getTransaction;

            console.log(transaction, 'transaction');

            if (!transaction) {
                getTransaction.refetch();
                throw '';
            }

            return transaction;
        };

        const transaction = await promiseRetry(() => fetchTransaction(), Infinity, 3500);

        if (!transaction || transaction.tx.tx_status !== 'success') {
            throw new Error(msg.TRANSACTION_FAILED);
        }

        updateCoinBalance(STACKS_MINT_COST);

        toast.update(notifyId, {
            render: msg.FINALIZING,
        });

        const mintParams: CreatureMintIn = {
            creatureId,
            contract: nftId,
            hash: finishedTx.txId,
        };

        await store.dispatch(creatureRacerApi.endpoints.creatureMint.initiate(mintParams));

        if (name && royalties) {
            await store.dispatch(
                creatureRacerApi.endpoints.creatureNFTName.initiate({
                    name,
                    royalties,
                    contract: nftId,
                }),
            );
        }

        toast.update(notifyId, {
            render: msg.CREATURE_MINTED,
            type: 'success',
            isLoading: false,
            autoClose: 5000,
        });
    } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const err = e as any;
        let errorMessage = err?.message || msg.STH_WENT_WRONG;

        if (err && 'data' in err) {
            const { title } = err.data;
            errorMessage = title;
        }

        toast.update(notifyId, {
            render: errorMessage,
            type: 'error',
            isLoading: false,
            autoClose: 5000,
        });
    }
};
