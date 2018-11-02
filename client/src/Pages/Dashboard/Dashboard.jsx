import React from 'react';
import useRedirectLoggedOutUser from '../../customerHook/UserRedirect';

const Dashboard = () => {

  //from our cutom hook
  useRedirectLoggedOutUser('/login');


  return (
    <div>
      <h2> dashbaord page </h2> 
    </div>
  )
}

export default Dashboard;


