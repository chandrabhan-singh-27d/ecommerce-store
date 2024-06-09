import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"

const SideMenu = ({ menuList }) => {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState(0);

    useEffect(() => {
        navigate(menuList[activeMenu].path)
    }, []);

    const setCurrentMenu = (index, path) => {
        setActiveMenu(index);
        navigate(path);
    };

    return (
        <aside className="sticky min-w-48 max-w-60 py-10 bg-primary_color">
            {menuList.map((menuItem, idx) => (
                <div key={menuItem.path} className={`px-5 py-2 cursor-pointer ${idx === activeMenu ? "text-primary_color bg-white hover:text-primary_hover hover:bg-white" : "text-white hover:bg-[#d90860] hover:text-white"}`} onClick={() => setCurrentMenu(idx, menuItem.path)}>
                    <NavLink to={menuItem.path}>{menuItem.name}</NavLink>
                </div>
            ))}
        </aside>
    )
}

export default SideMenu;