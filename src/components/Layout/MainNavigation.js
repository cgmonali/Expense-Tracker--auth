
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import classes from './MainNavigation.module.css';
import { useSelector } from 'react-redux';
import AuthContext from '../../store/auth-context';
  import { setTotalAmount, premiumClicked, notPremiumClicked } from '../../store/totalAmountSlice'; 
const MainNavigation = () => {

  const totalAmountState = useSelector((state) => state.totalAmount);
  const { totalAmount, isPremium,isDarkTheme } = totalAmountState;

  console.log(totalAmount);
  console.log(isPremium);

  const authCtx = useContext(AuthContext);
  function logoutHandler(){
    authCtx.logout();
  }



  return (
    <header className={!isDarkTheme? classes.header :classes.headerPremium}>

      
      <nav>
        <ul>
        <li>
             <Link to='/'>Home</Link>
           
          </li>
          <li>
             <Link to='/'>Products</Link>
           
          </li>
          <li>
             <Link to='/'>About Us</Link>
           
          </li>
        { authCtx.isLoggedIn && <li>
             <Link to='/dailyexpense' >Daily Expense</Link>
           
          </li>}

     <li>
             <Link to='/login' >Login</Link>
           
          </li>
       
     <li>
     <Link to="/" onClick={logoutHandler} className={classes.logoutbtn}>
 Logout
</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
