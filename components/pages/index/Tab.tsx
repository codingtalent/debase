import type { FC } from 'react'
import { useState } from 'react'
import { Tab } from '@headlessui/react'
import Portfolio from '@components/pages/index/Portfolio'
import History from '@components/pages/index/History'

const ProfileTabs: FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  return (
    <Tab.Group
      as='div'
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}>
      <div className='content_header_tab_container'>
        <div className='content_header_tab_wrap'>
          <Tab.List as='div' className='content_header_tab'>
            <Tab className='content_header_tab_item'>Portfolio</Tab>
            <Tab className='content_header_tab_item'>History</Tab>
          </Tab.List>
        </div>
      </div>

      <Tab.Panels
        as='div'
        className='tab_container'>
        <Tab.Panel unmount={false}><Portfolio /></Tab.Panel>
        <Tab.Panel><History /></Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}

export default ProfileTabs
