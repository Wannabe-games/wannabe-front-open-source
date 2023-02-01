import { useEffect, useState } from 'react';

import { HiroOverlay } from '@/components/molecules/HiroOverlay';
import { useLogout } from '@/hooks/auth/useLogout';
import { useConnectToWallet } from '@/hooks/useConnectToWallet';
import { useStoreBalance } from '@/hooks/useStoreBalance';
import { useTypedSelector } from '@/store';
import { useGetUserCreaturesQuery, useGetUserQuery } from '@/store/services/creatureRacer.service';
import { selectIsAuthenticated } from '@/store/slices/auth.slice';
import { LoadingTemplate } from '@/templates/LoadingTemplate';

const UserMiddleware = ({ children }: { children: React.ReactElement }) => {
    const [isFetching, setisFetching] = useState(true);
    const isAuthenticated = useTypedSelector(selectIsAuthenticated);
    const { status, message, appWalletStatus, isConnected, wallet } = useConnectToWallet();
    const { logout } = useLogout();

    const user = useGetUserQuery(null, {
        skip: !isAuthenticated,
    });

    const creatures = useGetUserCreaturesQuery(null, { skip: !user.isSuccess });
    const balance = useStoreBalance(isConnected);

    useEffect(() => {
        const isFetching =
            user.isFetching || balance.isFetching || (creatures.isFetching && creatures.isLoading);

        setisFetching(isFetching);
    }, [balance.isFetching, creatures.isFetching, creatures.isLoading, user.isFetching]);

    useEffect(() => {
        if (user.isError) {
            logout();
        }
    }, [logout, user]);

    const showOverlay = Boolean(isAuthenticated && !isConnected && wallet && !isFetching);

    if (showOverlay) {
        return <HiroOverlay message={message} status={status} appWalletStatus={appWalletStatus} />;
    }

    return (
        <LoadingTemplate
            isFetching={isFetching}
            keepChildrenVisible={!user.isLoading && !creatures.isLoading}
        >
            {children}
        </LoadingTemplate>
    );
};

export default UserMiddleware;
