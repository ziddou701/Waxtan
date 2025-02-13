import './App.css';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import LandingPage from './pages/Landingpage'; 
import Home from './pages/Home';
import LiveChat from './pages/LiveChat';


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
