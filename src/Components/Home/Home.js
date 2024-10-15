import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Home = () => {
  const data=useSelector(store=>store?.user?.status)
  const role=useSelector(store=>store?.user?.data?.role)
  return (
  <>
  <nav className="bg-[#FF725E] border-solid border-black">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link to={"/"} className="flex items-center space-x-3 rtl:space-x-reverse">
   
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">ProLearning</span>
    </Link>
    <div>
{  data ?(  <Link to={`/${role}/dashboard`}><button className="border-2 border-black w-fit font-medium bg-[#FF725E] rounded-md p-2 hover:bg-[#f1bb87] transition-all hover:rounded-3xl text-white">Dashboard</button></Link> )
 : (<div> <Link to={'/login'}><button className="border-2 border-black w-fit font-medium bg-[#FF725E] rounded-md p-2 hover:bg-[#f1bb87] transition-all hover:rounded-3xl text-white">Login</button></Link> 
     <Link to={'/signup'}> <button className="border-2 border-black w-fit font-medium bg-[#FF725E] rounded-md p-2 hover:bg-[#f1bb87] transition-all hover:rounded-3xl text-white">Sign Up</button></Link></div>)  }
    </div>
  </div>
</nav>
 

<div className="flex mt-6">
  <div className="flex justify-center md:w-1/2">
    <img 
      className="w-full h-auto object-cover rounded-lg" 
      src="https://img.freepik.com/free-vector/learning-concept-illustration_114360-3896.jpg?ga=GA1.1.737633284.1719914973&semt=sph" 
      alt="Learning Concept" 
    />
  </div>

  <div className="md:w-1/2 flex items-center">
    <h1 className="p-2 text-3xl font-bold">ProLearning is Changing the World</h1>
    <div className="p-2 text-lg">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dolor alias aut, adipisci ad voluptates placeat cupiditate. Quidem, vitae voluptatem laborum officiis molestias minus perferendis nulla sed sit animi est! 
      <br/><br/>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dolor alias aut, adipisci ad voluptates placeat cupiditate. Quidem, vitae voluptatem laborum officiis molestias minus perferendis nulla sed sit animi est!
    </div>
  </div>
</div>

 
<footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/2 md:w-1/3 mb-6">
            <h5 className="text-xl font-bold mb-2">ProLearning (JPL)</h5>
            <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis quam tristique convallis.</p>
          </div>
          <div className="w-full sm:w-1/3 md:w-1/3 mb-6">
            <h5 className="text-xl font-bold mb-2">Links</h5>
            <ul className="list-none">
              <li><Link to={"#"} className="text-gray-400 hover:text-white">Home</Link></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/3 md:w-1/3 mb-6">
            <h5 className="text-xl font-bold mb-2">Contact Us</h5>
            <ul className="list-none">
              <li className="text-gray-400">FTTX-Room, B-Ground Floor, </li>
              <li className="text-gray-400">Ghansoli, Maharashtra-411405</li>
              <li className="text-gray-400">Phone: (123) 456-7890</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          &copy; 2024 Company Name. All rights reserved.
        </div>
      </div>
    </footer>
  </>
  )
}

export default Home