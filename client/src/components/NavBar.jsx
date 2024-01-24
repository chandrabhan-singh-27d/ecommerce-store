import { NavLink, Outlet } from "react-router-dom";

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
                <nav>
                    <ul>
                        {navItems.map(navItem => (
                            <NavLink to={navItem.link} key={navItem.title}>{navItem.title}</NavLink>
                        ))}
                    </ul>
                </nav>

            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default NavBar;