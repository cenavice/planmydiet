import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './css/main.css';

import Header from './components/header.component';
import Home from './components/Home.component';

function App() {
  return (
    <Router>
      <Header/>
      <Home/>
    </Router>
    
  );
}

export default App;
