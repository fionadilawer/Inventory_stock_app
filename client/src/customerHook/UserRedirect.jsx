import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {  SET_LOGIN } from "../Redux/user/Auth.slice";



// Get Login Status from the backend 
 const getLoginStatus = async () => {
    try {
        const res = await fetch('/api/profile/userlogin');
        const data = await res.json();
        return data;
    } catch (error) {
        toast.error(error.message)
    }
  };


 //This func... simply navigate a user to the login, if the user token has expired;
  const useRedirectLoggedOutUser = (path) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    useEffect(() => {
      const redirectLoggedOutUser = async () => {
        const isLoggedIn = await getLoginStatus();
        dispatch(SET_LOGIN(isLoggedIn));
  
        if (!isLoggedIn) {
            toast.info("Session expired, please login to continue.");
            navigate(path);
          }
      };
      redirectLoggedOutUser();
    }, [navigate, path, dispatch]);
  };
  
  export default useRedirectLoggedOutUser;
