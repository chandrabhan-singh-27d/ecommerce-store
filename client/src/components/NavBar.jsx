import { NavLink } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaRegUserCircle, FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { GoSearch } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo_new/svg/logo-no-background.svg";

const NavBar = () => {
    //hooks calls
    const navigateTo = useNavigate();

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

    const goToHomepage = () => {
        navigateTo('/')
    }

    return (
        <header className="flex justify-between items-center py-1 px-1">
            <div className="w-[12%] h-[12%] cursor-pointer" onClick={goToHomepage}>
                <img src={logo} alt="logo" />
            </div>
            <nav className="w-1/3">
                <ul className="flex gap-4 justify-between">
                    {navItems.map(navItem => (
                        <NavLink className={'text-lg text-primary_text'} to={navItem.link} key={navItem.title}>{navItem.title}</NavLink>
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
                        <FaRegUserCircle />
                        <FaRegHeart />
                        <HiOutlineShoppingBag />
                    </>
                </IconContext.Provider>

            </div>
        </header>
    );
}

export default NavBar;