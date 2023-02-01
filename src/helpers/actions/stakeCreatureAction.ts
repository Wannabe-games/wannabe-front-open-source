import { toast } from 'react-toastify';

import * as msg from '@/constants';
import { approveForTransfer, stakeCreature } from '@/helpers/blockchain/stake-creature';
import { store } from '@/store';
import { creatureRacerApi } from '@/store/services/creatureRacer.service';
import { stacksApi } from '@/store/services/stacks.service';

import { promiseRetry } from '../promise-retry';

interface IStakeAction {
    creatureId: string;
    nftId: string;
    stake: boolean;
}

const toastId = 'stake-toast';

export const stakeCreatureAction = async ({ creatureId, stake }: IStakeAction) => {
    const wallet = store.getState().account.user.wallet;

    toast('Please wait...', {
        toastId,
        isLoading: true,
    });

    if (toast.isActive(toastId)) {
        toast.update(toastId, {
            isLoading: true,
            render: 'Please wait...',
        });
    }

    try {
        const sign = await store.dispatch(
            creatureRacerApi.endpoints.signCreature.initiate({ creatureId }),
        );

        if (!('data' in sign)) {
            throw '';
        }

        toast.update(toastId, { render: 'Please confirm transaction 1/2' });

        const { nftId, address } = sign.data;

        const approveTx = await approveForTransfer(nftId);

        if (!approveTx) {
            throw new Error(msg.TRANSACTION_FAILED);
        }

        toast.update(toastId, { render: 'Waiting for confirmation 1/2' });

        const fetchTransaction = async () => {
            const getTransaction = store.dispatch(
                stacksApi.endpoints.getTransaction.initiate(
                    { txId: approveTx, wallet },
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

        toast.update(toastId, {
            render: 'Waiting for confirmation 2/2',
        });

        toast.update(toastId, { render: 'Please confirm transaction 2/2' });

        const stakeTx = await stakeCreature(nftId, address);

        if (!stakeTx) {
            throw new Error(msg.TRANSACTION_FAILED);
        }

        toast.update(toastId, { render: 'Waiting for confirmation 2/2' });

        const fetchStakeTransaction = async () => {
            const getTransaction = store.dispatch(
                stacksApi.endpoints.getTransaction.initiate({ txId: stakeTx.txId, wallet }),
            );

            const { data: transaction } = await getTransaction;

            console.log(transaction, 'transaction');

            if (!transaction) {
                getTransaction.refetch();
                throw '';
            }

            return transaction;
        };

        const stakeTransaction = await promiseRetry(() => fetchStakeTransaction(), Infinity, 3500);

        if (!stakeTransaction || stakeTransaction.tx.tx_status !== 'success') {
            throw new Error(msg.TRANSACTION_FAILED);
        }

        toast.update(toastId, {
            render: msg.FINALIZING,
        });

        const creatureIdResponse = await store.dispatch(
            creatureRacerApi.endpoints.creatureStake.initiate({ creatureId, stake }),
        );

        if ('data' in creatureIdResponse) {
            toast.update(toastId, {
                render: msg.CREATURE_STAKED,
                type: 'success',
                isLoading: false,
                autoClose: 5000,
            });

            return creatureIdResponse.data;
        }

        throw creatureIdResponse;
    } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const err = e as any;
        let errorMessage = err?.message || msg.STH_WENT_WRONG;

        if (err && 'data' in err) {
            const { title } = err.data;
            errorMessage = title;
        }

        toast.update(toastId, {
            render: errorMessage,
            type: 'error',
            isLoading: false,
            autoClose: 5000,
        });
    }
};
