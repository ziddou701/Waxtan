import './App.css';
import { BrowserRouter as Router , Route , Routes} from 'react-router-dom';
import LandingPage from './pages/Landingpage'; 
import Home from './pages/Home';
import LiveChat from './pages/LiveChat';
import { useState } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function App() {

  return (

    <Router>
      <div>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/Home' element={<Home/>}/>
          <Route path='/Live' element={<LiveChat/>}/>
        </Routes>
      </div>
    </Router>

  );
}

export default App;
