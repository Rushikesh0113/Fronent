import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <>
    
  <div className="flex flex-row flex-wrap gap-5 p-4 m-4">
<Link to={"/create/topic"}>
<div className="w-64 h-64  m-2 p-2 rounded-md shadow shadow-md shadow-current hover:scale-105 duration-300		">
<div className="flex flex-col justify-between items-center h-full py-4" >
  <h2 className=" m-2  p-2"><img width="100" alt=' of create' src="https://cdn2.iconfinder.com/data/icons/lucid-generic/24/new_artboard_file_create_post-512.png"/></h2>
<div className="m-2 p-2 border border-gray-300 rounded-xl"><p>Create New Topic</p></div>
</div>
  </div>
</Link>
 
<Link to={"/teacher/create/subject"}>
<div className="w-64 h-64  m-2 p-2 rounded-md shadow shadow-md shadow-current hover:scale-105 duration-300		">
<div className="flex flex-col justify-between items-center h-full py-4" >
  <h2 className=" m-2  p-2"><img width="100" alt=' of create' src="https://cdn2.iconfinder.com/data/icons/lucid-generic/24/new_artboard_file_create_post-512.png"/></h2>
<div className="m-2 p-2 border border-gray-300 rounded-xl"><p>Create New Subject</p></div>
</div>
  </div>
</Link>
<Link to={"/teacher/create/chapter"}>
<div className="w-64 h-64  m-2 p-2 rounded-md shadow shadow-md shadow-current hover:scale-105 duration-300		">
<div className="flex flex-col justify-between items-center h-full py-4" >
  <h2 className=" m-2  p-2"><img width="100" alt=' of create' src="https://cdn2.iconfinder.com/data/icons/lucid-generic/24/new_artboard_file_create_post-512.png"/></h2>
<div className="m-2 p-2 border border-gray-300 rounded-xl"><p>Create New Chapter</p></div>
</div>
  </div>
</Link>
<Link to={"/teacher/create/ptest"}>
<div className="w-64 h-64  m-2 p-2 rounded-md shadow shadow-md shadow-current hover:scale-105 duration-300		">
<div className="flex flex-col justify-between items-center h-full py-4" >
  <h2 className=" m-2  p-2"><img width="100" alt=' of create' src="https://cdn2.iconfinder.com/data/icons/lucid-generic/24/new_artboard_file_create_post-512.png"/></h2>
<div className="m-2 p-2 border border-gray-300 rounded-xl"><p>Create New Physical Test</p></div>
</div>
  </div>
</Link>
  </div>
  
    </>
  )
}

export default Home