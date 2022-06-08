import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const envBaseUrl = `https://${process.env.NEXT_PUBLIC_REACT_APP_API_HOST}/`;

export const api = createApi({
    reducerPath: 'chainApi',
    baseQuery: fetchBaseQuery(({ baseUrl: envBaseUrl })),
    endpoints: (build) => ({
        getTotalValueLocked: build.query({
            query: () => ({
                url: 'metrics/tvl',
            }),
        }),
        getPrices: build.query({
            query: () => ({
                url: 'metrics/price',
            }),
        }),
    }),
});

export const { useGetPricesQuery, useGetTotalValueLockedQuery } = api;
