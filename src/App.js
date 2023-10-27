
import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from './components/HomePage/HomePage';
import { BrowserRouter as Router } from "react-router-dom";
import SignUp from './components/SignUp/SignUp';
import AuthPage from './components/AuthPage/AuthPage';
import SignUpSamp from './components/SignUp/SignUpSamp';
import Layout from './components/Layout/Layout';
function App() {


  return (
    <Router>
    <Layout>
      <Switch>
        <Route path='/' >
          <SignUp />
        </Route>
        
   
      </Switch>
    </Layout>
    </Router>
  );
}

export default App;