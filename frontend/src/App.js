import './App.css';
import AttackDashboard from './components/dashboard/AttackDashboard'
import ServerLogsDashboard from './components/dashboard/ServerLogsDashboard'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  return (
    <Router>
      <div className="App">
        <ServerLogsDashboard />
        <nav>
          <ul>
            <li>
              <Link to="/attack">Load Testing Dashboard</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/attack">
            <AttackDashboard />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
