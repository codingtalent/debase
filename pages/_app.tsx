import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { lazy, Suspense, useEffect} from 'react';
import Loading from '@components/common/Loading'
import ErrorBoundary from '@components/layout/ErrorBoundary';

const Layout: any = lazy(() => import('@components/layout/Layout'));

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Layout><Component {...pageProps} /></Layout>
    </ErrorBoundary>
    
  )
}

export default MyApp
