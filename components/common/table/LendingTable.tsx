import type { FC } from 'react'
import { formatDollar } from '@lib/utils'
import Table from '@components/common/Table'
import {PortfolioItem, Protocol, Token} from '@lib/hooks/portfolio'

interface Props {
  groupedProtocol: PortfolioItem[]
}
const LendingTable: FC = ({ groupedProtocol }: Props) => {
  return (
    <>
      {
        groupedProtocol.map((item: PortfolioItem) => {
          const supplyTokenList = item.detail.supply_token_list ?? [];
          const rewardTokenList = item.detail.reward_token_list ?? [];
          return (
            <>
              <Table header={[
                { title: 'Supplied' },
                { title: 'Balance' },
                { title: 'USD Value' }
              ]}>
                {
                  supplyTokenList.sort((a: Token, b: Token) => (
                    (b.price * b.amount) - (a.price * a.amount)
                  )).map((token: Token) => (
                    <div className="table-content-row border-b" key={`${item.name}_${token.chain}_${token.id}`}>
                      <div className="flex-table-col">
                        <div className="token-icons">
                          <div className="protocol-logo-wrap">
                            <img className="token-icon" src={token.logo_url} alt=""/>
                          </div>
                        </div>
                        <div>
                          {token.optimized_symbol}
                        </div>
                      </div>
                      <div>
                        {token.amount.toFixed(2)} {token.optimized_symbol}
                      </div>
                      <div>
                        {formatDollar((token.price * token.amount).toFixed(2), 2)}
                      </div>
                    </div>
                  ))
                }

              </Table>

              {
                rewardTokenList.length > 0 && (
                  <Table header={[
                    { title: 'Rewards' },
                    { title: 'Balance' },
                    { title: 'USD Value' }
                  ]}>
                    {
                      rewardTokenList.sort((a: Token, b: Token) => (
                        (b.price * b.amount) - (a.price * a.amount)
                      )).map((token: Token) => (
                        <div className="table-content-row border-b" key={`${item.name}_${token.chain}_${token.id}`}>
                          <div className="flex-table-col">
                            <div className="token-icons">
                              <div className="protocol-logo-wrap">
                                <img className="token-icon" src={token.logo_url} alt=""/>
                              </div>
                            </div>
                            <div>
                              {token.optimized_symbol}
                            </div>
                          </div>
                          <div>
                            {token.amount.toFixed(2)} {token.optimized_symbol}
                          </div>
                          <div>
                            {formatDollar((token.price * token.amount).toFixed(2), 2)}
                          </div>
                        </div>
                      ))
                    }

                  </Table>
                )
              }
            </>
          )
        })
      }
    </>
  )
}

export default LendingTable
