import { useDispatch } from 'react-redux';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import {FcGoogle} from 'react-icons/fc'
import { useNavigate } from 'react-router-dom';
import { app } from '../../Firebase/FirebaseConfig';
import { signInSuccess } from '../../Redux/user/Auth.slice';


const Oauth = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handles google auth ... 
  const handleGoogleClick = async () => {
      try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);
    
        const result = await signInWithPopup(auth, provider);
    
        const res = await fetch('/api/auth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: result.user.displayName,
            email: result.user.email,
            image: result.user.photoURL,
          }),
        });
    
        if (res.ok) {
          const data = await res.json();
          dispatch(signInSuccess(data));
          navigate('/dashboard');
        } else {
          console.error('Error during Google Sign-In:', res.status, res.statusText);
        }
      } catch (error) {
        console.error('An error occurred during Google Sign-In:', error);
      }
    };


  return (
    <button
    onClick={handleGoogleClick}
    className='text-[1.6rem]  font-normal p-[6px] mt-[5px] mb-2 rounded-[3px]
     cursor-pointer flex justify-center items-center translate-y-2 w-full 
     bg-[#0b315ab9] border-[black] text-[#fff] '
    >
     <FcGoogle size={25} className='mr-2' /> Log in with Google
  </button>
  )
}

export default Oauth;
