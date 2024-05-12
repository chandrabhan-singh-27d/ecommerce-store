import { createBrowserRouter } from 'react-router-dom'

// global components
// import Loader from '../components/Loader'
import Layout from '@/components/Layout';

// Pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import AdminPanel from '@/pages/User/AdminPanel';
import ProtectedRoutes from '@/components/ProtectedRoutes';



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
                        element: <AdminPanel />
                    },
                ]
            },
        ]
    }
])

export default router;