import classes from './VerifyEmailButton.module.css'
import { useHistory } from 'react-router-dom';

const VerifyEmailButton = () => {
    const history=useHistory();
  return <>

  <button className={classes.VerifyBtn}>
    Verify Email
  </button>

  </>
  
 
};

export default VerifyEmailButton;
