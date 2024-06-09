import SEO from "@/components/SEO"
import SideMenu from "@/components/SideMenu";
import { Outlet } from "react-router-dom";


const AdminPanel = () => {
    const menuList = [
        {
            path: 'create-category',
            name: 'Create Category'
        },
        {
            path: 'create-product',
            name: 'Create Product'
        },
        {
            path: 'users',
            name: 'Users'
        },
    ]
    return (
        <>
            <SEO title={'Admin - ecommerce App'} description={'Admin Panel to manage Iventory and Orders'} keywords={''} author={''} />
            <div className="flex gap-3">
                <SideMenu menuList={menuList} />
                <Outlet />
            </div>
        </>
    )
}

export default AdminPanel;