import { HIRO_STATUS } from '@/types/hiro-status';
import { WALLET_STATUS } from '@/types/wallet-status';

const { VITE_STACKS_CHAIN_ID, VITE_STACKS_NETWORK } = import.meta.env;

export const appConnectionStatus = (walletStatus: WALLET_STATUS) => {
    switch (walletStatus) {
        case WALLET_STATUS.CONFLICT:
            return 'This is not a wallet associated with your account. Please switch Hiro account and try again.';
        case WALLET_STATUS.WRONG_NETWORK:
            return `Wrong network. Please switch Hiro network to ${VITE_STACKS_NETWORK} (${VITE_STACKS_CHAIN_ID}) and try again.`;
    }
};

export const walletConnectionStatus = (status: HIRO_STATUS) => {
    switch (status) {
        case HIRO_STATUS.UNAVAILABLE:
            return 'Please install Hiro to continue.';
        case HIRO_STATUS.NOT_CONNECTED:
            return 'Please connect to Hiro to continue.';
        case HIRO_STATUS.CONNECTING:
            return 'You have a pending connection request. Please check your Hiro extension.';
        default:
            return '';
    }
};
