import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
    StxBalance,
    AddressTransactionWithTransfers,
} from '@stacks/stacks-blockchain-api-types';

export const stacksApi = createApi({
    reducerPath: 'stacksApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_STACKS_API_URL }),
    endpoints: (builder) => ({
        getStxBalance: builder.query<string, string>({
            query: (walletAddress) => {
                return {
                    url: `address/${walletAddress}/stx`,
                    method: 'GET',
                };
            },
            transformResponse: (response: StxBalance) => response.balance,
        }),
        getTransaction: builder.query<
            AddressTransactionWithTransfers,
            { txId: string; wallet: string }
        >({
            query: ({ txId, wallet }) => {
                return {
                    url: `address/${wallet}/${txId}/with_transfers`,
                    method: 'GET',
                };
            },
        }),
    }),
});

export const { useGetStxBalanceQuery, useGetTransactionQuery } = stacksApi;
