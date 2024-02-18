import { createBrowserRouter } from 'react-router-dom'

// global components
// import Loader from '../components/Loader'
import Layout from '@/components/Layout';

// Pages
import Home from '@/pages/Home';
import About from '@/pages/About';



const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        // loader: Loader,
        // errorElement: rootError,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "about",
                element: <About />
            }
        ]
    }
])

export default router;