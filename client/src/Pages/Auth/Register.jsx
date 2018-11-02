import {useState} from 'react'
import Card from '../../Component/card/Card';
import { TiUserAddOutline } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import styles from "./auth.module.scss";
import Loader from '../../Component/loading/Loader';
import { toast } from "react-toastify";
import Oauth from '../../Component/Oauth/Oauth';
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';

const initialState = {
  username: "",
  email: "",
  password: "",
  comfirmpassword: "",
};

const Register = () => {
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState); 
  const {username, email, password, comfirmpassword} = formData;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  //handles the onchange input fields
  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  //validating the email
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      return toast.error("All fields are required");
    }

    if (password.length < 6) {
      return toast.error("Passwords must be up to 6 characters");
    };
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    };
    if (password !== comfirmpassword) {
      return toast.error("Passwords do not match");
    };

    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
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
        setError(data.message);
        toast.error(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/login');
      toast.success("signup successfully");
    } catch (error) {
      setLoading(false);
      setError(error.message);
      toast.error(error.message);
    }
  };

  //toggling for password eye
  const [passwordEye, setPasswordEye] = useState(false);
  const handlePasswordEye = () => {
    setPasswordEye(!passwordEye)
  }
  
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
  const handleConfirmPasswordEye = () => {
    setConfirmPasswordEye(!confirmPasswordEye)
  }


  return (
      <>
    <div className={`container  ${styles.auth}`}>
      {loading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <TiUserAddOutline size={35} color="#999"/>
          </div>
          <h2>Register</h2>

          <form onSubmit={handleSubmit}>
          <input
              type="text"
              placeholder="username"
              required
              id="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              required
              id="email"
              onChange={handleChange}
            />
            <div className='my-2 w-full relative'>
            <input
              type={(passwordEye === false) ? 'password' : 'text'}
              placeholder="Password"
              required
              id="password"
              onChange={handleChange}
            />
            <div className='absolute right-2 top-6 cursor-pointer'>
            {(passwordEye === false) ? <AiFillEyeInvisible size={20} onClick={handlePasswordEye} className='text-gray-400'/> : <AiFillEye size={20} onClick={handlePasswordEye} className='text-gray-400'/>}
            </div>
            </div>

            <div className='my-2 w-full relative'>
            <input
              type={(confirmPasswordEye === false) ? 'password' : 'text'} 
              placeholder="Comfirm Password"
              required
              id="comfirmpassword"
              onChange={handleChange}
            />
            <div className='absolute right-2 top-6 cursor-pointer'>
            {(confirmPasswordEye === false) ? <AiFillEyeInvisible size={20} onClick={handleConfirmPasswordEye} className='text-gray-400'/> : <AiFillEye size={20} onClick={handleConfirmPasswordEye} className='text-gray-400'/>}
            </div>
            </div>
            <button type="submit" className="--btn --btn-primary --btn-block">
              Register
            </button>
          </form>

          <Oauth/>
          
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

export default Register;
