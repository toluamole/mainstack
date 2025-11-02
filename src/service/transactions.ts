import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './user';
import type { ITransaction } from '@/Types/Interface/ITransaction';

export const TransactionApi  = createApi({
    reducerPath: 'TransactionApi',
    baseQuery: baseQuery,

    endpoints: (builder) => ({
        getTransaction: builder.query<ITransaction[], void>({
            query: () => '/transactions',
        }),
       
    }),
})

export const { useGetTransactionQuery } = TransactionApi;