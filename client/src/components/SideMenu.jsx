import { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom"

const SideMenu = ({ menuList, parentClassNames }) => {
    const navigate = useNavigate();
    const currentLocation = useLocation();
    const currentPathIndex = menuList.findIndex(menu => currentLocation.pathname.includes(menu.path));
    const [activeMenu, setActiveMenu] = useState(currentPathIndex !== -1 ? currentPathIndex : 0);


    useEffect(() => {
        navigate(menuList[activeMenu].path);
    }, []);

    const setCurrentMenu = (index, path) => {
        setActiveMenu(index);
        navigate(path);
    };

    return (
        <aside className={`fixed w-[10%] py-10 bg-primary_color h-[92vh] overflow-y-hidden ${parentClassNames}`}>
            {menuList?.map((menuItem, idx) => (
                <div key={menuItem.path} className={`px-5 py-2 cursor-pointer ${idx === activeMenu ? "text-primary_color bg-white hover:text-primary_hover hover:bg-white" : "text-white hover:bg-[#d90860] hover:text-white"}`} onClick={() => setCurrentMenu(idx, menuItem.path)}>
                    <NavLink to={menuItem.path}>{menuItem.name}</NavLink>
                </div>
            ))}
        </aside>
    )
}

export default SideMenu;