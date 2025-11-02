import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './user';
import type { IWallet } from '@/Types/Interface/IWallet';

export const WalletApi  = createApi({
    reducerPath: 'WalletApi',
    baseQuery: baseQuery,

    endpoints: (builder) => ({
        getWallet: builder.query<IWallet, void>({
            query: () => '/wallet',
        }),
       
    }),
})

export const { useGetWalletQuery } = WalletApi;