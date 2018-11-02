import { useState } from 'react';
import { MdPassword } from "react-icons/md";
import Card from '../../Component/card/Card';
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./auth.module.scss";
import { toast } from "react-toastify";
import Loader from '../../Component/loading/Loader';
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';

const initialState = {
  password: "",
  password2: "",
};


const Reset = () => {


  const [loading, setLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const { password, password2 } = formData;

  const { resetToken } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };


  const resetPassword = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return toast.error("Passwords must be up to 6 characters");
    };

    if (password !== password2) {
      return toast.error("Passwords do not match");
    };

    try {
      setLoading(true);
      const res = await fetch(`/api/profile/resetpassword/${resetToken}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({password}),
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
      navigate('/login');
      toast.success('password reset successfully');
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    };

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
    <div className={`container ${styles.auth}`}>
    {loading &&  <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <MdPassword size={35} color="#999" />
          </div>
          <h2>Reset Password</h2>

          <form onSubmit={resetPassword}>

            <div className='my-2 w-full relative'>
            <input
              type={(passwordEye === false) ? 'password' : 'text'}
              placeholder="New Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <div className='absolute right-2 top-6 cursor-pointer'>
            {(passwordEye === false) ? <AiFillEyeInvisible size={20} onClick={handlePasswordEye} className='text-gray-400'/> : <AiFillEye size={20} onClick={handlePasswordEye} className='text-gray-400'/>}
            </div>
            </div>

            <div className='my-2 w-full relative'>
            <input
              type={(confirmPasswordEye === false) ? 'password' : 'text'}
              placeholder="Confirm New Password"
              required
              name="password2"
              value={password2}
              onChange={handleInputChange}
            />
            <div className='absolute right-2 top-6 cursor-pointer'>
            {(confirmPasswordEye === false) ? <AiFillEyeInvisible size={20} onClick={handleConfirmPasswordEye} className='text-gray-400'/> : <AiFillEye size={20} onClick={handleConfirmPasswordEye} className='text-gray-400'/>}
            </div>
            </div>

            <button type="submit" className="--btn --btn-primary --btn-block">
              Reset Password
            </button>
          </form>
        </div>
      </Card>
    </div>
    </>
  )
}

export default Reset;
