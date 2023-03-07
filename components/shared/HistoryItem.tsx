import {
  UserIcon
} from '@heroicons/react/24/outline';

export type HistoryItemData = {
  date: string;
  tx_hash: string;
  type: string;
  sender: string;
  tr_content: string;
  gas_fee: string;
}

export type HistoryItemProps = {
  data: HistoryItemData
}

export default ({data}: HistoryItemProps) => {
  //let title = moment(timestamp).format('YYYY-MM-DD hh:mm:ss');
  return (
    <div className="flex border-t-gray-200 first:border-t-0 border-t text-sm py-6 text-gray-800">
      <div className="text-gray-400 w-2/12">
        <div>{data.date}</div>
        <div className="truncate  w-8/12">{data.tx_hash}</div>
      </div>
      <div className="flex gap-1 w-3/12 leading-4">
        <div className="w-1/12">
          <UserIcon className="w-6 h-6 text-gray-400" />
        </div>
        <div className="w-11/12">
          <div className="text-gray-400 mb-1">{data.type}</div>
          <div className="truncate w-10/12">{data.sender}</div>
        </div>
      </div>
      <div className="w-4/12 truncate">
        <div className="border-b-gray-600 border-dashed border-b inline-block">{data.tr_content}</div>
      </div>
      <div className="w-3/12">
        <span className="text-gray-400 mr-1">Gas Fee</span>
        <span className="truncate text-gray-600">{data.gas_fee}</span>
      </div>
    </div>
  )
}
