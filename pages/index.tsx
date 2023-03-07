import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '@components/layout/Header';
import ProfileTabs from '@components/pages/index/Tab'

const Home: NextPage = () => {
  return (
    <div className="page_content">
      <Header />

      <div className="content_header_wrap">
        <div className='content_header'>
          <div className='content_header_info'>

          </div>

          
        </div>
      </div>

      <ProfileTabs />
    </div>
  )
}

export default Home
