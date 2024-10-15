import React,{useState} from 'react'
import Header from '../../Navbar/header'
const PerformanceHome = () => {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false)
    return (
     <div className={`${isSideNavOpen? 'sm:ml-64': ''}`} >
     <Header isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen}/>
     performance
     </div>
  )
}

export default PerformanceHome