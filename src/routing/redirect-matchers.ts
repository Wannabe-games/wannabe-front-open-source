import {
    ConditionalRedirectParamInterface,
    ROUTE,
    RoutesConfigInterface,
    ZONES_FALLBACK,
} from './routes.types';

export const matchRouteByRouteName = (name: string, routes: RoutesConfigInterface) =>
    routes.find((route) => route.name === name);

export const shouldRedirectToRoute = (params: ConditionalRedirectParamInterface) => {
    let route;

    if (params.url) {
        route = matchRouteByRouteName(params.url, params.routes);
    } else {
        return undefined;
    }
    const zone = route?.zone;

    if (
        !zone ||
        zone === 'not-found' ||
        zone === 'internal-server-error' ||
        !params.redirectRouteZones.includes(zone)
    ) {
        return undefined;
    }

    if (params.hasErrors) {
        return ROUTE.INTERNAL_SERVER_ERROR;
    }

    if (params.isLogged) {
        if (params.hasWallet) {
            if (params.hasCreature) {
                return ZONES_FALLBACK[zone].hasCreature;
            } else {
                return ZONES_FALLBACK[zone].hasNoCreature;
            }
        } else {
            return ZONES_FALLBACK[zone].hasNoWallet;
        }
    } else {
        return ZONES_FALLBACK[zone].notLogged;
    }
};
