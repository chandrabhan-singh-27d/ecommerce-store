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
        {/* <h1 className="px-2 text-lg text-blue-900">This is the homepage</h1>
        <pre>{JSON.stringify(auth)}</pre> */}
        {/* <button
            type="button"
            className="p-2 border border-gray-700 bg-black text-white rounded"
            onClick={() => setIsRegisterModalOpen(true)}
        >Open Register Modal</button>
        
        <button
            type="button"
            className="p-2 border ml-4 border-gray-700 bg-black text-white rounded"
            onClick={() => setIsLoginModalOpen(true)}
        >Open Login Modal</button> */}

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