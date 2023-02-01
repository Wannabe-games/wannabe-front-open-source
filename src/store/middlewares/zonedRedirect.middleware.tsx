import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { shouldRedirectToRoute } from '@/routing/redirect-matchers';
import { redirectRouteZones } from '@/routing/route-zones';
import { ROUTES_CONFIG } from '@/routing/routes-list';
import { useTypedSelector } from '@/store';
import {
    useGetUserCreaturesQuery,
    useGetUserQuery,
} from '@/store/services/creatureRacer.service';
import { selectIsAuthenticated } from '@/store/slices/auth.slice';

interface IZonedRedirectProps {
    children: React.ReactNode;
}

const ZonedRedirectMiddlewareRaw = ({ children }: IZonedRedirectProps) => {
    const isAuthenticated = useTypedSelector(selectIsAuthenticated);
    const { data: walletId } = useGetUserQuery(null, {
        skip: !isAuthenticated,
        selectFromResult: ({ data }) => ({
            data: data?.wallet,
        }),
    });
    const { data: userCreatures, error: isError } = useGetUserCreaturesQuery(null, {
        skip: !isAuthenticated,
    });
    const location = useLocation();

    const redirectPath = shouldRedirectToRoute({
        url: location.pathname,
        isLogged: !!isAuthenticated,
        hasWallet: !!walletId,
        redirectRouteZones: redirectRouteZones,
        routes: ROUTES_CONFIG,
        hasCreature: !!(userCreatures && userCreatures?.creatures.length > 0),
        hasErrors: !!isError,
    });

    if (redirectPath) return <Navigate to={redirectPath} replace state={{ from: location }} />;

    return <>{children}</>;
};

const ZonedRedirectMiddleware = React.memo(ZonedRedirectMiddlewareRaw);

export default ZonedRedirectMiddleware;
