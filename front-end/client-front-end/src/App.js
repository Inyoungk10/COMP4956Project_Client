import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Auth from './components/Auth';
import Sandbox from './components/sandbox';
import RoomPage from './components/RoomPage';
import AddRoom from './components/AddRoom';
import AddBox from './components/AddBox';
import AddItem from './components/AddItem';
import Unity from './components/unity';
import EditRoom from './components/EditRoom';

/**
 * @Author Cameron Wark
 * @description Root component
*/
function App() {
  return (
    <Router>
      <Navbar/>
      <div className='content'>

        {/* this "switch" component injects different components into the page based on what url the user visits. */}
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
          <Route exact path='/rooms'>
            <RoomPage />
          </Route>
          <Route exact path='/rooms/edit/:roomID/:w/:h/:d'>
            <EditRoom />
          </Route>
          <Route exact path='/addBox'>
            <AddBox />
          </Route>
          <Route exact path='/addRoom'>
            <AddRoom />
          </Route>
          <Route exact path='/addItem'>
            <AddItem />
          </Route>
          <Route exact path='/unity'>
            <Unity />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
