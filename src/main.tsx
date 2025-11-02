import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "@/Theme/components/ui/provider.tsx"
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@/store/store'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
		<ReduxProvider store={store}>
			<Provider >
				<App />
			</Provider>
		</ReduxProvider>
  </StrictMode>,
)
