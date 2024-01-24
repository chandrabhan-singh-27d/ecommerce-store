import { createBrowserRouter } from 'react-router-dom'

// global components
// import Loader from '../components/Loader'
import NavBar from '../components/NavBar';
import Layout from '../components/Layout';
//root page components
import Home from '../pages/Home';


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        // loader: Loader,
        // errorElement: rootError
    }
])

export default router;