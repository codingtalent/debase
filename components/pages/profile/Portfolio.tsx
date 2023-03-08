import type { FC } from 'react'
import { useRouter } from 'next/router'
import ChainList from '@components/common/ChainList'
import ProtocolList from '@components/common/ProtocolList'
import WalletToken from '@components/common/WalletToken'
import Loading from '@components/common/Loading'
import { useAsyncPortfolio, PortfolioContext } from '@lib/hooks/portfolio'
import ProtocolTokenList from '@components/common/ProtocolTokenList'

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
          loading ? (<Loading/>) : (
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
