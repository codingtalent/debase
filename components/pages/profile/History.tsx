import type { FC } from 'react'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment  from 'moment'
import HistoryItem, { HistoryItemData, HistoryTrItem } from '@components/shared/HistoryItem'
import Loading from '@components/common/Loading'
import {
  XCircleIcon
} from '@heroicons/react/24/solid';

const chain_list = [{"id":"op","community_id":10,"name":"Optimism","native_token_id":"op","logo_url":"https://static.debank.com/image/chain/logo_url/op/01ae734fe781c9c2ae6a4cc7e9244056.png","wrapped_token_id":"0x4200000000000000000000000000000000000006","is_support_pre_exec":true},{"id":"arb","community_id":42161,"name":"Arbitrum","native_token_id":"arb","logo_url":"https://static.debank.com/image/chain/logo_url/arb/f6d1b236259654d531a1459b2bccaf64.png","wrapped_token_id":"0x82af49447d8a07e3bd95bd0d56f35241523fbab1","is_support_pre_exec":true},{"id":"bsc","community_id":56,"name":"BNB Chain","native_token_id":"bsc","logo_url":"https://static.debank.com/image/chain/logo_url/bsc/bc73fa84b7fc5337905e527dadcbc854.png","wrapped_token_id":"0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c","is_support_pre_exec":true},{"id":"btt","community_id":199,"name":"BitTorrent","native_token_id":"btt","logo_url":"https://static.debank.com/image/chain/logo_url/btt/2130a8d57ff2a0f3d50a4ec9432897c6.png","wrapped_token_id":"0x197a4ed2b1bb607e47a144b9731d7d34f86e9686","is_support_pre_exec":false},{"id":"eth","community_id":1,"name":"Ethereum","native_token_id":"eth","logo_url":"https://static.debank.com/image/chain/logo_url/eth/42ba589cd077e7bdd97db6480b0ff61d.png","wrapped_token_id":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","is_support_pre_exec":true},{"id":"ftm","community_id":250,"name":"Fantom","native_token_id":"ftm","logo_url":"https://static.debank.com/image/chain/logo_url/ftm/14133435f89637157a4405e954e1b1b2.png","wrapped_token_id":"0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83","is_support_pre_exec":true},{"id":"hmy","community_id":1666600000,"name":"Harmony","native_token_id":"hmy","logo_url":"https://static.debank.com/image/chain/logo_url/hmy/b3bfb4681f81a85e25c28e150dcbfe51.png","wrapped_token_id":"0xcf664087a5bb0237a0bad6742852ec6c8d69a27a","is_support_pre_exec":true},{"id":"kcc","community_id":321,"name":"KCC","native_token_id":"kcc","logo_url":"https://static.debank.com/image/chain/logo_url/kcc/3a5a4ef7d5f1db1e53880d70219d75b6.png","wrapped_token_id":"0x4446fc4eb47f2f6586f9faab68b3498f86c07521","is_support_pre_exec":false},{"id":"okt","community_id":66,"name":"OKC","native_token_id":"okt","logo_url":"https://static.debank.com/image/chain/logo_url/okt/428bf6035abb3863c9f5c1a10dc3afd3.png","wrapped_token_id":"0x8f8526dbfd6e38e3d8307702ca8469bae6c56c15","is_support_pre_exec":false},{"id":"avax","community_id":43114,"name":"Avalanche","native_token_id":"avax","logo_url":"https://static.debank.com/image/chain/logo_url/avax/4d1649e8a0c7dec9de3491b81807d402.png","wrapped_token_id":"0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7","is_support_pre_exec":true},{"id":"heco","community_id":128,"name":"HECO","native_token_id":"heco","logo_url":"https://static.debank.com/image/chain/logo_url/heco/db5152613c669e0cc8624d466d6c94ea.png","wrapped_token_id":"0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f","is_support_pre_exec":false},{"id":"xdai","community_id":100,"name":"Gnosis Chain","native_token_id":"xdai","logo_url":"https://static.debank.com/image/chain/logo_url/xdai/43c1e09e93e68c9f0f3b132976394529.png","wrapped_token_id":"0xe91d153e0b41518a2ce8dd3d7944fa863463a97d","is_support_pre_exec":true},{"id":"evmos","community_id":9001,"name":"EvmOS","native_token_id":"evmos","logo_url":"https://static.debank.com/image/chain/logo_url/evmos/26e038b4d5475d5a4b92f7fc08bdabc9.png","wrapped_token_id":"0xd4949664cd82660aae99bedc034a0dea8a0bd517","is_support_pre_exec":false},{"id":"matic","community_id":137,"name":"Polygon","native_token_id":"matic","logo_url":"https://static.debank.com/image/chain/logo_url/matic/52ca152c08831e4765506c9bd75767e8.png","wrapped_token_id":"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270","is_support_pre_exec":true},{"id":"aurora","community_id":1313161554,"name":"Aurora","native_token_id":"aurora","logo_url":"https://static.debank.com/image/chain/logo_url/aurora/da491099bb44690eda122cdd67c5c610.png","wrapped_token_id":"","is_support_pre_exec":false}]
const getCateInfo = (item: any, cate_dict: any, project_dict: any, token_dict: any) => {
  let result = {
    title: '',
    taker: '',
    logo: 'user'
  }
  if(item.cate_id){
    if(item.cate_id=="approve"){
      let symbol: string = ""
      if(typeof(token_dict[item.chain])!="undefined"){
        symbol = token_dict[item.chain]['symbol']
      }
      else{
        symbol = token_dict[item.token_approve.token_id]['symbol']
      }
      result.title = "Approve infinite " + symbol + " for " + item.other_addr
      result.logo = "/approval.svg"
    }
    else if(typeof(cate_dict[item.cate_id]) != "undefined"){
      result.title = cate_dict[item.cate_id]['name']
      result.taker = item.other_addr
    }
  }
  else if(item.tx){
    result.title = item.tx.name
    let project = project_dict[item.project_id]
    if(project){
      result.taker = project.name
      result.logo = project.logo_url
    }
  }
  else{
    result.title = "Contract Interaction"
    result.logo = "/contract.svg"
  }
  return result
}

const formatDollar = (amount: number) => {
  let result: string = ''
  if(amount>0.009){
    result = amount.toFixed(2)
  }
  else if(amount>0.0009){
    result = amount.toFixed(3)
  }
  else if(amount>0.00009){
    result = amount.toFixed(4)
  }
  else if(amount>0.0000009){
    result = '< 0.0001'
  }
  else{
    result = '0'
  }
  return '$' + result
}
const getGasFee = (tx: any, chain: string, token_dict: any) => {
  if(tx){
    let gas_fee: string = (tx.eth_gas_fee).toFixed(4)
    let usd_gas_fee: number = tx.usd_gas_fee
    let result: string = formatDollar(usd_gas_fee)

    if(typeof(token_dict[chain])!="undefined"){
      gas_fee += token_dict[chain]['symbol']
    }
    return gas_fee + "(" + result + ")"
  }
  return ''
}
const getTrContent = (amount: number, token: any) => {
  let content = ''
  if(token){
    if(token['price']){
      content =  amount + " " + token['symbol'] + ' (' + formatDollar(amount * token['price']) + ')'
    }
    else{
      content =  amount + " " + token['name']
    }
  }
  return content
}
const getTokenIcon = (token: any) => {
  let logo = '/defaultToken.svg'
  if(token){
    if(token['logo_url']){
      logo = token['logo_url']
    }
    else if(token['thumbnail_url']){
      logo = token['thumbnail_url']
    }
    else{
      logo = "/nft.png"
    }
  }
  return logo
}
const getTrItems = (item:any, token_dict:any) => {
  let trItems: HistoryTrItem[] = [];
  for(let tr of item.receives){
    trItems.push({
      added: true,
      content: '+' + getTrContent(tr.amount, token_dict[tr.token_id]),
      icon_url: getTokenIcon(token_dict[tr.token_id]),
      token_id: tr.token_id,
      is_price_token: token_dict[tr.token_id]["price"] != null
    })
  }
  for(let tr of item.sends){
    trItems.push({
      added: false,
      content: '-' + getTrContent(tr.amount, token_dict[tr.token_id]),
      icon_url: getTokenIcon(token_dict[tr.token_id]),
      token_id: tr.token_id,
      is_price_token: token_dict[tr.token_id]["price"] != null
    })
  }
  return trItems
}

const getTxInfo = (id: string, chain: string) => {
  // https://bttcscan.com/tx/0x6ac4c1cb707b55cc49bb3228e29952fb26702782ef46e967ad58dadabc698100
  //      https://etherscan.io/tx/0x29fc058954a0a4b661d7b601c3765e8735b38f486ef901ffe8b380a1169155ab
  //      https://arbiscan.io/tx/0xab429275d0bf902be340865d0e2062d21d91f9d77e0059f74ff3f50773787c10
  let result: any = {
    url: '',
    logo: ''
  }
  let url: string = ""
  switch(chain){
    case 'arb':
      url = "https://arbiscan.io/tx/"
      break
    case 'btt':
      url = "https://bttcscan.com/tx/"
      break
    case 'eth':
      url = "https://etherscan.io/"
      break
    default:
      url = "https://bscscan.com/tx/"
  }
  result.url = url + id;

  for(let i:number = 0; i< chain_list.length; i++){
    if(chain_list[i]['id']==chain){
      result.logo = chain_list[i]["logo_url"]
      break
    }
  }

  return result
}
let tokenDict:any = {}
const fetchHistoryData = async (address: string, chain: string, timestamp: number=0, token: string='') => {
  //http://localhost:3000/api/debank/user/all_history_list?id=0x3ddfa8ec3052539b6c9549f12cea2c295cff5296
  let param = "?id=" + address
  let action = 'all_history_list'
  if(timestamp > 0){
    param += "&start_time=" + timestamp
  }
  if(token != ""){
    param += "&token_id=" + token
    action = 'history_list'
  }
  if(chain != ""){
    param += "&chain_id=" + chain
    action = 'history_list'
  }
  let historyList: HistoryItemData[] = []
  const res = await axios.get("/api/debank/user/" + action + param).catch(function (error) {
    return { data: { data: {}}}
  })

  if(res.data.data && res.data.data.history_list){
    let cate_dict:any = res.data.data.cate_dict
    let project_dict:any = res.data.data.project_dict
    let token_dict:any = res.data.data.token_dict
    let history_list:any= res.data.data.history_list
    tokenDict = token_dict
    for(let item of history_list){
      let catInfo: any = getCateInfo(item, cate_dict, project_dict, token_dict)
      let txtInfo: any = getTxInfo(item.id, item.chain)
      historyList.push(
        {
          cate: catInfo.title,
          cate_logo: catInfo.logo,
          date: moment.unix(item.time_at).format('YYYY/MM/DD hh:mm:ss'),
          taker: catInfo.taker,
          gas_fee: getGasFee(item.tx, item.chain, token_dict),
          chain: item.chain,
          tx_id: item.id,
          tx_url: txtInfo.url,
          tx_logo: txtInfo.logo,
          receives_sends: getTrItems(item, token_dict),
          time_at: item.time_at
        }
      )
    }
  }
  return historyList;
};


const fetchTokenData = async (keyword: string, chain: string) => {
  //https://api.debank.com/history/token_search?chain=bsc&q=te
  let param = "?chain=" + chain + "&q=" + keyword
  //let historyList: HistoryItemData[] = []
  const res = await axios.get("/api/debank/history/token_search" + param).catch(function (error) {
    return { data: { data: {}}}
  })

  return res
};

const History: FC = () => {

  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [historyData, setHistoryData] = useState([] as HistoryItemData[])
  const [filterToken, setFilterToken] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [chain, setChain] = useState('')
  const [hasMoreData, setHasMoreData] = useState(false)
  const [isTokenChain, setIsTokenChain] = useState(false)

  const router = useRouter()
  let address: string  = router.query?.address as string
  if (!address) {
    address = process.env.NEXT_PUBLIC_DEFAULT_ADDRESS as string
  }

  const loadingMoreIcon = (
    <div className="h-full flex justify-center items-center">
      <Loading  />
    </div>
  );

  const loadingIcon = (
    <div className="h-full pt-4 flex justify-center items-center">
      <Loading  />
    </div>
  );

  const loadMore = () => {
    if(!loadingMore){
      (async () => {
        let lastItem = historyData.length > 1 ? historyData[historyData.length - 1] : null
        if(lastItem){
          setLoadingMore(true)
          let timestamp = lastItem.time_at
          let list:HistoryItemData[] = await fetchHistoryData(address, chain, timestamp, filterToken);
          setLoadingMore(false)
          setHistoryData(historyData.concat(list))
          if(list.length==20){
            setHasMoreData(true)
          }
          else{
            setHasMoreData(false)
          }
        }
      })()
    }
  }


  const filterByToken = (token_id: string, is_price_token: boolean) => {
    if(is_price_token){
      let token: any = tokenDict[token_id]
      setTokenSymbol("Filter by Token: " + token['symbol'])
      if(chain==""){
        setIsTokenChain(true)
      }
      setChain(token['chain'])
      setFilterToken(token_id)
    }
  }

  const removeFilterToken = () => {
    setTokenSymbol("")
    if(isTokenChain){
      setChain("")
    }
    setFilterToken("")
  }
  

  /*const searchToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    //e.preventDefault()
    let keyword = e.target.value;

    (async () => {
      let dd = await fetchTokenData(keyword, 'arbx')
      console.log(dd)
    })()
  }*/

  useEffect(() => {
    (async () => {
      setLoading(true)
      let list:HistoryItemData[] = await fetchHistoryData(address, chain, 0, filterToken);
      setHistoryData(list)
      setLoading(false)
      if(list.length==20){
        setHasMoreData(true)
      }
      else{
        setHasMoreData(false)
      }
    })()
  }, [chain, filterToken]);

  return (
    <div className="flex flex-col py-4 m-auto history-container">
      <div className="filter_token flex">
        <div className="search_input">
          {
            tokenSymbol=="" && (<span>Filter by Token: All</span>)
          }
          <div className="input_wrap">
            <svg width="16" height="16" viewBox="0 0 16 16" className="input_search_icon">
              <path fillRule="evenodd" clipRule="evenodd" d="M10.6312 12.3466C9.68491 12.9703 8.55152 13.3334 7.33334 13.3334C4.01963 13.3334 1.33334 10.6471 1.33334 7.33337C1.33334 4.01967 4.01963 1.33337 7.33334 1.33337C10.647 1.33337 13.3333 4.01967 13.3333 7.33337C13.3333 8.70648 12.8721 9.97185 12.0961 10.983L14.9881 13.875L13.5739 15.2892L10.6312 12.3466ZM7.33342 11.3334C9.54256 11.3334 11.3334 9.54253 11.3334 7.33339C11.3334 5.12426 9.54256 3.33339 7.33342 3.33339C5.12428 3.33339 3.33342 5.12426 3.33342 7.33339C3.33342 9.54253 5.12428 11.3334 7.33342 11.3334Z"></path>
            </svg>
            <input autoComplete="off" defaultValue={tokenSymbol} className="input_input" type="text" />
            {
              filterToken!='' && (<XCircleIcon className="text-gray-400 cursor-pointer absolute right-[-10px] top-[8px] w-4 h-4" onClick={removeFilterToken} />)
            }
          </div>
        </div>
      </div>
      <div className="history_content py-2 px-4 mt-4 mb-10 bg-white rounded min-h-[60px]">
        { loading ? loadingIcon :
          (historyData.length == 0 ?
            (<p className="italic text-center leading-8">No data</p>)
            : 
            (historyData ?? []).map((item, i) => (
            <HistoryItem data={item} clickFun={filterByToken} key={`historyItem${i}`} />
            )
          ))
        }
      </div>
      { hasMoreData && (
        <div onClick={ loadMore } className="w-full mx-auto mb-8 text-center">
          <div className="btn btn-load-more inline-block">
          {
            loadingMore ?  loadingMoreIcon : 'Load More'
          }
          </div>
        </div>)
      }
    </div>
  )
}

export default History
