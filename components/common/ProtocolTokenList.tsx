import type { FC } from 'react'
import { useProtocolList } from '@lib/hooks/portfolio'
import ProtocolToken from '@components/common/ProtocolToken'

const ProtocolTokenList: FC = () => {
  const protocols = useProtocolList()

  return (
    <>
      {
        protocols.sort((a, b) => (
          b.asset_usd_value - a.asset_usd_value
        )).map((p, i: number) => (<ProtocolToken key={`ProtocolToken${i}`} protocol={p}/>))
      }
    </>
  )
}

export default ProtocolTokenList
