import {useState} from 'react';
import Card from '../../Component/card/Card';
import {BiLogIn} from 'react-icons/bi';
import { Link, useNavigate } from "react-router-dom";
import styles from "./auth.module.scss";
import {useDispatch, useSelector} from 'react-redux';
import {signInStart, signInSuccess, signInFailure} from '../../Redux/user/Auth.slice';
import { toast } from "react-toastify";
import Loader from '../../Component/loading/Loader';
import Oauth from '../../Component/Oauth/Oauth';

const Login = () => {

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      //console.log(data);
      if (data.success === false) {
        setLoading(false);
        dispatch(signInFailure(data.message));
        toast.error(data.message);
        return;
      }
      dispatch(signInSuccess(data))
      setLoading(false);
      navigate('/dashboard');
      toast.success("signin successfully");
    } catch (error) {
      setLoading(false);
      dispatch(signInFailure(error.message));
      toast.error(data.message);
    }
  };


  return (
    <>
    
    <div className={`container ${styles.auth}`}>
    {loading &&  <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <BiLogIn size={35} color="#999"/>
          </div>
          <h2>Login</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              required
              id="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              required
              id="password"
              onChange={handleChange}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Login
            </button>
          </form>
          
          <Oauth/>

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



