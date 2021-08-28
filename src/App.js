import './App.css';
import { Home } from './Components/Home';
import { Department } from './Components/Department';
import { Employee } from './Components/Employee';
import { Navigation } from './Components/Navigation';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <h3 className="m-3 d-flex justify-content-center">React js with Bootstrap</h3>
        <h5 className="m-3 d-flex justify-content-center">Employee Management Portal</h5>
        <Navigation></Navigation>
        <Switch>
          <Route path="/" component={Home} exact></Route>
          <Route path="/department" component={Department} exact></Route>
          <Route path="/employee" component={Employee} exact></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
