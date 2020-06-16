import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './css/main.css';

import Header from './components/header.component';
import Home from './components/home.component';
import RecipesList from './components/recipes-list.component';

function App() {
  return (
    <Router>
      <Header/>
      <br/>
      <Route path="/" exact component={Home} />
      <Route path="/recipes" exact component={RecipesList} />
    </Router>
    
  );
}

export default App;
