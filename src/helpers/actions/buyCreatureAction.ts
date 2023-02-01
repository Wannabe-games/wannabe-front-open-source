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

interface IPaymentAction {
    priceMicroStx: number;
    gold: number;
    type: string;
}

export const buyCreatureAction = async ({ priceMicroStx, gold, type }: IPaymentAction) => {
    const notifyId = toast.loading(msg.CHECKING_BALANCE, { toastId: 1 });
    const wallet = store.getState().account.user.wallet;

    try {
        const hasFunds = await checkBalance({ stacks: priceMicroStx, gold });

        if (!hasFunds) {
            toast.update(notifyId, {
                render: msg.INSUFFICIENT_FUNDS,
                type: toast.TYPE.WARNING,
                autoClose: 5000,
                isLoading: false,
            });

            return;
        }

        toast.update(notifyId, {
            render: msg.WAITING_FOR_CONFIRMATION,
            type: 'info',
            isLoading: true,
        });

        const finishedTx = await startPayment(priceMicroStx);

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

        updateCoinBalance(priceMicroStx);

        toast.update(notifyId, {
            render: msg.FINALIZING,
        });

        const buyResponse = await store.dispatch(
            creatureRacerApi.endpoints.buyCreature.initiate({ type }),
        );

        if ('data' in buyResponse) {
            ReactGA.event({ category: 'Purchase', action: 'mint' });
            toast.update(notifyId, {
                render: msg.PURCHASE_COMPLETED,
                type: 'success',
                isLoading: false,
                autoClose: 5000,
            });

            return buyResponse.data;
        }

        throw buyResponse;
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
