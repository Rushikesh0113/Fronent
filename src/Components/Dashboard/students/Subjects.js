import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../../Loading/Loading'
import mathicon from  "../../../images/icons/icons/mathematics.png"
import phyicon from  "../../../images/icons/icons/web-analytics.png"
import bioicon from  "../../../images/icons/icons/technology.png"
import chemicon from  "../../../images/icons/icons/chemistry-class (1).png"
import hindicon from  "../../../images/icons/icons/language.png"
import maricon from  "../../../images/icons/icons/hindu (1).png"
import geoicon from  "../../../images/icons/icons/geography.png"
import histicon from  "../../../images/icons/icons/evolution (1).png"
import engicon from  "../../../images/icons/icons/english.png"


// math: mathicon,
// science: "https://us.123rf.com/450wm/captainvector/captainvector2208/captainvector220805169/189725517-science-subject-icon.jpg?ver=6",
// physics: "https://cdn-icons-png.flaticon.com/512/7614/7614875.png",
// chemistry: "https://cdn-icons-png.flaticon.com/512/8716/8716846.png",
// geography: "https://cdn-icons-png.flaticon.com/512/4802/4802221.png",
// history: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdbwbzVKexEwqCZFW3I3DLRYsQfku7BANxzw&s",
// biology: "https://cdn-icons-png.flaticon.com/512/6037/6037732.png",
// marathi: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2CQslbMKAsMWRuPqK86fZDtSQrW1wHfKlhA&s",
// hindi: "https://www.shutterstock.com/image-vector/book-design-showcases-hindi-school-600nw-2511420131.jpg",




const Subjects = () => {
  const [data, setdata] = useState()
  const imageMapping = {
    math: mathicon,
    english: engicon,
    physics: phyicon,
    chemistry: chemicon,
    geography: geoicon,
    history: histicon,
    biology: bioicon,
    marathi: maricon,
    hindi: hindicon,
    // Add more subject-image mappings here
  };
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/subjects/standard/10`).then(res => { setdata(res.data.data.standards[0]); }).catch(err => console.log(err))
  }, [])
  return (
    <>
      {data ? (<>
        <div className="flex flex-col gap-2 p-2 m-2 sm:flex-row items-center justify-between" >

          {console.log(data.subjects)}
          {data.subjects.map((datas, index) => {
            return (
              <div className="flex flex-col items-center justify-center sm:w-[10%]" key={index}>
                <Link to={`/subject/${datas?._id}`}>
                  <img
                    src={imageMapping[datas?.name.toLowerCase()] || mathicon}

                    alt="subject"
                    className=""
                  />

                  <div className="flex justify-center items-center">

                    {data && <h3 className='font-bold mt-5'>{datas?.name}</h3>}
                  </div>
                </Link>
              </div>
            )
          })}
        </div>

      </>) : <Loading />}

    </>
  )
}

export default Subjects