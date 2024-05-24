import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom"
import Homepage from './pages/homepage/homepage';
import Login from './pages/homepage/login'
import Register from './pages/homepage/register'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

    </Routes>
  );
}

export default App;
