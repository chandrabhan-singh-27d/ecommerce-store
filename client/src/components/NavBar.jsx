import { NavLink, Outlet } from "react-router-dom";
import logo from "../assets/logo/svg/logo-no-background.svg";

const NavBar = () => {
    //Navigation items
    const navItems = [
        {
            title: "Home",
            link: "/"
        },
        {
            title: "About",
            link: "/about"
        },
        {
            title: "Contact",
            link: "/contact"
        },
        {
            title: "Cart",
            link: "/cart"
        },

    ];


    return (
        <>
            <header>
                <nav className="flex ">
                    <div className="w-[12%] h-[12%] mt-3">
                        <img src={logo} alt="logo" />
                    </div>
                    <ul>
                        {navItems.map(navItem => (
                            <NavLink to={navItem.link} key={navItem.title}>{navItem.title}</NavLink>
                        ))}
                    </ul>
                </nav>

            </header>
        </>
    );
}

export default NavBar;