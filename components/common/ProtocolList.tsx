import type { FC } from 'react'
import { scrollToArchor } from '@lib/utils'
import {
  useWalletTokenList,
  useProtocolList,
  useUserChainList,
  Chain,
  Token,
  Protocol,
  useSelectedChain
} from '@lib/hooks/portfolio'
import { formatDollar } from '@lib/utils'

const ProtocolList: FC = () => {
  const protocolList = useProtocolList();
  const walletTokenList = useWalletTokenList();
  const userChainList = useUserChainList();
  const [selectedChain] = useSelectedChain();
  if (!walletTokenList?.length || !userChainList?.length || !protocolList?.length) {
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
    <div className="protocol-wrap">
      <div className="protocol-item" onClick={() => scrollToArchor('#Wallet')}>
        <div className="protocol-logo-wrap">
          <img className="protocol-logo" src="https://assets.debank.com/static/media/wallet.d81a6caa.svg" alt="" />
        </div>
        <div>
          <div>Wallet</div>
          <div><span className="protocol-usd">{formatDollar(walletAmount.toFixed(0))}</span></div>
        </div>
      </div>
      
      {
        protocolList.filter((p: Protocol) => (
          !selectedChain || selectedChain?.id === p.chain
        )).sort((a: Protocol, b: Protocol) => (
          b.asset_usd_value - a.asset_usd_value
        )).map((p: Protocol) => (
          <div className="protocol-item" key={`${p.chain}_${p.id}`} onClick={() => scrollToArchor(`#${p.id}`)}>
            <div className="protocol-logo-wrap">
              <img className="protocol-logo" src={p.logo_url} alt=""/>
              {
                p.chain !== 'eth' && (
                  <img className="protocol-chain" src={chainLogoMap.get(p.chain)} alt={p.chain}/>
                )
              }
            </div>
            <div>
              <div>{p.name}</div>
              <div><span className="protocol-usd">{formatDollar(p.asset_usd_value.toFixed(0))}</span></div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default ProtocolList
