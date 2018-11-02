import React from 'react';
import Notiflix from "notiflix";
import {
  signoutUserStart, 
  signoutUserSuccess, 
  signoutUserFailure
} from '../../Redux/user/Auth.slice';
import {useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { toast } from "react-toastify";

const Header = () => {

  const {currentUser} = useSelector(state => state.user); 
  const dispatch = useDispatch();
  const navigate = useNavigate();


  //logout func...
  const logout = async() => {
    try {
     dispatch(signoutUserStart());
     const res = await fetch('/api/auth/signout');
     const data = await res.json();
     if (data.success === false) {
       dispatch(signoutUserFailure(data.message));
       return;
     }
       dispatch(signoutUserSuccess(data))
       toast.success("logout successfully");
       navigate('/login')
    } catch (error) {
     dispatch(signoutUserFailure(data));
    }
   };
 
   //
   const confirmLoggedout = () => {
     Notiflix.Confirm.show(
       "Logout Account!!!",
       "You are about to logout this account",
       "Logout",
       "Cancel",
       function okCb() {
         logout();
       },
       function cancelCb() {
         console.log("Logout Canceled");
       },
       {
         width: "320px",
         borderRadius: "3px",
         titleColor: "blue",
         okButtonBackground: "green",
         cssAnimationStyle: "zoom",
       }
     );
   };


  return (
    <div className="--pad header">
    <div className="--flex-between">
      <h3>
        <span className="--fw-thin">Welcome, </span>
        <span className="--color-danger">{currentUser.username}</span>
      </h3>
      <button onClick={confirmLoggedout} className="--btn --btn-danger"> Logout </button>
    </div>
    <hr />
  </div>
  )
};

export default Header;


