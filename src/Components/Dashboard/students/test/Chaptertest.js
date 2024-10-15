import React,{useEffect,useState} from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Header from '../../../Navbar/header'
import Loading from '../../../Loading/Loading'
import { IoIosArrowBack } from "react-icons/io";
export const Chaptertest = () => {
  const navigate=useNavigate()
  const {Id}=useParams()
  const [test, setTest] = useState(null);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)
  
  useEffect(() => {
    const fetchTest = async () => {
      try {
        axios.defaults.withCredentials=true;

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/chapters/chapter-tests/chapter/${Id}`);
        setTest(response.data.data);
      } catch (error) {
        console.error('Error fetching test:', error);
      }
    };

    fetchTest();
  }, [Id]);
  return (
    <>
        
   
     <div className={`${isSideNavOpen? 'sm:ml-64': ''}`} >
     <Header isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen}/>
     <div className='p-2'>
    


    <div className='flex flex-row justify-between '>
    <div class="m-2 font-semibold text-xl flex flex-row ">
      <button className='px-2' onClick={()=>{navigate(-1)}}><IoIosArrowBack color='red' />
      </button>
     
      <p>Chapter Tets</p>
    </div>
    </div>
    
   

    {
      test ? test.map((data,index)=>{
        return (
          <Link key={index} to={`/student/test/${data?._id}`}> <div class="flex justify-between p-2 m-2 border rounded-lg shadow-2xl">
        <h1 class="pt-1">{data?.testName}</h1>
    
      </div></Link>
        )
      }) : <Loading/>
    }
     </div>
     </div>
    </>
  )
}
