import { broadcastTransaction, deserializeTransaction } from 'micro-stacks/transactions';
import { useState } from 'react';
import { toast } from 'react-toastify';

import * as msg from '@/constants';
import { promiseRetry } from '@/helpers/promise-retry';
import { store, useTypedDispatch } from '@/store';
import {
    creatureRacerApi,
    useReferralNFTAddMutation,
} from '@/store/services/creatureRacer.service';
import { stacksApi } from '@/store/services/stacks.service';
import { useNetwork } from '@micro-stacks/react';

import { useMintNFTReferral } from './stacks/useMintNFTReferral';

const toastId = 'rnft-toast-id';

export const useHandleMintNftReferral = () => {
    const dispatch = useTypedDispatch();
    const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [referralNFTAdd] = useReferralNFTAddMutation();
    const { handleOpenContractCall } = useMintNFTReferral();
    const { network } = useNetwork();
    const wallet = store.getState().account.user.wallet;

    const submitAction = async ({ refCode }: { refCode: string }) => {
        setIsLoading(true);
        const notifyId = toast.loading('Please wait...', { toastId });

        const { data: refCodeResponse, error: refCodeError } = await dispatch(
            creatureRacerApi.endpoints.getValidateRefCode.initiate(refCode),
        );

        if (refCodeError) {
            toast.update(notifyId, {
                render: 'Oops! Please try again later.',
                type: 'error',
                isLoading: false,
                autoClose: 10000,
            });

            return;
        }

        if (!refCodeResponse?.unique) {
            toast.update(notifyId, {
                render: 'This referral code is already in use.',
                type: 'error',
                isLoading: false,
                autoClose: 5000,
            });

            return;
        }

        toast.update(notifyId, {
            render: 'Waiting for confirmation',
            type: 'info',
            isLoading: true,
        });

        await handleOpenContractCall({
            refCode,
            onFinish: async (data) => {
                try {
                    const { txId, txRaw } = data;

                    const tranaction = deserializeTransaction(txRaw);
                    const result = await broadcastTransaction(tranaction, network);

                    if ('error' in result) {
                        throw new Error('Oops! Please try again later.');
                    }

                    const fetchTransaction = async () => {
                        const getTransaction = dispatch(
                            stacksApi.endpoints.getTransaction.initiate(
                                { txId, wallet },
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
                        render: 'Waiting for confirmation from blockchain',
                    });

                    const transaction = await promiseRetry(
                        () => fetchTransaction(),
                        Infinity,
                        3500,
                    );

                    if (!transaction || transaction.tx.tx_status !== 'success') {
                        throw new Error(msg.TRANSACTION_FAILED);
                    }

                    const referralNFTAddResponse = await referralNFTAdd({
                        rNftHash: data.txId,
                        refCode,
                    });

                    if (!('data' in referralNFTAddResponse)) {
                        throw new Error('Error! Please contact us.');
                    }

                    toast.update(notifyId, {
                        render: 'Referral code minted!',
                        type: 'success',
                        isLoading: false,
                        autoClose: 5000,
                    });

                    setIsSuccessfullySubmitted(true);
                } catch (error) {
                    let message = 'Oops! Please try again later.';

                    if (error instanceof Error) {
                        message = error.message;
                    }

                    toast.update(notifyId, {
                        render: message,
                        type: 'error',
                        isLoading: false,
                        autoClose: 10000,
                    });
                } finally {
                    setIsLoading(false);
                }
            },
            onCancel: async () => {
                toast.dismiss(notifyId);
                setIsLoading(false);
            },
        });

        setIsLoading(false);
    };

    return {
        isLoading,
        isSuccessfullySubmitted,
        submitAction,
    };
};
