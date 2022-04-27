import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const envBaseUrl = `http://${process.env.REACT_APP_API_HOST}/`;

export const api = createApi({
    reducerPath: 'chainApi',
    baseQuery: fetchBaseQuery(({ baseUrl: envBaseUrl })),
    endpoints: (build) => ({
        getTotalValueLocked: build.query({
            query: () => ({
                url: 'metrics/tvl',
            }),
        }),
    }),
});
