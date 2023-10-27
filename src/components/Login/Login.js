import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import classes from './Login.module.css';

const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef= useRef();
  const history =useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Add state for error message

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    


    setIsLoading(true);

    // optional: Add validation
    let url =  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDcyqi2t1KKsniE8q1DWoge17LEVLNT_ng';

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
       
        console.log('Logged in');
        if (res.ok) {
           
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {})
      .catch((err) => {
        alert(err.message);
      });
  };

  return (<>
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} placeholder='Email' />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordInputRef} placeholder='password' />
         
        </div>
        <div className={classes.actions}>
          <button onClick={()=>{history.push('/homepage')}} >Login</button>
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
