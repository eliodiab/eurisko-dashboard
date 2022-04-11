import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Login from "./login/pages/Login";
import Dashboard from "./dashboard/pages/Dashboard";
import { Provider } from "react-redux";
import configureStore from './store/configureStore';

const App = () => {

  const store = configureStore();

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/auth" />
          </Route>
          <Route path="/auth" exact>
            <Login />
          </Route>
          <Route path="/dashboard" exact>
            <Dashboard/>
          </Route>
          <Redirect to="/"/>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
