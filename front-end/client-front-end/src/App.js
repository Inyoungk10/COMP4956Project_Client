import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Auth from './components/Auth';
import Sandbox from './components/Sandbox';

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
          <Route path="/Sandbox" element={<Sandbox/>}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
