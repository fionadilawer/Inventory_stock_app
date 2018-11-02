import {useState} from 'react'
import Card from '../../Component/card/Card';
import { AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import styles from "./auth.module.scss";
import { toast } from "react-toastify";
import Loader from '../../Component/loading/Loader';

const Forgot = () => {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);


  //validating the email
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const forgot = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please enter an email");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    try {
      setLoading(true);
      const res = await fetch('/api/profile/forgotpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
      });
      const data = await res.json();
      //console.log(data);
      if (data.success === false) {
        setLoading(false);
        toast.error(data.message);
        return;
      };

      if (data.success === true) {
        setLoading(false);
        toast.success(data.message);
      };

      setLoading(false);
      // navigate('/login');
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    };

    setEmail("");
  };

  return (
   <>
    <div className={`container ${styles.auth}`}>
    {loading && <Loader />}
    <Card>
      <div className={styles.form}>
        <div className="--flex-center">
          <AiOutlineMail size={35} color="#999" />
        </div>
        <h2>Forgot Password</h2>

        <form onSubmit={forgot}>
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit" className="--btn --btn-primary --btn-block">
            Get Reset Email
          </button>
          <div className={styles.links}>
            <p>
              <Link to="/login"> Login </Link>
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



