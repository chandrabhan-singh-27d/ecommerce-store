import { NavLink, Outlet, useNavigate } from "react-router-dom"

const SideMenu = ({ menuList }) => {
    const navigate = useNavigate();
    return (
        <aside className="max-w-60 h-[96vh] py-10 bg-primary_color">
            {menuList.map(menuItem => (
                <div key={menuItem.path} className="text-white hover:bg-white hover:text-primary_color px-5 py-2 cursor-pointer" onClick={() => navigate(menuItem.path)}>
                    <NavLink to={menuItem.path}>{menuItem.name}</NavLink>
                </div>
            ))}
        </aside>
    )
}

export default SideMenu;