import { useEffect, useMemo, useState } from 'react';

import { walletConnectionStatus } from '@/helpers/stacks/wallet-status';
import { useTypedSelector } from '@/store';
import { selectCurrentUserWalletId } from '@/store/slices/account.slice';
import { selectIsAuthenticated } from '@/store/slices/auth.slice';
import { HIRO_STATUS } from '@/types/hiro-status';
import { WALLET_STATUS } from '@/types/wallet-status';
import { useAccount, useAuth, useNetwork } from '@micro-stacks/react';

const { VITE_STACKS_CHAIN_ID } = import.meta.env;

const hasStacksProvider = () => window.StacksProvider;

export const useConnectToWallet = () => {
    const isAuthenticated = useTypedSelector(selectIsAuthenticated);
    const userWallet = useTypedSelector(selectCurrentUserWalletId);
    const { openAuthRequest, isRequestPending, isSignedIn } = useAuth();
    const { stxAddress } = useAccount();
    const { network } = useNetwork();

    const [appWalletStatus, setAppWalletStatus] = useState<WALLET_STATUS | null>(null);

    useEffect(() => {
        if (isAuthenticated && userWallet) {
            const requestWallet = async () => {
                if (!isSignedIn) {
                    await openAuthRequest();
                }
            };

            requestWallet();
        }
    }, [isAuthenticated, userWallet, isSignedIn, openAuthRequest]);

    useEffect(() => {
        if (userWallet) {
            if (network.chainId && network.chainId != Number(VITE_STACKS_CHAIN_ID)) {
                setAppWalletStatus(WALLET_STATUS.WRONG_NETWORK);
                return;
            }

            if (stxAddress === userWallet) {
                setAppWalletStatus(WALLET_STATUS.CONNECTED);
                return;
            }

            setAppWalletStatus(WALLET_STATUS.CONFLICT);
        } else {
            setAppWalletStatus(null);
        }
    }, [userWallet, stxAddress, network.chainId]);

    const getHiroStatus = useMemo(() => {
        if (!hasStacksProvider()) {
            return HIRO_STATUS.UNAVAILABLE;
        }

        if (isRequestPending) {
            return HIRO_STATUS.CONNECTING;
        }

        if (isSignedIn) {
            return HIRO_STATUS.CONNECTED;
        }

        return HIRO_STATUS.NOT_CONNECTED;
    }, [isRequestPending, isSignedIn]);

    return {
        status: getHiroStatus,
        message: walletConnectionStatus(getHiroStatus),
        appWalletStatus,
        wallet: userWallet,
        isConnected: appWalletStatus === WALLET_STATUS.CONNECTED,
    };
};
