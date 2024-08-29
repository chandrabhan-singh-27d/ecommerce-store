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
                <SideMenu menuList={menuList} />
            <div className="ml-[11%] mr-4">
                <Outlet />
            </div>
        </>
    )
}

export default UserPanel;