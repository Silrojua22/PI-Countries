import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from "./components/LandingPage/landingPage"
import Home from './components/Home/home';
import DetailCountries from './components/DetailCountries/detailCountries';
import Form from "./components/Form/form"
import Activities from './components/Activities/activities';
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
    </div>
  </Switch>
  </BrowserRouter>
    
  );
}

export default App;
