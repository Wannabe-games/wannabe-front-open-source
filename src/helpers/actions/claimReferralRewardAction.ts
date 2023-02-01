import { toast } from 'react-toastify';

import * as msg from '@/constants';
import { claimReferralReward } from '@/helpers/blockchain/claim-referral-reward';
import { ReferralPoolWithdrawOut } from '@/interfaces/contract/ReferralPoolWithdrawOut';
import { store } from '@/store';
import { creatureRacerApi } from '@/store/services/creatureRacer.service';
import { stacksApi } from '@/store/services/stacks.service';

import { promiseRetry } from '../promise-retry';

export const claimReferralRewardAction = async () => {
    const notifyId = toast.loading('Please wait...', { toastId: 1 });
    const wallet = store.getState().account.user.wallet;

    try {
        const exposure = await store.dispatch(
            creatureRacerApi.endpoints.referralPoolWithdraw.initiate(null),
        );

        console.log(exposure);

        if (!('data' in exposure)) {
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

        const finishedTx = await claimReferralReward(exposure.data as ReferralPoolWithdrawOut);

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

        toast.update(notifyId, {
            render: msg.FINALIZING,
        });

        const transaction = await promiseRetry(() => fetchTransaction(), Infinity, 3500);

        if (!transaction || transaction.tx.tx_status !== 'success') {
            throw new Error(msg.TRANSACTION_FAILED);
        }

        toast.update(notifyId, {
            render: 'Referral reward claimed!',
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
