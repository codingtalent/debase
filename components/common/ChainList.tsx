import type { FC } from 'react'
import {useUserChainList, Chain, useSelectedChain} from '@lib/hooks/portfolio'
import { formatDollar } from '@lib/utils'

const ChainList: FC = () => {
  const userChainList = useUserChainList();
  const [selectedChain, updateSelectedChain] = useSelectedChain();
  if (!userChainList?.length) {
    return null
  }
  const unselectedChainClass = selectedChain ? 'opacity-40' : '';
  return (
    <div className="chain-wrap">
      {userChainList.sort((a: Chain, b: Chain) => (
        b.usd_value - a.usd_value
      )).map((c) => (
        <div className={`chain-item ${c.id !== selectedChain?.id ? unselectedChainClass : 'active'}`} key={c.id} onClick={() => updateSelectedChain(c)}>
          <img className="chain-logo" src={c.logo_url} alt="" />
          <div className="chain-item-text">
            <div>Assets on {c.name}</div>
            <div><span className="chain-usd">{formatDollar(c.usd_value.toFixed(0))}</span></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChainList
