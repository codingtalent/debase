import type { FC } from 'react'

const Header: FC = () => {
  return (
    <header className="header">
      <div className='header_container'>
        <div className="nav">
          <div className="nav_back_btn">
            <svg width="17" height="14" viewBox="0 0 17 14" fill="none">
              <path d="M16 6H3.41399L7.70699 1.707C8.09699 1.317 8.09699 0.683997 7.70699 0.292997C7.31699 -0.0980028 6.68399 -0.0970028 6.29299 0.292997L0.292988 6.293C-0.0970117 6.683 -0.0970117 7.316 0.292988 7.707L6.29299 13.707C6.48799 13.902 6.74299 14 6.99999 14C7.25699 14 7.51199 13.902 7.70699 13.707C8.09699 13.317 8.09699 12.684 7.70699 12.293L3.41399 8H16C16.553 8 17 7.553 17 7C17 6.447 16.553 6 16 6Z" fill="currentColor"></path>
            </svg>
          </div>
          <h1 className="nav_address">0x3ddf...5296</h1>
        </div>
        <div className='option'>
          <div className="search">
            <div className="input">
              <span>Search address</span>
              <div className="input_wrap">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="input_search_icon">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.6312 12.3466C9.68491 12.9703 8.55152 13.3334 7.33334 13.3334C4.01963 13.3334 1.33334 10.6471 1.33334 7.33337C1.33334 4.01967 4.01963 1.33337 7.33334 1.33337C10.647 1.33337 13.3333 4.01967 13.3333 7.33337C13.3333 8.70648 12.8721 9.97185 12.0961 10.983L14.9881 13.875L13.5739 15.2892L10.6312 12.3466ZM7.33342 11.3334C9.54256 11.3334 11.3334 9.54253 11.3334 7.33339C11.3334 5.12426 9.54256 3.33339 7.33342 3.33339C5.12428 3.33339 3.33342 5.12426 3.33342 7.33339C3.33342 9.54253 5.12428 11.3334 7.33342 11.3334Z" fill="#BABEC9"></path>
                </svg>
                <input autoComplete="off" className="input_input" type="text" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
