import type { AppProps } from 'next/app'
import 'app/styles/globals.css'

export const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Component {...pageProps} />
  )
}
