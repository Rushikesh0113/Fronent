import React ,{useState} from 'react'
import Header from '../../../Navbar/header';
import TestCheck from './TestCheck';
const TestCheckHome = () => {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  return (
    <div className={`${isSideNavOpen ? 'sm:ml-64' : ''}`}>
        <Header isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen} />
        <TestCheck/>
        </div>
  )
}

export default TestCheckHome