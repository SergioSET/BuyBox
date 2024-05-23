
import OrdersTable from '@/components/OrdersTable';
import Navbar_admin from '@/components/navbar-admin';

import Link from 'next/link'

export default function Dashboard_Admin() {
  return (
    <>
      <Navbar_admin />
      <OrdersTable/>
     
    </>
  )
}

