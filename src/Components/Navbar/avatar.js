import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { RiArrowDropDownLine } from "react-icons/ri";

const Avatar = () => {
    const[check,setcheck]=useState(true)
    const data = useSelector((store) => store.user.data);
    const getInitials = (name) => {
      if (!name) return '';
      const nameParts = name.split(' '); // Split the name by space
      const initials = nameParts.map(part => part[0].toUpperCase()); // Get the first letter of each part
      return initials.join(''); // Join the initials
    };
    var userName = data.fullName;
    const initials = getInitials(userName);
  return (
    
    <>
    {/* <button id="dropdownDefaultButton" onClick={()=>{setcheck(!check)}} data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
</svg>

</button> */}

<div> <div className='flex flex-row'>

<div className='flex flex-row' onClick={()=>{setcheck(!check)}}>
<div   className="z-50   inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-[#3DB4F6] rounded-full dark:bg-blue-600">
                <span className="font-medium text-white dark:text-gray-300">{initials}</span>
              </div>
              <RiArrowDropDownLine size={40}/>

</div>
</div></div>
    </>
  )
}

export default Avatar