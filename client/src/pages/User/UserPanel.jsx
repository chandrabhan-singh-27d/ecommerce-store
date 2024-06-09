import SEO from "@/components/SEO";
import SideMenu from "@/components/SideMenu";
import { Outlet } from "react-router-dom";



const UserPanel = () => {
    const menuList = [
        {
            path: 'user-profile',
            name: 'Profile'
        },
        {
            path: 'orders',
            name: 'Orders'
        },
    ]
    return (
        <>
            <SEO title={'User - ecommerce App'} description={'User Panel to manage Profile and Orders'} keywords={''} author={''} />
            <div className="flex gap-3">
                <SideMenu menuList={menuList} />
                <Outlet />
            </div>
        </>
    )
}

export default UserPanel;