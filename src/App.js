import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './css/main.css';

import Header from './components/header.component';
import Home from './components/home.component';
import RecipesList from './components/recipes-list.component';
import RecipeDetail from './components/recipe-detail.component';
import Footer from './components/footer.component';

function App() {
  return (
    <Router>
      <Header/>
      <Route path="/" exact component={Home} />
      <Route path="/recipes" component={RecipesList} />
      <Route path="/recipe/:id" component={RecipeDetail} />
      <Footer/>
    </Router>
    
  );
}

export default App;
