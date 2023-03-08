import type { FC } from 'react'
import { useRouter } from 'next/router'

const ASide: FC = () => {
  const router = useRouter()
  const { address } = router.query
  const default_address = process.env.NEXT_PUBLIC_DEFAULT_ADDRESS

  return (
    <aside className='aside'>
      <div className='aside-top'>
        <div>
          <a href={`/profile/${default_address}`} className='active'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 30" width="110" height="30">
              <rect width="110" height="30" fill="transparent"></rect>
              <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontFamily="monospace" fontSize="26px" fill="#000000">DeBase</text>   
            </svg>
          </a>
        </div>
        <div className='aside-menu'>
          <a aria-current="page" className="item" href={`/profile/${address? address : default_address}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="menu-icon">
              <path d="M4.22544 9.42513V21.0681H19.7746V9.42513M1.63391 10.9924L12 2.93188L22.3661 10.9924" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <span>Home</span>
          </a>
          <div className="aside-menu-line"></div>
        </div>
      </div>
      <div className='aside-bottom'></div>
    </aside>
  )
}

export default ASide
