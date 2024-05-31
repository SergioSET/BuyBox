import React, { useEffect, useState, ChangeEvent } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text } from "@tremor/react";
import { useNavigate } from 'react-router-dom';

export default function OrdersTable() {
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [showOrdersTable, setShowOrdersTable] = useState(true);
  const navigate = useNavigate();

  const fetchOrders = () => {
    let apiUrl = 'http://localhost:3000/api/order/index';

    // Construir la URL basada en los valores de búsqueda y filtro de estado
    if (searchValue.trim() !== '') {
      apiUrl += `/${searchValue}`;
    }

    if (statusFilter) {
      apiUrl += searchValue.trim() !== '' ? `?status=${statusFilter}` : `?status=${statusFilter}`;
    }

    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setOrders(data);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  useEffect(() => {
    fetchOrders(); // Fetch orders on component mount

    const intervalId = setInterval(fetchOrders, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [searchValue, statusFilter]);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleEdit = (id) => {
    navigate(`/ordersEdit/${id}`);
  };

  const handleDelete = (id, tracking) => {

    if (window.confirm("¿Estás seguro que deseas borrar la orden " + tracking + "?")) {

      fetch(`http://localhost:3000/api/order/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(() => {
          fetchOrders(); // Fetch orders again after deleting
        })
        .catch(error => {
          setError(error.message);
        });
    }
  };

  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-12 md:pt-40 md:pb-20">
      <div className="bg-gray-800 p-6 rounded-lg">
        <div>
          <div className="flex justify-between items-center mb-8">
            <div className="text-lg font-semibold text-white">Lista de Pedidos</div>
            <div className="flex items-center">
              <div className="relative max-w-md">
                <div className="rounded-md shadow-sm flex items-center">
                  <input
                    type="text"
                    name="search"
                    id="search"
                    value={searchValue}
                    onChange={handleInputChange}
                    className="h-10 block w-full rounded-md border border-gray-200 pl-9 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Buscar por nombre..."
                    spellCheck={false}
                  />
                  <select
                    value={statusFilter}
                    onChange={handleStatusChange}
                    className="ml-2 h-10 block rounded-md border border-gray-200 text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="">Todos</option>
                    <option value="En proceso">En proceso</option>
                    <option value="Entregado">Entregado</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <table className="tabla-con-divisiones w-full border-collapse">
            <thead>
              <tr>
                <th>Dueño</th>
                <th>Tracking number</th>
                <th>Descripcion</th>
                <th>Estado</th>
                <th>Tracking number</th>
                <th>Fecha de envio</th>
                <th>Direccion de envio</th>
                <th>Costo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="align-middle text-center">{order.name}</td>
                  <td className="align-middle text-center">
                    <Text>{order.tracking_number ?? 'Sin correo'}</Text>
                  </td>
                  <td className="align-middle text-center">
                    <Text>{order.description ?? 'Sin dirección'}</Text>
                  </td>
                  <td className="align-middle text-center">
                    <Text>{order.status ?? 'Sin estado'}</Text>
                  </td>
                  <td className="align-middle text-center">
                    <Text>{order.tracking_number ?? 'Sin numero'}</Text>
                  </td>
                  <td className="align-middle text-center">
                    <Text>{order.shipping_date ?? 'Sin fecha'}</Text>
                  </td>
                  <td className="align-middle text-center">
                    <Text>{order.shipping_address ?? 'Sin dirección'}</Text>
                  </td>
                  <td className="align-middle text-center">
                    <Text>{order.cost ?? 'Sin costo'}</Text>
                  </td>
                  <td>
                    <button onClick={() => handleEdit(order.orderId)} className="px-4 py-2 bg-blue-500 text-white rounded-md ml-6 mb-3">Editar</button>
                    <button onClick={() => handleDelete(order.orderId, order.tracking_number)} className="px-4 py-2 bg-red-500 text-white rounded-md ml-6 mb-3">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
