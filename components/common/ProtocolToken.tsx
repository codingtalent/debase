import type { FC } from 'react'
import {PortfolioItem, Protocol} from '@lib/hooks/portfolio'
import {formatDollar, getGroupObject, getLastProtocolDetailType} from '@lib/utils'
import LendingTable from "@components/common/table/LendingTable";
import CommonTable from "@components/common/table/CommonTable";

interface Props {
  protocol: Protocol
}
interface GroupedProtocols {
  [protocolName: string]: PortfolioItem[]
}

const getTableByDetailType = (portfolioItem: PortfolioItem[], detailTypes: string[]) => {
  const priorityDetailType = getLastProtocolDetailType(detailTypes)
  switch (priorityDetailType) {
    case 'lending':
      return <LendingTable groupedProtocol={portfolioItem}/>
    default:
      return <CommonTable groupedProtocol={portfolioItem}/>
  }
}

const ProtocolToken: FC = ({ protocol }: Props) => {
  const groupedProtocols: GroupedProtocols = getGroupObject(protocol.portfolio_item_list, 'name');
  console.log('groupedProtocols', groupedProtocols, protocol)
  
  return (
    <div className="protocol-item-container">
      <div className="protocol-item-header">
        <div className="protocol-item-title-wrap" id={protocol.id}>
          <img className="protocol-item-logo" src={protocol.logo_url} alt="" />
          <div className="protocol-item-title">{protocol.name}</div>
        </div>
        <div className="protocol-item-usd">
          {formatDollar(protocol.asset_usd_value.toFixed(0))}
        </div>
      </div>
      {
        Object.keys(groupedProtocols).map((name: string) => (
          <div className="card-wrap">

            <div className="card-panel-header">
              <div className="card-protocol-name">
                {name}
              </div>
            </div>
            <div className="card-panel-container">
              {getTableByDetailType(groupedProtocols[name], groupedProtocols[name][0].detail_types)}
              {/*<Table header={[
                { title: 'Token' },
                { title: 'Price' },
                { title: 'Amount' },
                { title: 'USD Value' }
              ]}>
                {
                  groupedProtocols[name].map((item: any) => {
                    const supply_token_list = item?.supply_token_list ?? [];
                    return (
                      <div className="table-content-row border-b" key={`${protocol.chain}_${item.name}`}>
                        <div className="flex-table-col">
                    <div className="token-icons">
                      <img src="https://static.debank.com/image/eth_token/logo_url/0x0c10bf8fcb7bf5412187a595ab97a3609160b5c6/70890e6172f62f4430bfeaff32680884.png" alt=""/>
                      <img src="https://static.debank.com/image/eth_token/logo_url/0x6b175474e89094c44da98b954eedeac495271d0f/549c4205dbb199f1b8b03af783f35e71.png" alt=""/>
                      <img src="https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png" alt=""/>
                      <img src="https://static.debank.com/image/coin/logo_url/usdt/23af7472292cb41dc39b3f1146ead0fe.png" alt=""/>
                    </div>
                    <div>
                      USDD + BUSD
                    </div>
                  </div>*
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
                    )
                  })
                }
              </Table>*/}
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default ProtocolToken
