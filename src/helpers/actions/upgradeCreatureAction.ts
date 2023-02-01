import ReactGA from 'react-ga4';
import { toast } from 'react-toastify';

import * as msg from '@/constants';
import { startPayment } from '@/helpers/blockchain/send-transaction';
import { checkBalance } from '@/helpers/stacks/balance';
import { updateCoinBalance } from '@/helpers/update-coin-balance';
import { store } from '@/store';
import { creatureRacerApi } from '@/store/services/creatureRacer.service';
import { stacksApi } from '@/store/services/stacks.service';

import { promiseRetry } from '../promise-retry';

interface IUpgradeAction {
    stacks: number;
    gold: number;
    upgradeCreatureParams: {
        type: string;
        level: number;
        creatureId: string;
    };
}

export const upgradeCreatureAction = async ({
    stacks,
    gold,
    upgradeCreatureParams,
}: IUpgradeAction) => {
    const notifyId = toast.loading(msg.CHECKING_BALANCE, { toastId: 1 });
    const wallet = store.getState().account.user.wallet;

    try {
        const hasFunds = await checkBalance({ stacks, gold });

        if (!hasFunds) {
            toast.update(notifyId, {
                render: msg.INSUFFICIENT_FUNDS,
                type: 'warning',
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

        const finishedTx = await startPayment(stacks);

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

        updateCoinBalance(stacks);

        toast.update(notifyId, {
            render: msg.FINALIZING,
        });

        const upgradeCreatureApiResponse = await store.dispatch(
            creatureRacerApi.endpoints.upgradeCreature.initiate(upgradeCreatureParams),
        );

        if ('data' in upgradeCreatureApiResponse) {
            const { creatureId } = upgradeCreatureApiResponse.data;

            ReactGA.event({ category: 'Creature', action: 'upgrade' });
            toast.update(notifyId, {
                render: msg.PURCHASE_COMPLETED,
                type: 'success',
                isLoading: false,
                autoClose: 5000,
            });

            return creatureId;
        }

        throw upgradeCreatureApiResponse;
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
            autoClose: 10000,
        });
    }
};
