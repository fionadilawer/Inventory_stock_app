import React from 'react';
import {useSelector} from 'react-redux';
import {Navigate, Outlet} from 'react-router-dom';

const PrivateRoute = () => {

    const {currentUser} = useSelector(state => state.user); //getting the authenticated user 
  return (
    <div>
    { currentUser ? (<Outlet/>) : (<Navigate to={'/login'}/>)}
  </div>
  )
}

export default PrivateRoute
