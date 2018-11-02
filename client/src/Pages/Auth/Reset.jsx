import React from 'react'
import { MdPassword } from "react-icons/md";
import Card from '../../Component/card/Card';
import { Link, useNavigate } from "react-router-dom";
import styles from "./auth.module.scss";

const Reset = () => {
  return (
    <>
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <MdPassword size={35} color="#999" />
          </div>
          <h2>Reset Password</h2>

          <form>
            <input
              type="password"
              placeholder="New Password"
              required
              name="password"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              required
              name="password2"
            />

            <button type="submit" className="--btn --btn-primary --btn-block">
              Reset Password
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

export default Reset
