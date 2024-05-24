// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage/homepage';
import Register from './pages/homepage/register';
import Login from './pages/homepage/login';
import './css/style.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
