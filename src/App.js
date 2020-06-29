import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './css/main.css';

import {Header, Home, RecipesList, RecipeDetail, About, Footer} from './components';

function App() {
  return (
    <Router>
      <Header/>
      <Route path="/" exact component={Home} />
      <Route path="/recipes" component={RecipesList} />
      <Route path="/recipe/:id" component={RecipeDetail} />
      <Route path="/about" component={About} />
      <Footer/>
    </Router>
    
  );
}

export default App;
