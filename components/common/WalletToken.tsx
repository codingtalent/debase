import type { FC } from 'react'
import Table from '@components/common/Table'
import { useWalletTokenList, useUserChainList, Token, Chain } from '@lib/hooks/portfolio'
import { formatDollar } from '@lib/utils'

const WalletToken: FC = () => {
  const walletTokenList: Token[] = useWalletTokenList();
  const userChainList: Chain = useUserChainList();
  if (!walletTokenList?.length || !userChainList?.length) {
    return null
  }
  
  const walletAmount = walletTokenList.reduce(
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
              walletTokenList.sort((a: Token, b: Token) => (
                (b.price * b.amount) - (a.price * a.amount)
              )).map((token: Token) => (
                <div className="table-content-row border-b" key={`${token.chain}_${token.id}`}>
                {/*<div className="flex-table-col">
                    <div className="token-icons">
                      <img src="https://static.debank.com/image/eth_token/logo_url/0x0c10bf8fcb7bf5412187a595ab97a3609160b5c6/70890e6172f62f4430bfeaff32680884.png" alt=""/>
                      <img src="https://static.debank.com/image/eth_token/logo_url/0x6b175474e89094c44da98b954eedeac495271d0f/549c4205dbb199f1b8b03af783f35e71.png" alt=""/>
                      <img src="https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png" alt=""/>
                      <img src="https://static.debank.com/image/coin/logo_url/usdt/23af7472292cb41dc39b3f1146ead0fe.png" alt=""/>
                    </div>
                    <div>
                      USDD + BUSD
                    </div>
                  </div>*/}
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
