import React from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Api from './component/Api';


function App() {
  return (
    <Router>
      <div className="App">
      <Switch>
      <Route path='/' exact component={Api}/>
     {/*<Route path='/model' component={Model}/> */} 
      </Switch>
      </div>
    </Router>
  );
}

export default App;
