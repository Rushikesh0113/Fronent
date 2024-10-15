import React,{useState} from 'react'
import Header from '../../../Navbar/header'
import TestComponent from './TestComponent'
const Testhome = () => {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false)
    return (
     <div className={`${isSideNavOpen? 'sm:ml-64': ''}`} >
     <Header isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen}/>
     <TestComponent/>
     </div>
  )
}

export default Testhome