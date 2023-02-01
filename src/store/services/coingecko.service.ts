import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const coinGeckoApi = createApi({
    reducerPath: 'coinGeckoApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_COIN_GECKO_API_URL }),
    endpoints: (builder) => ({
        usdPerStacks: builder.query<number, null>({
            query: () => {
                return {
                    url: `simple/price?ids=blockstack&vs_currencies=usd`,
                    method: 'GET',
                };
            },
            transformResponse: (response: UsdPerStacksOut) => response['blockstack'].usd,
        }),
    }),
});

export const { useUsdPerStacksQuery } = coinGeckoApi;

interface UsdPerStacksOut {
    blockstack: {
        usd: number;
    };
}
