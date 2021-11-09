import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Auth from './components/Auth';
import Rooms from './components/Rooms';
import Boxes from './components/Boxes';

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
          <Route exact path='/rooms'>
            <Rooms />
          </Route>
          <Route exact path='/boxes'>
            <Boxes />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
