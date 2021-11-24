import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Auth from './components/Auth';
import Sandbox from './components/Sandbox';
import SandboxTest from './components/sandboxTest';
import RoomPage from './components/RoomPage';
import Boxes from './components/Boxes';
import Create from './components/CreateBox';
import CreateRoom from './components/CreateRoom';
import AddRoom from './components/AddRoom';

function App() {
  return (
    <Router>
      <Navbar/>
      <div className='content'>
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route exact path='/login'>
            <Auth />
          </Route>
          <Route exact path='/sandbox'>
            <Sandbox />
          </Route>
          <Route exact path='/sandboxTest'>
            <SandboxTest />
          </Route>
          <Route exact path='/rooms'>
            <RoomPage />
          </Route>
          <Route exact path='/boxes'>
            <Boxes />
          </Route>
          <Route exact path='/addBox'>
            <Create />
          </Route>
          <Route exact path='/addRoom'>
            <AddRoom />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
