
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import classes from './MainNavigation.module.css';

import AuthContext from '../../store/auth-context';

const MainNavigation = () => {

  const authCtx = useContext(AuthContext);
  function logoutHandler(){
    authCtx.logout();
  }



  return (
    <header className={classes.header}>

      
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
