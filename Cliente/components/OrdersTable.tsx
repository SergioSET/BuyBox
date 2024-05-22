'use client';
import { RotateCwIcon, SearchIcon } from "lucide-react";
import { User } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from "@tremor/react";
import React, { useEffect, useState } from 'react';

type Props = {
  users?: User[];
};


export default function OrdersTable() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/order/index/`, {
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
  });

  return (
    <div>
  <div className="relative mt-5 max-w-md">
    <label htmlFor="search" className="sr-only">
      Search
    </label>
    <div className="rounded-md shadow-sm">
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
        
        className="h-10 block w-full rounded-md border border-gray-200 pl-9 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Search by name..."
        spellCheck={false}
       
      />
    </div>

    {(
      <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center">
        <RotateCwIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" />
      </div>
    )}
  </div>

  <Table>
    <TableHead>
      <TableRow>
        <TableHeaderCell>Dueño</TableHeaderCell>
        <TableHeaderCell>Tracking number</TableHeaderCell>
        <TableHeaderCell>Descripcion</TableHeaderCell>
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
