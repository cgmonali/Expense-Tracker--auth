import { useState, useRef,useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import classes from './Login.module.css';
import AuthContext from '../../store/auth-context';
const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef= useRef();
  const history =useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Add state for error message


  const authCtx = useContext(AuthContext);
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
          console.log(data);
          authCtx.login(data.idToken);
          console.log(data.idToken);
          history.push('/homepage')
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
      <h1>Login</h1>
      <form form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} placeholder='Email' />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordInputRef} placeholder='password' />
         
        </div>
        <div className={classes.actions}>
          <button type="submit"  >Login</button>
          {isLoading && <FaSpinner className="spinner" size={35} color="#2ab6da" />}
        </div>
      </form>
      <button className={classes.forgotpassword}>
      Forgot password?
    </button>


    
     </section>
    <button className={classes.account}>
Don't have an account? <div onClick={()=>{history.push('/')}} > Sign Up</div>
    </button>
    </>
  );
};

export default Login;
