
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login/Login';
import { HashRouter as Router } from "react-router-dom";
import SignUp from './components/SignUp/SignUp';
import Layout from './components/Layout/Layout';
import HomePage from './components/HomePage/HomePage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import DailyExpense from './components/DailyExpense/DailyExpense';
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
        <Route path='/dailyexpense' >
          <DailyExpense />
        </Route>


      </Switch>
    </Layout>
    </Router>
  );
}

export default App;