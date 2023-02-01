import { toast } from 'react-toastify';

import * as msg from '@/constants';
import { unstakeCreature } from '@/helpers/blockchain/unstake-creature';
import { store } from '@/store';
import { creatureRacerApi } from '@/store/services/creatureRacer.service';
import { stacksApi } from '@/store/services/stacks.service';

import { promiseRetry } from '../promise-retry';

interface IUnstakeAction {
    creatureId: string;
    nftId: number;
}

const toastId = 'unstake-toast';

export const unstakeCreatureAction = async ({ creatureId, nftId }: IUnstakeAction) => {
    const wallet = store.getState().account.user.wallet;

    toast(msg.WAITING_FOR_CONFIRMATION, {
        toastId,
        isLoading: true,
    });

    if (toast.isActive(toastId)) {
        toast.update(toastId, {
            isLoading: true,
            render: msg.WAITING_FOR_CONFIRMATION,
        });
    }

    try {
        toast.update(toastId, {
            render: msg.WAITING_FOR_CONFIRMATION,
            isLoading: true,
        });

        const unstakeTx = await unstakeCreature(nftId);

        if (!unstakeTx) {
            throw new Error(msg.TRANSACTION_FAILED);
        }

        toast.update(toastId, {
            render: msg.PLEASE_WAIT,
        });

        const fetchTransaction = async () => {
            const getTransaction = store.dispatch(
                stacksApi.endpoints.getTransaction.initiate(
                    { txId: unstakeTx.txId, wallet },
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
            render: msg.FINALIZING,
        });

        const creatureIdResponse = await store.dispatch(
            creatureRacerApi.endpoints.creatureStake.initiate({ creatureId, stake: false }),
        );

        if ('data' in creatureIdResponse) {
            toast.update(toastId, {
                render: msg.CREATURE_UNSTAKED,
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
