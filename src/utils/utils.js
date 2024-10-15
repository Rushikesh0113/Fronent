import axios from "axios";
import { login, logout } from "./userSlice.js";

export const Currentuser = async (dispatch) => {
  try {
    console.log("called 1");
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/users/current-user`,
      {
        withCredentials: true,
      }
    );

    if (res) {
      console.log(res);
      dispatch(login(res.data.data));
      console.log("called 2");
    } else {
      console.log("logging out called");
      dispatch(logout());
      console.log("called");
      // throw new Error("user is not loged");
    }
  } catch (err) {
    console.error("User is not logged:", err.message);
  }
  return true;
};