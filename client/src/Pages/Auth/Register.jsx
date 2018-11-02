import React from 'react'
import Card from '../../Component/card/Card';
import { TiUserAddOutline } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import styles from "./auth.module.scss";

const Register = () => {
  return (
      <>
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <TiUserAddOutline size={35} color="#999"/>
          </div>
          <h2>Register</h2>

          <form>
          <input
              type="text"
              placeholder="Name"
              required
              name="name"
            />
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
            <input
              type="password"
              placeholder="Comfirm Password"
              required
              name="comfirmpassword"
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Register
            </button>
          </form>
          <span className={styles.register}>
            <p> &nbsp; already have an account? &nbsp;</p>
            <Link to="/login">login</Link>
          </span>
        </div>
  
      </Card>
      
    </div>
          <Link to="/" className='flex justify-center underline text-[blue]'>Back to Home page </Link>
    </>
  )
}

export default Register
