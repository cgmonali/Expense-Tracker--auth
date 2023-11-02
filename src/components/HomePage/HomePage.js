import classes from './HomePage.module.css'
import { useHistory, } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import { useContext } from 'react';
const HomePage = () => {
    const history=useHistory();
    const authCtx = useContext(AuthContext);
   
   
    async function  handleEmailVerification() {
      

    let url =  'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDcyqi2t1KKsniE8q1DWoge17LEVLNT_ng';

    try {
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            requestType: 'VERIFY_EMAIL',
            idToken: authCtx.token,
            
           
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log('verified');
          console.log(data.kind);
          
        } else {
          const data = await response.json();
          let errorMessage = 'Authentication failed!';
         
          throw new Error(errorMessage);
        }
      } catch (err) {
        alert(err.message);
      } 




      






    
    }




  return <>

   <div className={classes.homepagecontainer}>
    <h1>welcome to the home page</h1>
    
   <h3>your profile is incomplete <div  onClick={()=>{history.push("/profilepage")}}  className={classes.completeprofile}>complete now</div></h3>
   
   </div>
   <div>
    <div> please verify your email by clicking on the given link
    <button  className={classes.emailVerifyBtn} onClick={handleEmailVerification} >verify email</button></div>
   </div>
   


  </>
  
 
};

export default HomePage;
