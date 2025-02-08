import './App.css';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import LandingPage from './pages/Landingpage'; 

function App() {
  return (

    <Router>
      <div>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
