import { RouteObject } from 'react-router-dom';

import { Extended } from '@/pages/Calculators/Extended';
import { Revenue } from '@/pages/Calculators/Revenue';
import CreatureProfilePage from '@/pages/CreatureProfile';
import DashboardPage from '@/pages/Dashboard';
import InternalServerError from '@/pages/InternalServerError';
import Lobbies from '@/pages/Lobbies';
import LobbyPage from '@/pages/Lobby';
import LoginPage from '@/pages/Login';
import { MintcapStatistics } from '@/pages/MintcapStatistics';
import MyPets from '@/pages/MyPets';
import NotFound from '@/pages/NotFound';
import { Referrals } from '@/pages/Referrals/Referrals';
import RegisterPage from '@/pages/Register';
import RegisterPageStep2 from '@/pages/Register/Step2';
import RegisterPageStep3 from '@/pages/Register/Step3';
import RegisterPageStep4 from '@/pages/Register/Step4';
import RegisterPageStep5 from '@/pages/Register/Step5';
import { RewardPool } from '@/pages/RewardPool';
import { ShareAndJoin } from '@/pages/ShareAndJoin';
import StakedCreatures from '@/pages/StakedCreatures';
import { UpgradeBuyCreatures } from '@/pages/UpgradeBuyCreatures';
import { UpgradeCreature } from '@/pages/UpgradeCreature';
import UserProfile from '@/pages/UserProfile';
import { ProtectedRoute } from '@/ProtectedRoute';

import { ROUTE, RoutesConfigInterface, ZONES } from './routes.types';

export const ROUTES_CONFIG: RoutesConfigInterface = [
    {
        name: ROUTE.CALCULATOR_REVENUE,
        zone: ZONES.CONTENT,
    },
    {
        name: ROUTE.CALCULATOR_EXTENDED,
        zone: ZONES.CONTENT,
    },
    {
        name: ROUTE.CREATURE_PROFILE,
        zone: ZONES.VERIFIED,
    },
    {
        name: ROUTE.DASHBOARD,
        zone: ZONES.VERIFIED,
    },
    {
        name: ROUTE.HOME,
        zone: ZONES.VERIFIED,
    },
    {
        name: ROUTE.LOGIN,
        zone: ZONES.CONTENT,
    },
    {
        name: ROUTE.MINTCAP_STATISTICS,
        zone: ZONES.VERIFIED,
    },
    {
        name: ROUTE.PROFILE,
        zone: ZONES.VERIFIED,
    },
    {
        name: ROUTE.REFERRALS,
        zone: ZONES.VERIFIED,
    },
    {
        name: ROUTE.REGISTER,
        zone: ZONES.CONTENT,
    },
    {
        name: ROUTE.REGISTER_STEP2,
        zone: ZONES.AUTH,
    },
    {
        name: ROUTE.REGISTER_STEP3,
        zone: ZONES.WALLET,
    },
    {
        name: ROUTE.REGISTER_STEP4,
    },
    {
        name: ROUTE.REGISTER_STEP5,
    },
    {
        name: ROUTE.REWARD_POOL,
        zone: ZONES.VERIFIED,
    },
    {
        name: ROUTE.NOT_FOUND,
    },
    {
        name: ROUTE.INTERNAL_SERVER_ERROR,
        zone: ZONES.INTERNAL_SERVER_ERROR,
    },
    {
        name: ROUTE.LOBBIES,
        zone: ZONES.VERIFIED,
    },
    {
        name: ROUTE.LOBBY,
        zone: ZONES.VERIFIED,
    },
    {
        name: ROUTE.MY_PETS,
        zone: ZONES.VERIFIED,
    },
];

export const routes: RouteObject[] = [
    { path: ROUTE.HOME, element: <ProtectedRoute component={DashboardPage} /> },
    { path: ROUTE.DASHBOARD, element: <ProtectedRoute component={DashboardPage} /> },
    { path: ROUTE.LOGIN, element: <LoginPage /> },
    { path: ROUTE.CALCULATOR_EXTENDED, element: <Extended /> },
    { path: ROUTE.CALCULATOR_REVENUE, element: <Revenue /> },
    { path: ROUTE.MINTCAP_STATISTICS, element: <ProtectedRoute component={MintcapStatistics} /> },
    { path: ROUTE.REFERRALS, element: <ProtectedRoute component={Referrals} /> },
    { path: ROUTE.REGISTER, element: <RegisterPage /> },
    { path: ROUTE.REGISTER_STEP2, element: <ProtectedRoute component={RegisterPageStep2} /> },
    { path: ROUTE.REGISTER_STEP3, element: <ProtectedRoute component={RegisterPageStep3} /> },
    { path: ROUTE.REGISTER_STEP4, element: <ProtectedRoute component={RegisterPageStep4} /> },
    { path: ROUTE.REGISTER_STEP5, element: <ProtectedRoute component={RegisterPageStep5} /> },
    { path: ROUTE.REWARD_POOL, element: <ProtectedRoute component={RewardPool} /> },
    {
        path: `${ROUTE.CREATURE_PROFILE}/:id`,
        element: <ProtectedRoute component={CreatureProfilePage} />,
    },
    { path: ROUTE.PROFILE, element: <ProtectedRoute component={UserProfile} /> },
    { path: ROUTE.STAKED_CREATURES, element: <ProtectedRoute component={StakedCreatures} /> },
    {
        path: `${ROUTE.UPGRADE_CREATURE}/:id`,
        element: <ProtectedRoute component={UpgradeCreature} />,
    },
    {
        path: `${ROUTE.UPGRADE_BUY_CREATURES}`,
        element: <ProtectedRoute component={UpgradeBuyCreatures} />,
    },
    {
        path: `${ROUTE.SHARE}/:id`,
        element: <ShareAndJoin />,
    },
    {
        path: ROUTE.LOBBIES,
        element: <ProtectedRoute component={Lobbies} />,
    },
    {
        path: `${ROUTE.LOBBY}/:id`,
        element: <ProtectedRoute component={LobbyPage} />,
    },
    {
        path: ROUTE.MY_PETS,
        element: <ProtectedRoute component={MyPets} />,
    },
    { path: ROUTE.NOT_FOUND, element: <NotFound /> },
    { path: ROUTE.INTERNAL_SERVER_ERROR, element: <InternalServerError /> },
    { path: '*', element: <NotFound /> },
];
