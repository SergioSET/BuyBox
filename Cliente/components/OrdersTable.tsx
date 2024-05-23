'use client';

import { RotateCwIcon, SearchIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from "@tremor/react";
import React, { useEffect, useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation'

export default function OrdersTable() {
    
  const router = useRouter()
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
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
        setUsers(data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, [searchValue, statusFilter]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
  };

  const handleEdit = (id: number) => {
    router.push('/order-edit-admin/' + id);
  }

  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-12 md:pt-40 md:pb-20">
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-8">
          <div className="text-lg font-semibold text-white">Lista de Pedidos</div>
          <div className="flex items-center">
            <div className="relative max-w-md">
              <div className="rounded-md shadow-sm flex items-center">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3" aria-hidden="true">
                  <SearchIcon className="mr-3 h-4 w-4 text-gray-400" aria-hidden="true" />
                </div>
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
                  <option value="" className="text-gray-400">Todos</option>
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
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id}>
                <td className="align-middle text-center">{user.name}</td>
                <td className="align-middle text-center">
                  <Text>{user.tracking_number ?? 'Sin correo'}</Text>
                </td>
                <td className="align-middle text-center">
                  <Text>{user.description ?? 'Sin dirección'}</Text>
                </td>
                <td className="align-middle text-center">
                  <Text>{user.status ?? 'Sin estado'}</Text>
                </td>
                <td className="align-middle text-center">
                  <Text>{user.tracking_number ?? 'Sin numero'}</Text>
                </td>
                <td className="align-middle text-center">
                  <Text>{user.shipping_date ?? 'Sin fecha'}</Text>
                </td>
                <td className="align-middle text-center">
                  <Text>{user.shipping_address ?? 'Sin dirección'}</Text>
                </td>
                <td className="align-middle text-center">
                  <Text>{user.cost ?? 'Sin costo'}</Text>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
