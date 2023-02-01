export enum ROUTE {
    CALCULATOR_EXTENDED = '/calculator/extended',
    CALCULATOR_REVENUE = '/calculator/revenue',
    CREATURE_PROFILE = '/creature-profile',
    DASHBOARD = '/dashboard',
    HOME = '/',
    INTERNAL_SERVER_ERROR = '/500',
    LOBBIES = '/lobbies',
    LOBBY = '/lobby',
    LOGIN = '/login',
    MINTCAP_STATISTICS = '/mintcap-statistics',
    MY_PETS = '/my-pets',
    NOT_FOUND = '/404',
    PROFILE = '/profile',
    REFERRALS = '/referrals',
    REGISTER = '/register',
    REGISTER_STEP2 = '/register/step2',
    REGISTER_STEP3 = '/register/step3',
    REGISTER_STEP4 = '/register/step4',
    REGISTER_STEP5 = '/register/step5',
    REWARD_POOL = '/reward-pool',
    SHARE = '/share',
    OPENSEA_CREATURE = '/opensea-creature',
    STAKED_CREATURES = '/staked-creatures',
    UPGRADE_BUY_CREATURES = '/upgrade-buy-creatures',
    UPGRADE_CREATURE = '/upgrade-creature',
}

export enum ZONES {
    AUTH = 'auth',
    CONTENT = 'content',
    NOT_FOUND = 'not-found',
    INTERNAL_SERVER_ERROR = 'internal-server-error',
    VERIFIED = 'verified',
    WALLET = 'wallet',
}

export const ZONES_FALLBACK: Record<
    Exclude<ZONES, 'not-found' | 'internal-server-error'>,
    {
        logged?: ROUTE;
        notLogged?: ROUTE;
        hasWallet?: ROUTE;
        hasNoWallet?: ROUTE;
        hasCreature?: ROUTE;
        hasNoCreature?: ROUTE;
    }
> = {
    [ZONES.AUTH]: {
        notLogged: ROUTE.LOGIN,
        hasCreature: ROUTE.DASHBOARD,
    },
    [ZONES.WALLET]: {
        hasNoWallet: ROUTE.REGISTER_STEP2,
        notLogged: ROUTE.LOGIN,
        hasCreature: ROUTE.DASHBOARD,
    },
    [ZONES.CONTENT]: {
        hasCreature: ROUTE.DASHBOARD,
        hasNoWallet: ROUTE.DASHBOARD,
        hasNoCreature: ROUTE.DASHBOARD,
    },
    [ZONES.VERIFIED]: {
        hasNoWallet: ROUTE.REGISTER_STEP2,
        hasNoCreature: ROUTE.REGISTER_STEP3,
    },
};

export interface RouteItemConfigInterface {
    name: ROUTE;
    zone?: ZONES;
}

export type RoutesConfigInterface = RouteItemConfigInterface[];

export type ConditionalRedirectParamInterface = {
    hasCreature: boolean;
    hasErrors: boolean;
    hasWallet: boolean;
    isLogged: boolean;
    redirectRouteZones: ZONES[];
    routes: RoutesConfigInterface;
    url: string;
};
