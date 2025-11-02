import type { IUser } from '@/Types/Interface/IUser';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
});

export const UserApi  = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQuery,

    endpoints: (builder) => ({
        getUser: builder.query<IUser, void>({
            query: () => '/user',
        }),
       
    }),
})

export const { useGetUserQuery } = UserApi;