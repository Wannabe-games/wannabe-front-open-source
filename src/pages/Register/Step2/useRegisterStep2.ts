import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { signMessage } from '@/helpers/blockchain/sign-message';
import { ROUTE } from '@/routing/routes.types';
import { useTypedDispatch, useTypedSelector } from '@/store';
import {
    creatureRacerApi,
    useRefCodeAddMutation,
    useWalletAddMutation,
} from '@/store/services/creatureRacer.service';
import { AccountState } from '@/store/slices/account.slice';
import { ApiError } from '@/types/error';
import { useAuth, useNetwork } from '@micro-stacks/react';

const toastId = 'step2-toast';

// TODO: handle isLoading states
export const useRegisterStep2 = () => {
    const dispatch = useTypedDispatch();
    const { user } = useTypedSelector<AccountState>((state) => state.account);
    const [walletAdd, { error }] = useWalletAddMutation();
    const [refCodeAdd] = useRefCodeAddMutation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPendingRequest, setIsPendingRequest] = useState(false);
    const navigate = useNavigate();
    const { openAuthRequest, isSignedIn } = useAuth();

    const fromReferral = user?.fromReferralNft?.refCode;
    const isConnected = isSignedIn && !error && !!user?.wallet;

    const isConnectButtonDisabled = isPendingRequest || isConnected;

    const { isMainnet } = useNetwork();

    const handleAddWallet = () => async () => {
        toast.dismiss(toastId);

        setIsPendingRequest(true);

        try {
            await openAuthRequest({
                onFinish: async (payload) => {
                    const { mainnet: mainnetWallet, testnet: testnetWallet } = payload.addresses;
                    const walletAddress = isMainnet ? mainnetWallet : testnetWallet;

                    try {
                        const signatureData = await signMessage(
                            'Please sign this message to continue the registration process',
                        );

                        if (!signatureData) {
                            return;
                        }

                        const walletAddResponse = await walletAdd({
                            wallet: walletAddress,
                            publicKey: signatureData.publicKey,
                        }).unwrap();

                        if (!walletAddResponse?.status) {
                            throw walletAddResponse;
                        }

                        toast.success('Connected to Hiro', { toastId });
                    } catch (err) {
                        let message = '';

                        if (err instanceof Error) {
                            message = err.message;
                        }

                        message =
                            (err as ApiError)?.data?.title ||
                            'Something went wrong. Please contact us';

                        toast(message, {
                            toastId,
                            type: 'error',
                        });
                    } finally {
                        setIsPendingRequest(false);
                    }
                },
                onCancel: async () => {
                    setIsPendingRequest(false);
                },
            });
        } catch (err) {
            toast.error('Error. No Stacks wallet available.', { toastId });
            setIsPendingRequest(false);
        }
    };

    const contentByStatus = useMemo(() => {
        if (isConnected) {
            return 'Connected to Hiro';
        }

        if (isPendingRequest) {
            return 'Connecting...';
        }

        if (error) {
            return 'Switch account';
        }

        return 'Connect wallet';
    }, [error, isConnected, isPendingRequest]);

    const onSubmit = async ({ refCode }: { refCode?: string }) => {
        setIsSubmitting(true);

        if (!refCode || fromReferral) {
            navigate(ROUTE.REGISTER_STEP3);

            return;
        }

        try {
            const { data: refCodeResponse, error: refCodeError } = await dispatch(
                creatureRacerApi.endpoints.getValidateRefCode.initiate(refCode),
            );

            if (refCodeResponse?.unique) {
                throw new Error('Referral code does not exist.');
            }

            if (refCodeError) {
                throw '';
            }

            const refCodeAddResponse = await refCodeAdd({ refCode }).unwrap();

            if (refCodeAddResponse.status !== 'success') {
                throw '';
            }

            navigate(ROUTE.REGISTER_STEP3);
        } catch (e) {
            let message = 'Something went wrong. Please contact us.';

            if (e instanceof Error) {
                message = e.message;
            }

            toast.error(message, {
                toastId,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        contentByStatus,
        handleAddWallet,
        isConnectButtonDisabled,
        isSubmitting,
        isSubmitButtonDisabled: isSubmitting || !isConnected,
        fromReferral,
        onSubmit,
    };
};
