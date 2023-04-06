import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register';
import Dashboard from './Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className='container'>
      <Router>
      <Routes>
        <Route exact path='/' element={< Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route exact path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />}  />


      </Routes>
      </Router>
    </div>
  );
}

export default App;
