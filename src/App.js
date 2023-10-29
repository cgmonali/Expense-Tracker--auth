
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login/Login';
import { HashRouter as Router } from "react-router-dom";
import SignUp from './components/SignUp/SignUp';
import Layout from './components/Layout/Layout';
import HomePage from './components/HomePage/HomePage';
import ProfilePage from './components/ProfilePage/ProfilePage';
function App() {


  return (
    <Router>
    <Layout>
      <Switch>
        <Route path='/' exact>
          <SignUp />
        </Route>
        <Route path='/login' >
          <Login />
        </Route>
        <Route path='/homepage' >
          <HomePage />
        </Route>

        <Route path='/profilepage' >
          <ProfilePage />
        </Route>


      </Switch>
    </Layout>
    </Router>
  );
}

export default App;