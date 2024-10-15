import React ,{useState} from 'react'
import Header from '../../Navbar/header.js'
import CustomSubject from './CustomSubject.js'
const Studeymaterial = () => {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false)
    return (
     <div className={`${isSideNavOpen? 'sm:ml-64': ''}`} >
     <Header isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen}/>
      <CustomSubject />
     </div>
  )
}

export default Studeymaterial