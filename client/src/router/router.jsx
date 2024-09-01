import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/components/Layout';

// Pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import AdminPanel from '@/pages/Admin/AdminPanel';
import ProtectedRoutes from '@/pages/Auth/ProtectedRoutes';
import AdminRoutes from '@/pages/Auth/AdminRoutes';
import UserPanel from '@/pages/User/UserPanel';
import CreateCategory from '@/pages/Admin/CreateCategory';
import ManageUsers from '@/pages/Admin/ManageUsers';
import Profile from '@/pages/User/Profile';
import Orders from '@/pages/User/Orders';
import UserLogin from '@/pages/Auth/Login';
import UserRegister from '@/pages/Auth/Register';
import ProductsPage from '@/pages/Admin/ProductsPage';



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
                path: "login",
                element: <UserLogin />
            },
            {
                path: "register",
                element: <UserRegister />
            },
            {
                path: "",
                element: <ProtectedRoutes />,
                children: [
                    {
                        path: "dashboard",
                        element: <UserPanel />,
                        children: [
                            {
                                path: 'user-profile',
                                element: <Profile />
                            },
                            {
                                path: 'orders',
                                element: <Orders />
                            },
                        ]
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
                                path: 'category',
                                element: <CreateCategory />
                            },
                            {
                                path: 'product',
                                element: <ProductsPage />
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