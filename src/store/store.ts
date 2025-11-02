import { configureStore } from '@reduxjs/toolkit'
import { UserApi } from '@/service/user'
import { TransactionApi } from '@/service/transactions'
import { WalletApi } from '@/service/wallet'



export const store = configureStore({
  reducer: {
    [UserApi.reducerPath]: UserApi.reducer,
	[TransactionApi.reducerPath]: TransactionApi.reducer,
	[WalletApi.reducerPath]: WalletApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			...[
				UserApi.middleware,
				TransactionApi.middleware,
				WalletApi.middleware,
			],
		),
})