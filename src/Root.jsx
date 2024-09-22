import React from 'react'
import { Outlet } from 'react-router-dom'
import NavHeader from './components/NavHeader'
import './assets/css/root/root.css'

const Root = () => {
    return (
        <div className="root ">
            <NavHeader />
            <Outlet />
        </div>
    )
}

export default Root
