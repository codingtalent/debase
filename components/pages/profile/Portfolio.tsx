import type { FC } from 'react'
import ChainList from '@components/common/ChainList'
import ProtocolList from '@components/common/ProtocolList'
import WalletToken from '@components/common/WalletToken'
import { useAsyncPortfolio, PortfolioContext } from '@lib/hooks/portfolio'
import ProtocolTokenList from '@components/common/ProtocolTokenList'
import SkeletonCard from '@components/common/SkeletonCard'

const Portfolio: FC = () => {
  const portfolio = useAsyncPortfolio()
  const {
    loading,
    noData
  } = portfolio
  return (
    <PortfolioContext.Provider value={portfolio}>
      <div className="pt-6 pb-6">
        {
          loading ? (<SkeletonCard/>) : (
            !noData && (
              <>
                <div className="chain-summary-card">
                  <ChainList/>
                  <ProtocolList/>
                </div>
                <WalletToken />
                <ProtocolTokenList/>
              </>
            )
          )
        }
      </div>
    </PortfolioContext.Provider>
  )
}

export default Portfolio
