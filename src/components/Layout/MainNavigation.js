
import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {






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
             <Link to='/login'>Login</Link>
           
          </li>
       
     <li>
            <button >Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
