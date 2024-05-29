import { createBrowserRouter } from 'react-router-dom'

// global components
// import Loader from '../components/Loader'
import Layout from '@/components/Layout';

// Pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import AdminPanel from '@/pages/Admin/AdminPanel';
import ProtectedRoutes from '@/pages/Auth/ProtectedRoutes';
import AdminRoutes from '@/pages/Auth/AdminRoutes';
import UserPanel from '@/pages/User/UserPanel';
import CreateCategory from '@/pages/Admin/CreateCategory';
import CreateProducts from '@/pages/Admin/CreateProducts';
import ManageUsers from '@/pages/Admin/ManageUsers';



const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "about",
                element: <About />
            },
            {
                path: "",
                element: <ProtectedRoutes />,
                children: [
                    {
                        path: "dashboard",
                        element: <UserPanel />
                    },
                ]
            },
            {
                path: "admin",
                element: <AdminRoutes />,
                children: [
                    {
                        path: "dashboard",
                        element: <AdminPanel />,
                        children: [
                            {
                                path: 'create-category',
                                element: <CreateCategory />
                            },
                            {
                                path: 'create-product',
                                element: <CreateProducts />
                            },
                            {
                                path: 'users',
                                element: <ManageUsers />
                            },
                        ]
                    },
                ]
            },
        ]
    }
])

export default router;