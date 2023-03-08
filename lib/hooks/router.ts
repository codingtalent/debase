import { useState, useEffect } from 'react'
import { useRouter, NextRouter } from 'next/router'

type RouterOnReady = {
  routerReady: boolean;
  router: NextRouter
}
export const useRouterOnReady = (): RouterOnReady => {
  const [routerReady, setRouterReady] = useState<boolean>(false);
  const router: NextRouter = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && router.asPath !== router.route) {
      // userRouter is ready
      setRouterReady(true);
    }
  }, [router]);
  
  return {
    router,
    routerReady
  }
}