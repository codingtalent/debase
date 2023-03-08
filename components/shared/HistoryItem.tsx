import {
  UserIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx'

export type HistoryTrItem = {
  added: boolean
  content: string
  icon_url: string
  token_id: string
  is_price_token: boolean
}
/*export type HistoryTxItem = {
  eth_gas_fee: number
  usd_gas_fee: number
  unit: string
}
export type HistoryItemData2 = {
  date: string;
  tx_hash: string;
  type: string;
  sender: string;
  tr_content: string;
  gas_fee: string;
}*/
export type HistoryItemData = {
  date: string
  cate: string//cate id null, pick tx name
  taker: string
  cate_logo: string
  gas_fee: string
  chain: string
  tx_id: string
  tx_url: string
  tx_logo: string
  receives_sends: HistoryTrItem[]
  time_at: number
}

export type HistoryItemProps = {
  data: HistoryItemData
  clickFun: any
}

export default ({data, clickFun}: HistoryItemProps) => {
  //let title = moment(timestamp).format('YYYY-MM-DD hh:mm:ss');
  return (
    <div className="flex border-t-gray-200 first:border-t-0 border-t text-sm py-6 text-gray-800">
      <div className="text-gray-400 w-2/12">
        <div>{data.date}</div>
        <div className="w-8/12 gap-1 flex">
          {
            data.tx_logo !='' && (
              <img src={data.tx_logo} className="w-4 h-4 inline-block"/>
            )
          }
          <a className="truncate  w-10/12" href={data.tx_url} target="_blank">{data.tx_id}</a>
        </div>
      </div>
      <div className="flex gap-1 w-3/12 leading-4 items-center">
        <div className="w-[24px]">
          {
            data.cate_logo=="user" ? (<UserIcon className="w-6 h-6 text-gray-400" />)
            : (<img src={data.cate_logo} className="w-6 h-6 text-gray-400" />)
          }
          
        </div>
        <div className="w-10/12">
          {
            data.cate_logo=="approval.svg" ? (
              <div className="text-gray-400 mb-1 leading-8 truncate">{data.cate}</div>
            ) : (
              <>
              <div className="text-gray-400 mb-1 truncate">{data.cate}</div>
              <div className="truncate w-10/12">{data.taker}</div>
              </>
            )
          }
        </div>
      </div>
      <div className="w-4/12 truncate flex flex-col">
        {(data.receives_sends).map((item, i) => (
          <div className={clsx(
            'flex gap-1',
            {
              'cursor-pointer ': item.is_price_token,
              '': !item.is_price_token
            }
          )} key={`receive${i}`} onClick={() => clickFun(item.token_id, item.is_price_token)}>
            <img src={item.icon_url} className="w-5 mt-1 h-5" />
            <div className={clsx(
              'border-b-gray-600 border-dashed border-b inline-block text-sm w-max leading-6',
              {
                'text-green-600 ': item.added,
                '': !item.added
              }
            )}>{item.content}</div>
          </div>
        ))}
      </div>
      <div className="w-3/12 text-sm">
        <span className="text-gray-400 mr-1">{data.gas_fee ? 'Gas Fee' : ''}</span>
        <span className="truncate text-gray-600">{data.gas_fee}</span>
      </div>
    </div>
  )
}
