import React from 'react';
import './Home.scss';
import {RiProductHuntLine} from 'react-icons/ri';
import { Link } from "react-router-dom";
import hero from '../../assets/hero-inve.png';

const Home = () => {
  return (
    <div className="home">
      <nav className='container --flex-between'>
      <div className="logo">
          <RiProductHuntLine size={35} />
        </div>
        <ul className="home-links">
           <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/login">Login</Link>
              </button>
            </li>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/dashboard">Dashboard</Link>
              </button>
            </li>
        </ul>
      </nav>

      {/* hero section */}
      <section className="container hero">
        <div className="hero-text">
        <h2>e-ventory & Stock Management Solution for business</h2>
        <p>
           our e-ventory system control and manage proucts in the warehouse in
            real time and integrated to make it easier to develop your business.
          </p><div className="hero-buttons">
            <button className="--btn --btn-secondary">
              <Link to="/dashboard">Free Trial 1 Month</Link>
            </button>
          </div>
          <div className="--flex-start">
            <NumberText num="14K" text="Brand Owners"/>
            <NumberText num="23K" text="Active Users" />
            <NumberText num="500+" text="Partners" />
          </div>
        </div>
        <div className="hero-image">
          <img src={hero} alt="Inventory" />
        </div>
      </section>
    </div>
  )
};


const NumberText = ({ num, text }) => {
  return (
    <div className="--mr">
      <h3 className="--color-white">{num}</h3>
      <p className="--color-white">{text}</p>
    </div>
  );
};

export default Home;

