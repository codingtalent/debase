import type { FC } from 'react'
import { formatDollar } from '@lib/utils'
import Table from '@components/common/Table'
import {PortfolioItem, Token} from '@lib/hooks/portfolio'

interface Props {
  groupedProtocol: PortfolioItem[]
}

const getReward = (token: Token) => (
  <div>
    {token.amount.toFixed(2)} {token.optimized_symbol} ({formatDollar((token.price * token.amount).toFixed(2), 2)})
  </div>
)
const CommonTable: FC = ({ groupedProtocol }: Props) => {
  const firstRewardTokenList = groupedProtocol[0]?.detail?.reward_token_list ?? [];
  let headers: any[] = [
    { title: 'Pool' },
    { title: 'Balance' },
    { title: 'USD Value' }
  ];
  if (firstRewardTokenList.length) {
    headers = [
      { title: 'Pool' },
      { title: 'Balance' },
      { title: 'Rewards' },
      { title: 'USD Value' }
    ]
  }
  return (
    <Table header={headers}>
      {groupedProtocol.sort((a: PortfolioItem, b: PortfolioItem) => (
        b.stats.asset_usd_value - a.stats.asset_usd_value
      )).map((item: PortfolioItem, i: number) => {
        const supplyTokenList = item.detail.supply_token_list ?? [];
        const rewardTokenList = item.detail.reward_token_list ?? [];
        let tokenIconsWidth = supplyTokenList.length * 20;
        if (supplyTokenList.length > 1) {
          tokenIconsWidth -= (supplyTokenList.length - 1) * 8;
        }
        return (
          <div className="table-content-row border-b" key={`${item.pool.project_id}_${item.pool.chain}_${i}`}>
            <div className="flex-table-col">
              <div className="token-icons" style={{ width: tokenIconsWidth }}>
                {
                  supplyTokenList.map((t: Token, i: number) => {
                    const tokenLogoStyle = { left: i * -8 };
                    const logoUrl = t.logo_url ?? 'https://assets.debank.com/static/media/default.b2295297.svg';
                    return (
                      <img className="token-icon" src={logoUrl} style={tokenLogoStyle} alt=""/>
                    )
                  })
                }
              </div>
              <div>
                {
                  supplyTokenList.map((t: Token) => (
                    t.optimized_symbol
                  )).join(' + ')
                }
              </div>
            </div>
            <div>
              {
                supplyTokenList.map((t: Token) => (
                  <div>
                    {t.amount.toFixed(2)} {t.optimized_symbol}
                  </div>
                ))
              }
            </div>
            {
              rewardTokenList.length > 0 && (
                <div>
                  {
                    rewardTokenList.map((t: Token) => (
                      <div>
                        {getReward(t)}
                      </div>
                    ))
                  }
                </div>
              )
            }
            <div>
              {formatDollar((item.stats.asset_usd_value).toFixed(2), 2)}
            </div>
          </div>
        )
      })}
    </Table>
  )
}

export default CommonTable
