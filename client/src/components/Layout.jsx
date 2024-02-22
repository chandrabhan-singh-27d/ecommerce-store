import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { HelmetProvider } from "react-helmet-async";
const Layout = () => {
    return (
        <>
            <NavBar />
            <main>
                <HelmetProvider>
                    <Outlet />
                </HelmetProvider>
            </main>
        </>
    );
}

export default Layout;