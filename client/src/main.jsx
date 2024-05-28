import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router/router'
import './index.css'
import { AuthProvider } from './context/auth'
import { UserControlsProvider } from './context/UserControls'

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <UserControlsProvider>
            <RouterProvider router={router} />
        </UserControlsProvider>
    </AuthProvider>
)
