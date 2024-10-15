import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../Loading/Loading";
const CustomSubject = () => {
  const [id, setId] = useState(10);
  const [data, setdata] = useState();
  const imageMapping = {
    math: "https://t4.ftcdn.net/jpg/05/51/43/61/240_F_551436197_pNDNeD5zSx2Sdm4LAHrRPyjSAHsv3M3V.jpg",
    science: "https://us.123rf.com/450wm/captainvector/captainvector2208/captainvector220805169/189725517-science-subject-icon.jpg?ver=6",
  };
  const handleDropdownChange = (event) => {
    setId(event.target.value);
  };
  useEffect(() => {
 function getdata() {
  axios
  .get(`${process.env.REACT_APP_API_URL}/api/subjects/standard/${id}`)
  .then((res) => {
    if (res.data.data.standards[0]) {
      setdata(res.data.data.standards[0]);
    } else {
      setdata("No Data");
    }

   
  })
  .catch((err) => console.log(err));
 }
 getdata()
  }, [id]);

  return (
    <>
      <div className="p-2 m-2">
        Select Standard{" "}
        <select value={id} onChange={handleDropdownChange}>
          {[...Array(10).keys()].map((value) => (
            <option key={value + 1} value={value + 1}>
              {value + 1}
            </option>
          ))}
        </select>
      </div>

      {data ? (
        data === "No Data" ? (
          <div className="p-10 m-6 flex flex-row justify-center items-center">
            <h1>No Subject are Present for This Standard</h1>
          </div>
        ) : (
          <>
                        <div className="flex flex-col gap-2 p-2 m-2 sm:flex-row" >

           
          {data.subjects.map((datas,index)=>{
            return (
              <div className="flex flex-col items-center justify-center sm:w-[10%]" key={index}>
                <Link to={`/subject/${datas?._id}`}>
                  <img
                                         src={imageMapping[datas?.name.toLowerCase()] || "https://t4.ftcdn.net/jpg/05/51/43/61/240_F_551436197_pNDNeD5zSx2Sdm4LAHrRPyjSAHsv3M3V.jpg"}

                    alt="subject"
                    className=""
                  />

                  <div className="flex justify-center items-center">
                  
                    {data && <h3>{datas?.name}</h3>}
                  </div>
                </Link>
              </div>
            )
          })}
                      </div>

          </>
        )
      ) : (
        <Loading />
      )}
    </>
  );
};

export default CustomSubject;
