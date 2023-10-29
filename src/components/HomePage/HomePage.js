import classes from './HomePage.module.css'
import { useHistory } from 'react-router-dom';

const HomePage = () => {
    const history=useHistory();
  return <>

   <div className={classes.homepagecontainer}>
    <h1>welcome to the home page</h1>
   <h3>your profile is incomplete <div  onClick={()=>{history.push("/profilepage")}}  className={classes.completeprofile}>complete now</div></h3>
   
   </div>
   


  </>
  
 
};

export default HomePage;
