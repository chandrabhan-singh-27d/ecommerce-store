import { createBrowserRouter } from 'react-router-dom'

// global components
// import Loader from '../components/Loader'
import Layout from '../components/Layout';


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        // loader: Loader,
        // errorElement: rootError
    }
])

export default router;