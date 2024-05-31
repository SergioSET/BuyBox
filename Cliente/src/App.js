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
import UsersAdmin from './pages/admin/users.js';
import CreateUser from './pages/admin/createUser.js';
import EditUser from './pages/admin/editUser.js';
import OrdersAdmin from './pages/admin/orders';
import EditOrder from './pages/admin/editOrder';
import './css/style.css';

export default function App() {
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
        <Route path='/usersAdmin' element={<UsersAdmin />} />
        <Route path='/usersCreate' element={<CreateUser />} />
        <Route path='/usersEdit/:id' element={<EditUser />} />
        <Route path='/ordersAdmin' element={<OrdersAdmin />} />
        <Route path='/ordersEdit/:id' element={<EditOrder />} />

        {/* Fallback */}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}