import type { FC } from 'react'
import HistoryItem, { HistoryItemData } from '@components/shared/HistoryItem'

const History: FC = () => {
  let data: HistoryItemData[] = [
    {date: "2023/03/05 17:39:11", tx_hash: '0x6782472a11987e6f4a8afb10def25b498cb622db', type: 'Send', sender: '0x6782472a11987e6f4a8afb10def25b498cb622db', tr_content: '- 28,807,629.9144 TRU （$3,108,487.08）', gas_fee: '0.0011ETH($1.74)'},
    {date: "2023/03/05 17:39:11", tx_hash: '0x6782472a11987e6f4a8afb10def25b498cb622db', type: 'Receive', sender: '0x6782472a11987e6f4a8afb10def25b498cb622db', tr_content: '+ 133,952.3115 TRU （$4,971.86）', gas_fee: ''},
    {date: "2023/03/05 17:39:11", tx_hash: '0x6782472a11987e6f4a8afb10def25b498cb622db', type: 'Send', sender: '0x6782472a11987e6f4a8afb10def25b498cb622db', tr_content: '- 28,807,629.9144 TRU （$3,108,487.08）', gas_fee: '0.0011ETH($1.74)'},
    {date: "2023/03/05 17:39:11", tx_hash: '0x6782472a11987e6f4a8afb10def25b498cb622db', type: 'Send', sender: '0x6782472a11987e6f4a8afb10def25b498cb622db', tr_content: '- 28,807,629.9144 TRU （$3,108,487.08）', gas_fee: '0.0011ETH($1.74)'},
    {date: "2023/03/05 17:39:11", tx_hash: '0x6782472a11987e6f4a8afb10def25b498cb622db', type: 'Send', sender: '0x6782472a11987e6f4a8afb10def25b498cb622db', tr_content: '- 28,807,629.9144 TRU （$3,108,487.08）', gas_fee: '0.0011ETH($1.74)'},
    {date: "2023/03/05 17:39:11", tx_hash: '0x6782472a11987e6f4a8afb10def25b498cb622db', type: 'Receive', sender: '0x6782472a11987e6f4a8afb10def25b498cb622db', tr_content: '+ 133,952.3115 TRU （$4,971.86）', gas_fee: ''},
    {date: "2023/03/05 17:39:11", tx_hash: '0x6782472a11987e6f4a8afb10def25b498cb622db', type: 'Receive', sender: '0x6782472a11987e6f4a8afb10def25b498cb622db', tr_content: '+ 133,952.3115 TRU （$4,971.86）', gas_fee: ''},
    {date: "2023/03/05 17:39:11", tx_hash: '0x6782472a11987e6f4a8afb10def25b498cb622db', type: 'Receive', sender: '0x6782472a11987e6f4a8afb10def25b498cb622db', tr_content: '+ 133,952.3115 TRU （$4,971.86）', gas_fee: ''},
    {date: "2023/03/05 17:39:11", tx_hash: '0x6782472a11987e6f4a8afb10def25b498cb622db', type: 'Send', sender: '0x6782472a11987e6f4a8afb10def25b498cb622db', tr_content: '- 28,807,629.9144 TRU （$3,108,487.08）', gas_fee: '0.0011ETH($1.74)'},
  ];
  return (
    <div className="flex flex-col py-4 px-8 w-9/12 m-auto history-container">
      <div className="filter_token flex">
        <div className="search_input">
          <span>Filter by Token: All</span>
          <div className="input_wrap">
            <svg width="16" height="16" viewBox="0 0 16 16" className="input_search_icon">
              <path fillRule="evenodd" clipRule="evenodd" d="M10.6312 12.3466C9.68491 12.9703 8.55152 13.3334 7.33334 13.3334C4.01963 13.3334 1.33334 10.6471 1.33334 7.33337C1.33334 4.01967 4.01963 1.33337 7.33334 1.33337C10.647 1.33337 13.3333 4.01967 13.3333 7.33337C13.3333 8.70648 12.8721 9.97185 12.0961 10.983L14.9881 13.875L13.5739 15.2892L10.6312 12.3466ZM7.33342 11.3334C9.54256 11.3334 11.3334 9.54253 11.3334 7.33339C11.3334 5.12426 9.54256 3.33339 7.33342 3.33339C5.12428 3.33339 3.33342 5.12426 3.33342 7.33339C3.33342 9.54253 5.12428 11.3334 7.33342 11.3334Z"></path>
            </svg>
            <input autoComplete="off" className="input_input" type="text" />
          </div>
        </div>
      </div>
      <div className="history_content py-2 px-4 mt-4 mb-10 bg-white rounded min-h-[60px]">
        {(data ?? []).map((item, i) => (
          <HistoryItem data={item} key={`historyItem${i}`} />
        ))}
      </div>
      <div className="w-full mx-auto mb-8 text-center">
        <div className="btn btn-load-more inline-block">Load More</div>
      </div>
    </div>
  )
}

export default History
