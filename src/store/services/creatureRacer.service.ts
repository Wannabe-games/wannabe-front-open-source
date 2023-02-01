import { CalculatorDetailsOut } from '@/interfaces/contract/CalculatorDetailsOut';
import { CreatureExposureMetadataIn } from '@/interfaces/contract/CreatureExposureMetadataIn';
import { CreatureExposureMetadataOut } from '@/interfaces/contract/CreatureExposureMetadataOut';
import { CreatureMintIn } from '@/interfaces/contract/CreatureMintIn';
import { CreatureMintOut } from '@/interfaces/contract/CreatureMintOut';
import { CreatureNFTNameIn } from '@/interfaces/contract/CreatureNFTNameIn';
import { CreatureNFTNameOut } from '@/interfaces/contract/CreatureNFTNameOut';
import { CreatureStakeIn } from '@/interfaces/contract/CreatureStakeIn';
import { CreatureStakeOut } from '@/interfaces/contract/CreatureStakeOut';
import { HeaderStatisticsOut } from '@/interfaces/contract/HeaderStatisticsOut';
import { ReferralPoolWithdrawOut } from '@/interfaces/contract/ReferralPoolWithdrawOut';
import { RewardPoolListOut } from '@/interfaces/contract/RewardPoolListOut';
import { RewardPoolWithdrawOut } from '@/interfaces/contract/RewardPoolWithdrawOut';
import { RewardPoolWithdrawReceivedOut } from '@/interfaces/contract/RewardPoolWithdrawReceivedOut';
import { ReferralNFTAddIn, ReferralNFTAddOut } from '@/interfaces/contract/RNFTAddOut';
import { SignCreatureIn } from '@/interfaces/contract/SignCreatureIn';
import { SignCreatureOut } from '@/interfaces/contract/SignCreatureOut';
import { UserCardIn } from '@/interfaces/contract/UserCardIn';
import { UserCardOut } from '@/interfaces/contract/UserCardOut';
import { UserInviteesOut } from '@/interfaces/contract/UserInviteesOut';
import { ValidateRefCodeOut } from '@/interfaces/contract/ValidateRefCodeOut';
import { ActiveInGameCreatureIn } from '@/interfaces/portal/ActiveInGameCreatureIn';
import { ActiveInGameCreatureOut } from '@/interfaces/portal/ActiveInGameCreatureOut';
import { BuyCreatureIn } from '@/interfaces/portal/BuyCreatureIn';
import { BuyCreatureOut } from '@/interfaces/portal/BuyCreatureOut';
import { CreaturesOut } from '@/interfaces/portal/CreaturesOut';
import { MintcapCreaturesIn } from '@/interfaces/portal/MintcapCreaturesIn';
import { UpgradeCreatureIn } from '@/interfaces/portal/UpgradeCreatureIn';
import { UpgradeCreatureOut } from '@/interfaces/portal/UpgradeCreatureOut';
import { UserCreaturesDetailsOut } from '@/interfaces/portal/UserCreaturesDetailsOut';
import { GetUserCreaturesOut, UserCreaturesOut } from '@/interfaces/portal/UserCreaturesOut';
import { CurrentUserOut } from '@/interfaces/user/CurrentUserOut';
import { ReferralCodeAddIn } from '@/interfaces/user/ReferralCodeAddIn';
import { ReferralCodeAddOut } from '@/interfaces/user/ReferralCodeAddOut';
import { RegistryIn } from '@/interfaces/user/RegistryIn';
import { RegistryOut } from '@/interfaces/user/RegistryOut';
import { TokenIn } from '@/interfaces/user/TokenIn';
import { TokenOut } from '@/interfaces/user/TokenOut';
import { TokenRefreshIn } from '@/interfaces/user/TokenRefreshIn';
import { TokenRefreshOut } from '@/interfaces/user/TokenRefreshOut';
import { UpdateCurrentUserIn } from '@/interfaces/user/UpdateCurrentUserIn';
import { WalletAddIn } from '@/interfaces/user/WalletAddIn';
import { WalletAddOut } from '@/interfaces/user/WalletAddOut';
import { RootState } from '@/store';
import {
    logout,
    selectRefreshToken,
    setHasTokenExpired,
    storeToken,
} from '@/store/slices/auth.slice';
import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
    retry,
} from '@reduxjs/toolkit/query/react';

import { coinGeckoApi } from './coingecko.service';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
        const { token, expiredToken } = (getState() as RootState).auth;

        if (token && !expiredToken) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = retry(
    async (args, api, extraOptions) => {
        let result = await baseQuery(args, api, extraOptions);

        if (result.error) {
            const token = (api.getState() as RootState).auth.token;

            if (result.error.status === 401) {
                if (!token) {
                    retry.fail(result.error);
                }

                api.dispatch(setHasTokenExpired());
                const refreshToken = selectRefreshToken(api.getState() as RootState);
                const refreshResult = await baseQuery(
                    {
                        url: '/user/token/refresh',
                        method: 'POST',
                        body: { refresh_token: refreshToken },
                    },
                    api,
                    extraOptions,
                );

                if (refreshResult.data) {
                    api.dispatch(storeToken(refreshResult.data));

                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(logout(null));
                }
            }
        }

        return result;
    },
    { maxRetries: 3 },
);

export const creatureRacerApi = createApi({
    reducerPath: 'creatureRacerApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: [
        'User',
        'Creatures',
        'UserCreatures',
        'CreatureDetails',
        'FirstCreatureBuy',
        'ClaimRewardPool',
    ],
    endpoints: (builder) => ({
        token: builder.mutation<TokenOut, TokenIn>({
            query: (credentials) => ({
                url: 'user/token',
                method: 'POST',
                body: credentials,
            }),
        }),
        registry: builder.mutation<RegistryOut, RegistryIn>({
            query: (credentials) => {
                return {
                    url: 'user/registry',
                    method: 'POST',
                    body: credentials,
                };
            },
        }),
        walletAdd: builder.mutation<WalletAddOut, WalletAddIn>({
            query: (walletId) => {
                return {
                    url: 'user/wallet/add',
                    method: 'POST',
                    body: walletId,
                };
            },
            invalidatesTags: (result) => (result?.status ? ['User'] : []),
        }),
        getUser: builder.query<CurrentUserOut, null>({
            query: () => {
                return {
                    url: 'user/current',
                    method: 'GET',
                };
            },
            providesTags: (result) => {
                if (!result?.player?.activeAnimalCreatureType) {
                    return ['User', 'FirstCreatureBuy'];
                }

                return ['User'];
            },
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                dispatch(coinGeckoApi.endpoints.usdPerStacks.initiate(null));

                try {
                    await queryFulfilled;
                } catch (e) {
                    console.error(e);
                }
            },
        }),
        getUserCreatures: builder.query<GetUserCreaturesOut, number | null>({
            query: (page) => {
                return {
                    url: `portal/user-creatures?page=${page || 1}`,
                    method: 'GET',
                };
            },
            providesTags: (result) => {
                return result?.creatures
                    ? [
                          ...result.creatures.map(({ id }) => ({
                              type: 'UserCreatures' as const,
                              id,
                          })),
                          { type: 'UserCreatures', id: 'PARTIAL-LIST' },
                      ]
                    : [{ type: 'UserCreatures', id: 'PARTIAL-LIST' }];
            },
        }),
        getUserCreatureDetails: builder.query<UserCreaturesDetailsOut, string | undefined>({
            query: (id) => {
                if (!id) {
                    throw new Error('No id provided');
                }

                return {
                    url: `portal/user-creatures/details/${id}`,
                    method: 'GET',
                };
            },
            providesTags: ['CreatureDetails'],
            transformResponse: (response: { creature: UserCreaturesDetailsOut }) =>
                response.creature,
        }),
        buyCreature: builder.mutation<BuyCreatureOut, BuyCreatureIn>({
            query: (body) => {
                return {
                    url: 'portal/buy-creature',
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: (result) =>
                result?.creatureId ? ['UserCreatures', 'FirstCreatureBuy'] : [],
        }),
        getCreatures: builder.query<CreaturesOut[], null>({
            query: () => {
                return {
                    url: 'portal/creatures',
                    method: 'GET',
                };
            },
            providesTags: ['Creatures'],
        }),
        getRegisterCreatures: builder.query<CreaturesOut[], null>({
            query: () => {
                return {
                    url: 'portal/register/creatures',
                    method: 'GET',
                };
            },
        }),
        postUserShareImage: builder.query<{ response: string }, { userImage: string; id: string }>({
            query: (body) => {
                return {
                    url: `portal/user/image-url/${body.id}`,
                    method: 'POST',
                    body,
                };
            },
        }),
        upgradeCreature: builder.mutation<UpgradeCreatureOut, UpgradeCreatureIn>({
            query: (body) => {
                return {
                    url: 'portal/upgrade-creature',
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: (result) => (result?.creatureId ? ['UserCreatures'] : []),
        }),
        getCalculatorDetails: builder.query<CalculatorDetailsOut, null>({
            query: () => {
                return {
                    url: 'contract/calculator',
                    method: 'GET',
                };
            },
        }),
        getValidateRefCode: builder.query<ValidateRefCodeOut, string>({
            query: (refCode) => {
                return {
                    url: `contract/validate/ref-code/${refCode}`,
                    method: 'GET',
                };
            },
        }),
        refCodeAdd: builder.mutation<ReferralCodeAddOut, ReferralCodeAddIn>({
            query: (refCode) => {
                return {
                    url: `user/referral/add`,
                    method: 'POST',
                    body: refCode,
                };
            },
            invalidatesTags: (result) => (result?.status === 'success' ? ['User'] : []),
        }),
        referralNFTAdd: builder.mutation<ReferralNFTAddOut, ReferralNFTAddIn>({
            query: (body) => {
                return {
                    url: 'contract/rnft',
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: (result) => (result?.status === 'success' ? ['User'] : []),
        }),
        referralPoolWithdraw: builder.query<ReferralPoolWithdrawOut, null>({
            query: () => {
                return {
                    url: `contract/referral-pool/withdraw`,
                    method: 'GET',
                };
            },
        }),
        getMintcapCreatures: builder.query<UserCreaturesOut[], MintcapCreaturesIn>({
            query: (body) => {
                const { page, ...params } = body;

                return {
                    url: `portal/query/user-creatures?page=${page || 1}`,
                    method: 'POST',
                    body: params,
                };
            },
        }),
        getUserCard: builder.query<UserCardOut, UserCardIn>({
            query: ({ id }) => {
                return {
                    url: `contract/user/card/${id}`,
                    method: 'GET',
                };
            },
        }),
        getUserInvetees: builder.query<UserInviteesOut[], null>({
            query: () => {
                return {
                    url: 'contract/rnft/invitees',
                    method: 'GET',
                };
            },
        }),
        getUserStatistic: builder.query<HeaderStatisticsOut, null>({
            query: () => {
                return {
                    url: 'contract/user/statistic',
                    method: 'GET',
                };
            },
        }),
        updateUser: builder.mutation<CurrentUserOut, UpdateCurrentUserIn>({
            query: (userData) => {
                return {
                    url: 'user/current',
                    method: 'POST',
                    body: userData,
                };
            },
        }),
        setActiveInGame: builder.mutation<ActiveInGameCreatureOut, ActiveInGameCreatureIn>({
            query: (creatureData) => {
                return {
                    url: 'portal/active-in-game',
                    method: 'POST',
                    body: creatureData,
                };
            },
            async onQueryStarted({ creatureId, isActive }, { dispatch, queryFulfilled, getState }) {
                let getUserCreaturesResult;

                for (const {
                    endpointName,
                    originalArgs,
                } of // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (creatureRacerApi.util as any).selectInvalidatedBy(getState(), ['UserCreatures'])) {
                    if (endpointName !== 'getUserCreatures') continue;

                    getUserCreaturesResult = dispatch(
                        creatureRacerApi.util.updateQueryData(
                            'getUserCreatures',
                            originalArgs,
                            (response) => {
                                const creature = response?.creatures.find(
                                    (creature) => creature.id === creatureId,
                                );

                                if (creature) {
                                    creature.isForGame = isActive;
                                }
                            },
                        ),
                    );
                }

                const getUserCreatureDetailsResult = dispatch(
                    creatureRacerApi.util.updateQueryData(
                        'getUserCreatureDetails',
                        creatureId,
                        (creature) => {
                            if (creature) {
                                creature.isForGame = isActive;
                            }
                        },
                    ),
                );

                try {
                    await queryFulfilled;
                } catch {
                    getUserCreaturesResult?.undo();
                    getUserCreatureDetailsResult.undo();
                }
            },
            invalidatesTags: (result) => {
                return result?.creatureId
                    ? [
                          { type: 'UserCreatures', id: result?.creatureId },
                          { type: 'UserCreatures', id: 'PARTIAL-LIST' },
                          'CreatureDetails',
                      ]
                    : [];
            },
        }),
        refreshToken: builder.mutation<TokenRefreshOut, TokenRefreshIn>({
            query: (refreshToken) => {
                return {
                    url: 'user/token/refresh',
                    method: 'POST',
                    body: refreshToken,
                };
            },
        }),
        creatureExposureMetadata: builder.mutation<
            CreatureExposureMetadataOut,
            CreatureExposureMetadataIn
        >({
            query: ({ creatureId }) => {
                return {
                    url: 'contract/exposure/metadata',
                    method: 'POST',
                    body: { creatureId },
                };
            },
        }),
        signCreature: builder.mutation<SignCreatureOut, SignCreatureIn>({
            query: ({ creatureId }) => {
                return {
                    url: 'contract/sign/creature',
                    method: 'POST',
                    body: { creatureId },
                };
            },
        }),
        creatureMint: builder.mutation<CreatureMintOut, CreatureMintIn>({
            query: ({ creatureId, contract, hash }) => {
                return {
                    url: 'contract/creature/mint',
                    method: 'POST',
                    body: { creatureId, contract, hash },
                };
            },
            invalidatesTags: (result) => (result?.status ? ['UserCreatures'] : []),
        }),
        creatureStake: builder.mutation<CreatureStakeOut, CreatureStakeIn>({
            query: ({ creatureId, stake }) => {
                return {
                    url: 'contract/creature/stake',
                    method: 'POST',
                    body: { creatureId, stake },
                };
            },
            invalidatesTags: (result) => (result?.creatureId ? ['UserCreatures'] : []),
        }),
        rewardPoolList: builder.query<RewardPoolListOut[], null>({
            query: () => {
                return {
                    url: `contract/reward-pool/user/list`,
                    method: 'GET',
                };
            },
            providesTags: ['ClaimRewardPool'],
        }),
        rewardPoolWithdraw: builder.query<RewardPoolWithdrawOut, string>({
            query: (id) => {
                return {
                    url: `contract/reward-pool/withdraw/${id}`,
                    method: 'GET',
                };
            },
        }),
        rewardPoolWithdrawReceived: builder.mutation<RewardPoolWithdrawReceivedOut, string>({
            query: (id) => {
                return {
                    url: `contract/reward-pool/withdraw/received/${id}`,
                    method: 'PUT',
                };
            },
            invalidatesTags: (result) => (result?.status === 'done' ? ['ClaimRewardPool'] : []),
        }),
        creatureNFTName: builder.mutation<CreatureNFTNameOut, CreatureNFTNameIn>({
            query: (params) => {
                return {
                    url: 'contract/creature/nft/name',
                    method: 'POST',
                    body: params,
                };
            },
            invalidatesTags: (result) =>
                result?.status ? ['UserCreatures', 'CreatureDetails'] : [],
        }),
    }),
});

export const {
    useBuyCreatureMutation,
    useCreatureExposureMetadataMutation,
    useCreatureNFTNameMutation,
    useGetCalculatorDetailsQuery,
    useGetCreaturesQuery,
    useGetMintcapCreaturesQuery,
    useGetRegisterCreaturesQuery,
    useGetUserCardQuery,
    useGetUserCreatureDetailsQuery,
    useGetUserCreaturesQuery,
    useGetUserInveteesQuery,
    useGetUserQuery,
    useGetUserStatisticQuery,
    useGetValidateRefCodeQuery,
    useTokenMutation,
    usePostUserShareImageQuery,
    useRefCodeAddMutation,
    useReferralNFTAddMutation,
    useRefreshTokenMutation,
    useRegistryMutation,
    useRewardPoolListQuery,
    useSetActiveInGameMutation,
    useSignCreatureMutation,
    useUpdateUserMutation,
    useUpgradeCreatureMutation,
    useWalletAddMutation,
} = creatureRacerApi;
