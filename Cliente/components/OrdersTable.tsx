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
    <div>
      <div className="relative mt-5 max-w-md">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="rounded-md shadow-sm flex items-center">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
            aria-hidden="true"
          >
            <SearchIcon
              className="mr-3 h-4 w-4 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            type="text"
            name="search"
            id="search"
            value={searchValue}
            onChange={handleInputChange}
            className="h-10 block w-full rounded-md border border-gray-200 pl-9 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Search by name..."
            spellCheck={false}
          />
          <select
            value={statusFilter}
            onChange={handleStatusChange}
            className="ml-2 h-10 block rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Todos</option>
            <option value="En proceso">En proceso</option>
            <option value="Entregado">Entregado</option>
          </select>
        </div>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Dueño</TableHeaderCell>
            <TableHeaderCell>Tracking number</TableHeaderCell>
            <TableHeaderCell>Descripcion</TableHeaderCell>
            <TableHeaderCell>Estado</TableHeaderCell>
            <TableHeaderCell>Tracking number</TableHeaderCell>
            <TableHeaderCell>Fecha de envio</TableHeaderCell>
            <TableHeaderCell>Direccion de envio</TableHeaderCell>
            <TableHeaderCell>Costo</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>
                <Text>{user.tracking_number ?? 'Sin correo'}</Text>
              </TableCell>
              <TableCell>
                <Text>{user.description ?? 'Sin dirección'}</Text>
              </TableCell><TableCell>
                <Text>{user.status ?? 'Sin estado'}</Text>
              </TableCell>
              <TableCell>
                <Text>{user.tracking_number ?? 'Sin numero'}</Text>
              </TableCell>
              <TableCell>
                <Text>{user.shipping_date ?? 'Sin fecha'}</Text>
              </TableCell>
              <TableCell>
                <Text>{user.shipping_address ?? 'Sin dirección'}</Text>
              </TableCell>
              <TableCell>
                <Text>{user.cost ?? 'Sin costo'}</Text>
              </TableCell>
              <TableCell>
              <button onClick={() => handleEdit(user.orderId)} className="px-4 py-2 bg-blue-500 text-white rounded-md ml-6 mb-3">Editar</button>
              </TableCell>
              {/* <TableCell>
                <Text>
                  {new Intl.DateTimeFormat("en-US").format(user.createdAt)}
                </Text>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
