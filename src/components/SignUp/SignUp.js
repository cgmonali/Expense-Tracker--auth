import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import classes from './SignUp.module.css';

const SignUp = () => {
  const emailInputRef = useRef();
  const passwordInputRef1 = useRef();
  const passwordInputRef2 = useRef(); // Add a ref for the Confirm Password input field
  const history =useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Add state for error message

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef1.current.value;
    const confirmedPassword = passwordInputRef2.current.value; // Get the value of Confirm Password

    // Check if passwords match
    if (enteredPassword !== confirmedPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    // optional: Add validation
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDcyqi2t1KKsniE8q1DWoge17LEVLNT_ng';

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
      <h1>SignUp</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} placeholder='Email' />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordInputRef1} placeholder='password' />
          <label htmlFor="password">Confirm Password</label>
          <input type="password" id="password" required ref={passwordInputRef2} placeholder='Confirm password' />
          {error && <p className={classes.error}>*{error}*</p>} {/* Display error message */}
        </div>
        <div className={classes.actions}>
          <button>Create Account</button>
          {isLoading && <FaSpinner className="spinner" size={35} color="#2ab6da" />}
        </div>
      </form>
   
   
     </section>
     <button className={classes.account}>
      Have an account? <div onClick={()=>{history.push('/login')}} >Login</div>
    </button>
    </>
  );
};

export default SignUp;
