import logo from './logo.svg';
import './App.css';
import Home from './containers/Home'
import Contact from './containers/contact/Contact';
import About from './containers/about/About';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact={true} path='/' component={Home}/>
          <Route exact path='/about' component={Contact}/>
          <Route exact path='/contact' component={About}/>
        </Switch>
      </Router>
      {/* <Home/> */}
    </>
  );
}

export default App;
