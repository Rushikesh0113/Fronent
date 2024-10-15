import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading.js";

const RoleAuth = ({ children, aut = true, role }) => {
  const authstate = useSelector((store) => store?.user?.status);
  const authrole = useSelector((store) => store?.user?.data?.role);
  console.log("sttus", authstate);
  const navigate = useNavigate();
  const [loader, setloader] = useState(false);

  useEffect(() => {
    console.log("sttus of if cond", role);
    if (authrole !== role) {
        
      navigate(`/${authrole}/dashboard`);
    }

    setloader(true);
  }, [navigate,role,authrole]);

  return loader ? <>{children}</> : <Loading />;
};

export default RoleAuth;