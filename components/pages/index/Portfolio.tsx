import type { FC } from 'react'
import { useRouter } from 'next/router'
import ChainList from '@components/common/ChainList'
import ProtocolList from '@components/common/ProtocolList'
import WalletToken from '@components/common/WalletToken'
import Loading from '@components/common/Loading'
import { useAsyncPortfolio, PortfolioContext } from '@lib/hooks/portfolio'

const Portfolio: FC = () => {
  const router = useRouter()
  const { address } = router.query
  const portfolio = useAsyncPortfolio(address)
  const {
    loading
  }: any = portfolio
  return (
    <PortfolioContext.Provider value={portfolio}>
      <div className="pt-6 pb-6">
        {
          loading ? (<Loading/>) : (
            <>
              <div className="chain-summary-card">
                <ChainList/>
                <ProtocolList/>
              </div>
              <WalletToken />
            </>
          )
        }
      </div>
    </PortfolioContext.Provider>
  )
}

export default Portfolio
