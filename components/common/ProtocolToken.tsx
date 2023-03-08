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

const ProtocolToken: FC<Props> = ({ protocol }: Props) => {
  const groupedProtocols: GroupedProtocols = getGroupObject(protocol.portfolio_item_list, 'name');
  
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
        Object.keys(groupedProtocols).map((name: string, i: number) => (
          <div className="card-wrap" key={`CardWrap_${protocol.chain}_${protocol.name}_${i}`}>

            <div className="card-panel-header">
              <div className="card-protocol-name">
                {name}
              </div>
            </div>
            <div className="card-panel-container">
              {getTableByDetailType(groupedProtocols[name], groupedProtocols[name][0].detail_types)}
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default ProtocolToken
