import { HIRO_STATUS } from '@/types/hiro-status';
import { WALLET_STATUS } from '@/types/wallet-status';

export interface IHiroOverlayProps {
    message: string;
    status: HIRO_STATUS;
    appWalletStatus: WALLET_STATUS | null;
}
