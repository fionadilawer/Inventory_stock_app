import React from 'react';
import './Inforbox.scss';

const InforBox = ({ bgColor, title, count, icon }) => {
  return (
    <div className={`info-box ${bgColor}`}>
      <span className="info-icon --color-white">{icon}</span>
      <span className="info-text">
        <p>{title}:</p>
        <h4>{count}</h4>
      </span>
    </div>
  )
}

export const InforBoxvalue = ({ bgColor, title, count, icon }) => {
  return (
    <div className={`info-box ${bgColor}`}>
      <span className="info-icon --color-white">{icon}</span>
      <span className="info-text">
        <p>{title}:</p>
        <h4>&#x20A6;{count}</h4>
      </span>
    </div>
  )
}


export default InforBox;
