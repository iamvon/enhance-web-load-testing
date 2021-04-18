import './App.css';
import * as zoom from 'chartjs-plugin-zoom'
import AttackDashboard from './components/dashboard/AttackDashboard'
import ServerLogsDashboard from './components/dashboard/ServerLogsDashboard'
import MainDashboard from './components/dashboard/MainDashboard'
import { ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  return (
    // <Router>
    //   {/* <div className="App"> */}
    //     <nav>
    //       <ul>
    //         <li>
    //           <Link to="/attack">Load Testing Dashboard</Link>
    //         </li>
    //       </ul>
    //     </nav>
    //     <Switch>
    //       <Route exact path="/">
    //         <ServerLogsDashboard />
    //         {/* <MainDashboard/> */}
    //       </Route>
    //       <Route path="/attack">
    //         <AttackDashboard />
    //       </Route>
    //     </Switch>
    //   {/* </div> */}
    // </Router>

    <>
      <ChakraProvider>
        <MainDashboard />
      </ChakraProvider>
    </>
  );
}

export default App;
