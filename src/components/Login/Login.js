import { useState, useRef,useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import classes from './Login.module.css';
import AuthContext from '../../store/auth-context';
import VerifyEmailButton from './VerifyEmailButton';
import authSlice from '../../store/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';


const Login = () => {
    
  const emailInputRef = useRef();
  const passwordInputRef= useRef();
  const history =useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Add state for error message
  
 const [displayPaswordRmark,setDisplayPaswordRmark]=useState(false);
  const authCtx = useContext(AuthContext);

  const count = useSelector((state) => state.auth); // Access state from the store

  console.log(count);
  const dispatch = useDispatch(); 

  console.log(count);
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    emailInputRef.current.value="";
   

  };




async function forgotPasswordHandler () {

 const enteredEmail = emailInputRef.current.value;

 setIsLoading(true);

    try {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDcyqi2t1KKsniE8q1DWoge17LEVLNT_ng', {
          method: 'POST',
          body: JSON.stringify({
            requestType:'PASSWORD_RESET',
            email: enteredEmail,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
            setIsLoading(false);
          const data = await response.json();
          console.log('password change');
          console.log(data);
          setDisplayPaswordRmark(true)
         
         
        } else {
          const data = await response.json();
          let errorMessage = 'Authentication failed!';
         
          throw new Error(errorMessage);
        }
      } catch (err) {
        alert(err.message);
      }

  

}








  const submitHandler = async (event) => {
    event.preventDefault();
    
    
    const enteredEmail = emailInputRef.current.value;
     const enteredPassword = passwordInputRef.current.value;

    
    setIsLoading(true);

    // optional: Add validation
    let url =  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDcyqi2t1KKsniE8q1DWoge17LEVLNT_ng';

    try {
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log('Logged in');
          const user1 = {
            token: data.idToken,
            userId: data.localId,
          };
       
          history.push('/homepage');
          dispatch(login(user1));
          console.log(user1);

          console.log(data);
          authCtx.login(data.idToken);
          console.log(data.idToken);
        } else {
          const data = await response.json();
          let errorMessage = 'Authentication failed!';
         
          throw new Error(errorMessage);
        }
      } catch (err) {
        alert(err.message);
      } finally {
        setIsLoading(false);
      }
    };

  return (<>
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' :  'Forgot Password'}</h1>
      <form form onSubmit={isLogin ? submitHandler : forgotPasswordHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} placeholder='Email' />
        </div>
     { isLogin && <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordInputRef} placeholder='password' />
         
        </div>}
        <div className={classes.actions}>
          <button type="submit" onClick={isLogin ? submitHandler : forgotPasswordHandler} >{isLogin ? 'Login' : 'Change Password'}</button>
          {isLoading && <FaSpinner className="spinner" size={32} color="#2ab6da" />}
        </div>
      </form>
      <button className={classes.forgotpassword} onClick={switchAuthModeHandler}>
      {isLogin ? 'Forgot Password?':'Back to Login' }
    </button>


    
     </section>
    <button className={classes.account}>
Don't have an account? <div onClick={()=>{ history.push('/')}} > Sign Up</div>
    </button>

    </>
  );
};

export default Login;
