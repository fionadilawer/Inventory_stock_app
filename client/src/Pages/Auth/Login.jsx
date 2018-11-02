import React from 'react';
import Card from '../../Component/card/Card';
import {BiLogIn} from 'react-icons/bi';
import { Link, useNavigate } from "react-router-dom";
import styles from "./auth.module.scss";

const Login = () => {
  return (
    <>
    
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <BiLogIn size={35} color="#999"/>
          </div>
          <h2>Login</h2>

          <form>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Login
            </button>
          </form>
          <Link to="/forgot">Forgot Password</Link>

          <span className={styles.register}>
            <p> &nbsp; Don't have an account? &nbsp;</p>
            <Link to="/register">Register</Link>
          </span>
        </div>
  
      </Card>
      </div>
      <Link to="/" className='flex justify-center underline text-[blue]'>Back to Home page </Link>
    </>
  )
};

export default Login;



