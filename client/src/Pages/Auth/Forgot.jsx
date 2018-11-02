import React from 'react'
import Card from '../../Component/card/Card';
import { AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import styles from "./auth.module.scss";


const Forgot = () => {
  return (
   <>
    <div className={`container ${styles.auth}`}>
    <Card>
      <div className={styles.form}>
        <div className="--flex-center">
          <AiOutlineMail size={35} color="#999" />
        </div>
        <h2>Forgot Password</h2>

        <form >
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
          />

          <button type="submit" className="--btn --btn-primary --btn-block">
            Get Reset Email
          </button>
          <div className={styles.links}>
            <p>
              <Link to="/login">- Login</Link>
            </p>
      
          </div>
        </form>
      </div>
    </Card>
  </div>
  <Link to="/" className='flex justify-center underline text-[blue]'>Back to Home page </Link>
  </>
  )
}

export default Forgot;
