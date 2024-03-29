import { useState } from "react";
import SEO from "@/components/SEO";
import UserLogin from "./Auth/Login";
import UserRegister from "./Auth/Register";


const Home = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

    return (<>
        <SEO title={'ecommerce App'} description={''} keywords={''} author={''} />
        <h1 className="px-2 text-lg text-blue-900">This is the homepage</h1>
        <button
            type="button"
            className="p-2 border border-gray-700 bg-black text-white rounded"
            onClick={() => setIsRegisterModalOpen(true)}
        >Open Register Modal</button>

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