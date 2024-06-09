import SEO from "@/components/SEO"
import SideMenu from "@/components/SideMenu";
import { Outlet } from "react-router-dom";


const AdminPanel = () => {
    const menuList = [
        {
            path: 'category',
            name: 'Category'
        },
        {
            path: 'product',
            name: 'Product'
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