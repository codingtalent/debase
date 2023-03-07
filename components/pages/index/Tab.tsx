import type { FC } from 'react'
import { useState } from 'react'
import { Tab } from '@headlessui/react'

const ProfileTabs: FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <Tab.List>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
      </Tab.List>
      <Tab.Panels>
        
      </Tab.Panels>
    </Tab.Group>
  )
}

export default ProfileTabs
