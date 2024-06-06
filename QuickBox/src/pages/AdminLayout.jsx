import React from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminFooter from '../components/Footer copy'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (
        <>
            <AdminHeader />
            <Outlet />
            <AdminFooter />
        </>
    )
}

export default AdminLayout