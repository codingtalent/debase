import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {useRouterOnReady} from '@lib/hooks/router'

export type Chain = {
  /** The chain's id */
  id: string;
  /** integer - The community-identified id */
  community_id: number;
  /** The chain's name */
  name: string;
  /** URL of the chain's logo image. null if not available */
  logo_url: string;
  /** The native token's id */
  native_token_id: string;
  /** The address of the native token */
  wrapped_token_id: string;
  /** /v1/user/chain_balance - chain balance of user */
  usd_value: number;
}
export type Token = {
  /** The address of the token contract. */
  id: string;
  /** The chain's name. */
  chain: string;
  /** The token's name. null if not defined in the contract and not available from other sources. */
  name: string;
  /** The token's symbol. null if not defined in the contract and not available from other sources. */
  symbol: string;
  /** The token's displayed symbol. If two tokens have the same symbol, they are distinguished by display_symbol . */
  display_symbol: string;
  /** For front-end display. optimized_symbol || display_symbol || symbol */
  optimized_symbol: string;
  /** integer - The number of decimals of the token. null if not defined in the contract and not available from other sources. */
  decimals: number;
  /** URL of the token's logo image. null if not available. */
  logo_url: string;
  /** Whether it has been verified. */
  is_verified: boolean;
  /** Whether or not to show as a common token in the wallet. */
  is_core: boolean;
  /** double - USD price. Price of 0 means no data. */
  price: number;
  /** integer - The timestamp when the current token was deployed on the blockchain. */
  time_at: number;
  /** double - The amount of user's token. */
  amount: number;
  /** integer - The raw amount of user's token. */
  raw_amount: number;
}
export type Protocol = {
  /** The protocol's id */
  id: string;
  /** The chain's id */
  chain: string;
  /** The protocol's name. null if not defined in the contract and not available from other sources */
  name: string
  /** URL of the protocol's logo image. null if not available */
  logo_url: string;
  /** prioritize websites that can be interacted with, not official websites */
  site_url: string;
  /** Is the portfolio already supported */
  has_supported_portfolio: boolean;
  /** Custom field - amount of all item's asset usd value */
  asset_usd_value: number;
  portfolio_item_list: PortfolioItem[];
}

export type PortfolioItem = {
  stats: {
    asset_usd_value: number;
    debt_usd_value: number;
    net_usd_value: number;
  };
  name: string;
  detail_types: string[];
  detail: {
    supply_token_list: Token[];
    reward_token_list: Token[];
    borrow_token_list: Token[];
  },
  pool: {
    id: string;
    chain: string;
    project_id: string;
    controller: string;
  }
}

export type Portfolio = {
  UserChainList: Chain[];
  WalletTokenList: Token[];
  ProtocolList: Protocol[];
}

const initPortfolio: Portfolio = {
  UserChainList: [],
  WalletTokenList: [],
  ProtocolList: []
}
export const PortfolioContext: any = React.createContext(initPortfolio);

export const usePortfolio = () => {
  const {
    portfolio
  }: usePortfolioReturn = useContext(PortfolioContext)
  return portfolio ?? initPortfolio
}

export const useUserChainList = (): Chain[] => {
  const {
    UserChainList
  }: Portfolio = usePortfolio()
  return UserChainList ?? []
}

export const useWalletTokenList = (): Token[] => {
  const {
    WalletTokenList
  }: Portfolio = usePortfolio()
  return WalletTokenList ?? []
}

export const useProtocolList = (): Protocol[] => {
  const {
    ProtocolList
  }: Portfolio = usePortfolio()
  return ProtocolList ?? []
}

export type usePortfolioReturn = {
  portfolio: Portfolio;
  loading: boolean;
  noData: boolean;
}
type usePortfolioFunc = () => usePortfolioReturn
type apiData = {
  data: any;
  error?: string
}
type axiosResponse = {
  data: apiData;
}
export const useAsyncPortfolio: usePortfolioFunc = () => {
  const [portfolio, setPortfolio] = useState<Portfolio>(initPortfolio);
  const [loading, setLoading] = useState<boolean>(true);
  const [noData, setNoData] = useState<boolean>(false);
  const {
    routerReady,
    router
  } = useRouterOnReady();
  const {
    address
  }: any = router.query;

  useEffect(() => {
    const fetchApi = async () => {
      /*const cachedData: any = window.localStorage.getItem('portfolio');
      if (cachedData) {
        setLoading(false)
        setPortfolio(JSON.parse(cachedData))
        return
      }*/

      if (!address) {
        if (routerReady) {
          setLoading(false);
          setNoData(true)
        }
        return
      }

      let {
        data: chains
      }: axiosResponse = await fetchUserChainList(address);
      if (!chains.data) {
        setLoading(false);
        setNoData(true);
        return
      }

      for (let [index, chain] of chains.data.entries()) {
        chains.data[index] = { ...chain, usd_value: 0 };
        let {
          data: chainBalance
        }: axiosResponse = await fetchUserChainBalance(address, chain.id);
        if (chainBalance.data) {
          chains.data[index].usd_value = chainBalance.data.usd_value
        }
      }

      let {
        data: tokens
      }: axiosResponse = await fetchUserTokenList(address);
      if (!tokens.data) {
        setLoading(false);
        setNoData(true);
        return
      }

      let {
        data: protocols
      }: axiosResponse = await fetchUserProtocolList(address);
      if (!protocols.data) {
        setLoading(false);
        setNoData(true);
        return
      }
      for (let [index, protocol] of protocols.data.entries()) {
        protocols.data[index] = { ...protocol, asset_usd_value: 0 };
        protocols.data[index].asset_usd_value = protocol.portfolio_item_list.reduce(
          (accumulator: number, protocolItem: any) => accumulator + protocolItem.stats.asset_usd_value,
          0
        )
      }

      /*window.localStorage.setItem('portfolio', JSON.stringify({
        UserChainList: chains.data,
        WalletTokenList: tokens.data,
        ProtocolList: protocols.data
      }))*/
      setPortfolio({
        UserChainList: chains.data,
        WalletTokenList: tokens.data,
        ProtocolList: protocols.data
      })
      setLoading(false)
    }

    fetchApi()
  }, [address]);
  return {
    portfolio,
    loading,
    noData
  }
}

export const fetchUserChainList = async (address: string) => {
  try {
    return await axios.get(`/api/debank/user/used_chain_list?id=${address}`)
  } catch (e) {
    console.log(e)
    return {
      data: null,
      error: 'Failed to fetch chains.'
    }
  }
}

export const fetchUserTokenList = async (address: string, is_all: boolean = false) => {
  try {
    return await axios.get(`/api/debank/user/all_token_list?id=${address}&is_all=${is_all}`)
  } catch (e) {
    console.log(e)
    return {
      data: null,
      error: 'Failed to fetch tokens.'
    }
  }
}

export const fetchUserProtocolList = async (address: string) => {
  try {
    return await axios.get(`/api/debank/user/all_complex_protocol_list?id=${address}`)
  } catch (e) {
    console.log(e)
    return {
      data: null,
      error: 'Failed to fetch protocols.'
    }
  }
}

export const fetchUserChainBalance = async (address: string, chain_id: string) => {
  try {
    return await axios.get(`/api/debank/user/chain_balance?id=${address}&chain_id=${chain_id}`)
  } catch (e) {
    console.log(e)
    return {
      data: null,
      error: 'Failed to fetch chain balance.'
    }
  }
}
