import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '@components/layout/Header';

const Home: NextPage = () => {
  return (
    <div className="page_content">
      <Header />
      <div className="content_header_wrap">
        <div className='content_header'>
          <div className='content_header_info'>

          </div>
          <div className='content_header_tab_wrap'>
            <div className="content_header_tab">
              <div className="content_header_tab_item active">Portfolio</div>
              <div className="content_header_tab_item">History</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
