import React from 'react'

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <div className="--flex-center --py2">
    <p>All Rights Reserved. &copy; {date} </p>
  </div>
  )
};

export default Footer;
