import type { FC } from 'react'
import {Protocol, useProtocolList, useSelectedChain} from '@lib/hooks/portfolio'
import ProtocolToken from '@components/common/ProtocolToken'

const ProtocolTokenList: FC = () => {
  const protocols = useProtocolList();
  const [selectedChain] = useSelectedChain();
  return (
    <>
      {
        protocols.filter((p: Protocol) => (
          !selectedChain || selectedChain?.id === p.chain
        )).sort((a, b) => (
          b.asset_usd_value - a.asset_usd_value
        )).map((p, i: number) => (<ProtocolToken key={`ProtocolToken${i}`} protocol={p}/>))
      }
    </>
  )
}

export default ProtocolTokenList
