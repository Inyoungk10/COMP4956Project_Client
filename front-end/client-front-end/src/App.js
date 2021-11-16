import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Auth from './components/Auth';
<<<<<<< HEAD
import Sandbox from './components/Sandbox';
=======
import RoomPage from './components/RoomPage';
>>>>>>> main

function App() {
  return (
    <Router>
      <Navbar/>
      <div className='content'>
        <Switch>
          <Route exact path='/'>
            <Homepage />
          </Route>
          <Route exact path='/login'>
            <Auth />
          </Route>
          <Route exact path='/sandbox'>
            <Sandbox />
          </Route>
          <Route path="/Sandbox" element={<Sandbox/>}/>
          <Route exact path='/room_page'>
            <RoomPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
