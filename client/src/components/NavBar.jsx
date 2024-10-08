import { NavLink } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaRegUserCircle, FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { GoSearch } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo_new/svg/logo-no-background.svg";
import { useRef, useState, useEffect } from "react";
import { useAuth } from "@/context/auth";

const NavBar = () => {
    //hooks calls
    const navigateTo = useNavigate();
    const [isUserControlOpen, setIsUserControlOpen] = useState(false);
    const userControl = useRef(null);

    const [auth, setAuth] = useAuth();

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

    useEffect(() => {
        if (isUserControlOpen) {
            setTimeout(userControl.current?.focus(), 0)
        }
    }, [isUserControlOpen]);

    const goToHomepage = () => {
        navigateTo('/')
    }

    const goToUserDashboard = () => {
        navigateTo('/dashboard');
        setIsUserControlOpen(false);
    }

    const goToAdminPanel = () => {
        navigateTo('/admin/dashboard');
        setIsUserControlOpen(false);
    }
    const handleLogin = () => {
        navigateTo('/login')
        setIsUserControlOpen(false);
    }
    const handleSignUp = () => {
        navigateTo('/register')
        setIsUserControlOpen(false);
    }

    const handleLogout = () => {
        setIsUserControlOpen(false);
        localStorage.clear();
        window.location.reload();
    }

    return (
        <header className="flex justify-between items-center py-2 px-1 mb-4 sticky top-0 z-50 bg-white">
            <div className="w-[12%] h-[12%] cursor-pointer" onClick={goToHomepage}>
                <img src={logo} alt="logo" />
            </div>
            <nav className="w-1/3">
                <ul className="flex gap-4 justify-between">
                    {navItems.map(navItem => (
                        <NavLink className={'text-lg text-primary_color'} to={navItem.link} key={navItem.title}>{navItem.title}</NavLink>
                    ))}
                </ul>
            </nav>
            <div id="user-control" className="flex justify-between gap-1 items-center mr-4 w-1/4 ">
                <div className="flex items-center w-3/4 border border-gray-200 rounded bg-gray-100">
                    <GoSearch size={25} color="#3f3f46" className="p-0.5 mx-0.5" />
                    <input className="focus:border-none focus:outline-none  focus:bg-white p-1 w-full text-sm m-px" type="text" name="search" id="serach-box" placeholder="Search for products, categories, etc." />
                </div>
                <IconContext.Provider value={{ className: "cursor-pointer", size: 20 }}>
                    <>
                        <FaRegHeart className="text-primary_color" />
                        <HiOutlineShoppingBag className="text-primary_color" />
                        <FaRegUserCircle className="text-primary_color" id="user-button" onClick={() => setIsUserControlOpen(true)}
                        />
                    </>
                </IconContext.Provider>
            </div>
            {isUserControlOpen && <div ref={userControl} tabIndex={1} onBlur={() => setIsUserControlOpen(false)} className=" bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute top-12 right-2 focus:outline-none">
                <ul className="py-2 text-sm ">
                    {!auth.user ? (
                        <>
                            <li onClick={handleLogin}>
                                <span className="cursor-pointer block px-4 py-2 hover:bg-gray-100">Sign In</span>
                            </li>
                            <li onClick={handleSignUp}>
                                <span className="cursor-pointer block px-4 py-2 hover:bg-gray-100">Sign Up</span>
                            </li>
                        </>
                    ) : (
                        <>
                            <li onClick={goToUserDashboard}>
                                <span className="cursor-pointer block px-4 py-2 hover:bg-gray-100">Dashboard</span>
                            </li>
                            <li onClick={goToAdminPanel}>
                                <span className="cursor-pointer block px-4 py-2 hover:bg-gray-100">Admin Panel</span>
                            </li>
                            <li onClick={handleLogout}>
                                <span className="cursor-pointer block px-4 py-2 hover:bg-gray-100">Sign out</span>
                            </li>
                        </>
                    )}

                </ul>
            </div>
            }
        </header>
    );
}

export default NavBar;