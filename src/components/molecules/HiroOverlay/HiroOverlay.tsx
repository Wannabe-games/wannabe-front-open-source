import { appConnectionStatus } from '@/helpers/stacks/wallet-status';
import { useLogout } from '@/hooks/auth/useLogout';
import { HIRO_STATUS } from '@/types/hiro-status';
import { WALLET_STATUS } from '@/types/wallet-status';
import { useAuth } from '@micro-stacks/react';

import { Button } from '../Short/Short.styles';
import * as Styled from './HiroOverlay.styles';
import { IHiroOverlayProps } from './HiroOverlay.types';

export const HiroOverlay = ({ message, status, appWalletStatus }: IHiroOverlayProps) => {
    const { openAuthRequest } = useAuth();
    const { logout } = useLogout();

    const handleOpenAuthRequest = async () => {
        await openAuthRequest();
    };

    const renderMessage = () => {
        const label =
            appWalletStatus === WALLET_STATUS.CONFLICT ? 'Switch Hiro account' : 'Connect Hiro';
        const content =
            appWalletStatus === WALLET_STATUS.CONFLICT
                ? appConnectionStatus(appWalletStatus)
                : message;

        if (
            status === HIRO_STATUS.CONNECTING ||
            status === HIRO_STATUS.NOT_CONNECTED ||
            appWalletStatus === WALLET_STATUS.CONFLICT
        ) {
            return (
                <>
                    {content}
                    <Button label={label} primary onClick={handleOpenAuthRequest} />
                </>
            );
        }

        const walletStatusMessage = appWalletStatus && appConnectionStatus(appWalletStatus);

        return walletStatusMessage || message;
    };

    return (
        <Styled.Overlay>
            <Styled.Wrapper>
                {renderMessage()}
                <Button primary label="Logout" onClick={() => logout()} />
            </Styled.Wrapper>
        </Styled.Overlay>
    );
};
