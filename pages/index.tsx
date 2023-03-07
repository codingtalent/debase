import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '@components/layout/Header'
import ProfileTabs from '@components/pages/index/Tab'
import DeArea from '@components/pages/index/DeArea'

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Home: NextPage = () => {
  return (
    <div className="page_content">
      <Header />

      <div className="content_header_wrap">
        <div className='content_header'>
          <div className='content_header_info_wrap'>
            <div className='content_header_info'>
              <div>
                <div className='content_header_info_main'>
                  <div className='avatar_wrap'>
                    <div className='avatar'>
                      <div className='avatar_img_container'><img src='/avatar.svg' /></div>
                    </div>
                  </div>
                  <div className='user_info'>
                    <div className="user_info_uid"><span className="user_info_uid_unset">No ID</span></div>
                    <div className="user_info_address">
                      <span>0x3ddfa8ec3052539b6c9549f12cea2c295cff5296</span>
                      <div className="user_info_address_copy">
                        <svg width="20px" height="20px" viewBox="0 0 20 20">
                          <g id="copy" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <circle id="Oval" fill="currentColor" cx="10" cy="10" r="10"></circle>
                            <g id="Group-13" transform="translate(5.794476, 5.790468)" stroke="#616B84">
                              <path d="M3.5978014,6.21230639e-14 L6.00483293,6.21230639e-14 C6.24961697,6.2522187e-14 6.48589921,0.0897832911 6.66891449,0.252339862 L7.72628545,1.19151064 C7.93994388,1.38128488 8.06220389,1.65340132 8.06220389,1.93917078 L8.06220389,5.79807571 C8.06220389,6.35036046 7.61448864,6.79807571 7.06220389,6.79807571 L3.5978014,6.79807571 C3.04551665,6.79807571 2.5978014,6.35036046 2.5978014,5.79807571 L2.5978014,1 C2.5978014,0.44771525 3.04551665,6.22245169e-14 3.5978014,6.21230639e-14 Z" id="Rectangle"></path>
                              <path d="M5.46440249,7.1136292 L5.46440249,7.1136292 L5.46440249,7.70730424 C5.46440249,8.31088547 4.97510322,8.80018474 4.37152199,8.80018474 L1.0928805,8.80018474 C0.489299265,8.80018474 0,8.31088547 0,7.70730424 L0,3.09498952 C0,2.49140829 0.489299265,2.00210903 1.0928805,2.00210903 L2.34654139,2.00210903 L2.34654139,2.00210903" id="Path"></path>
                              <path d="M5.61108423,0 L5.61108423,1.84318671 C5.61108423,2.06410061 5.79017033,2.24318671 6.01108423,2.24318671 L8.06220389,2.24318671 L8.06220389,2.24318671" id="Path-2"></path>
                            </g>
                          </g>
                        </svg>
                      </div>
                      <div className="user_info_address_qrcode">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="currentColor"></path>
                          <path d="M9 5.5H5.5V9H9V5.5Z" stroke="#616B84" strokeLinejoin="round"></path>
                          <path d="M9 11H5.5V14.5H9V11Z" stroke="#616B84" strokeLinejoin="round"></path>
                          <path d="M14.5 5.5H11V9H14.5V5.5Z" stroke="#616B84" strokeLinejoin="round"></path>
                          <path d="M11.25 11V14.5" stroke="#616B84" strokeLinecap="round"></path>
                          <path d="M14.25 11V14.5" stroke="#616B84" strokeLinecap="round"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="user_info_address_tags">
                      <div className="db-user-tag-list">
                        <div className="db-user-tag is-age" title='Active since 2021-04-27'>
                          <img src="https://assets.debank.com/static/media/age.50db5865.svg" className="db-user-tag-icon" />
                          678 days
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='content_header_info_right'>
                <DeArea color='#f63d3d' tip={false} data={data} xKey='pv' />
              </div>
            </div>
          </div>

        </div>
      </div>

      <ProfileTabs />
    </div>
  )
}

export default Home
