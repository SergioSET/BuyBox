// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage/homepage';
import Register from './pages/homepage/register';
import Login from './pages/homepage/login';
import DashboardUser from './pages/user/dashboard';
import CrearPedido from './pages/user/crear-pedido';
import Perfil from './pages/user/perfil';
import DashboardAdmin from './pages/admin/dashboard';
import './css/style.css';

function App() {
  return (
    <div className="font-inter antialiased bg-gray-900 text-gray-200 tracking-tight">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* User */}
        <Route path="/dashboard" element={<DashboardUser />} />
        <Route path="/crear-pedido" element={<CrearPedido />} />
        <Route path="/perfil" element={<Perfil />} />

        {/* Admin */}
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
      </Routes>
    </div>
  );
}

export default App;
