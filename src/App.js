import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './css/main.css';

import Header from './components/header.component';

function App() {
  return (
    <Router>
      <Header/>
    </Router>
    
  );
}

export default App;
