import { useState } from "react";
import SEO from "@/components/SEO";
import UserLogin from "./Auth/Login";
import UserRegister from "./Auth/Register";
import { useAuth } from "@/context/auth";


const Home = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

    const [auth, setAuth] = useAuth();

    

    return (<>
        <SEO title={'ecommerce App'} description={''} keywords={''} author={''} />
        <UserLogin
            openModal={isLoginModalOpen}
            closeModal={() => setIsLoginModalOpen(false)}
        />

        <UserRegister 
            openModal={isRegisterModalOpen}
            closeModal={() => setIsRegisterModalOpen(false)}
        />
    </>);
}

export default Home;