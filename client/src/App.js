import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from "./components/LandingPage/landingPage"
import Home from './components/Home/home';
import DetailCountries from './components/DetailCountries/detailCountries';
import Form from "./components/Form/form"
import Activities from './components/Activities/activities';
import About from './components/About/About';
import axios from "axios"
//axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.baseURL = "https://pi-countries-production-e787.up.railway.app/";

function App() {
  return (
  <BrowserRouter>
  <Switch>
  <div className="App">
      <Route exact path= "/" component={LandingPage}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/create" component={Form}/>
      <Route exact path="/detail/:id" component={DetailCountries}/>
      <Route exact path="/Activities" component={Activities}/>
      <Route exact path="/About" component={About}/>
    </div>
  </Switch>
  </BrowserRouter>
    
  );
}

export default App;
