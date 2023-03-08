import type { FC } from 'react'
import Table from '@components/common/Table'
import {useWalletTokenList, useUserChainList, Token, Chain, useSelectedChain} from '@lib/hooks/portfolio'
import { formatDollar } from '@lib/utils'

const WalletToken: FC = () => {
  const walletTokenList = useWalletTokenList();
  const userChainList = useUserChainList();
  const [selectedChain] = useSelectedChain();
  if (!walletTokenList?.length || !userChainList?.length) {
    return null
  }
  
  const walletAmount = walletTokenList.filter((t: Token) => (
    !selectedChain || selectedChain?.id === t.chain
  )).reduce(
    (accumulator: number, token: Token) => accumulator + token.amount * token.price,
    0
  )
  const chainLogoMap = new Map(userChainList.map((c: Chain) => (
    [c.id, c.logo_url]
  )))
  return (
    <div className="protocol-item-container">
      <div className="protocol-item-header">
        <div className="protocol-item-title-wrap" id="Wallet">
          <img className="protocol-item-logo" src="https://assets.debank.com/static/media/wallet.d81a6caa.svg" alt="" />
          <div className="protocol-item-title">Wallet</div>
        </div>
        <div className="protocol-item-usd">
          {formatDollar(walletAmount.toFixed(0))}
        </div>
      </div>
      <div className="card-wrap">
        <div className="card-panel-header">
          <div className="card-protocol-name">
            Staked
          </div>
        </div>
        <div className="card-panel-container">
          <Table header={[
            { title: 'Token' },
            { title: 'Price' },
            { title: 'Amount' },
            { title: 'USD Value' }
          ]}>
            {
              walletTokenList.filter((t: Token) => (
                !selectedChain || selectedChain?.id === t.chain
              )).sort((a: Token, b: Token) => (
                (b.price * b.amount) - (a.price * a.amount)
              )).map((token: Token) => (
                <div className="table-content-row border-b" key={`${token.chain}_${token.id}`}>
                  <div className="flex-table-col">
                    <div className="token-icons">
                      <div className="protocol-logo-wrap">
                        <img className="token-icon" src={token.logo_url} alt=""/>
                        {
                          token.chain !== 'eth' && (
                            <img className="protocol-chain" src={chainLogoMap.get(token.chain)} alt={token.chain}/>
                          )
                        }
                      </div>
                    </div>
                    <div>
                      {token.optimized_symbol}
                    </div>
                  </div>
                  <div>
                    {formatDollar(token.price.toFixed(4), 4)}
                  </div>
                  <div>
                    {token.amount.toFixed(4)}
                  </div>
                  <div>
                    {formatDollar((token.price * token.amount).toFixed(2), 2)}
                  </div>
                </div>
              ))
            }
          </Table>
        </div>
      </div>
    </div>
  )
}

export default WalletToken
