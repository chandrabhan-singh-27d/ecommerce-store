import { useState } from "react";
import SEO from "@/components/SEO";
import UserLogin from "./Auth/Login";


const Home = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(true);

    return (
        <>
            <SEO title={'ecommerce App'} description={''} keywords={''} author={''} />
            <UserLogin
                openModal={isLoginModalOpen}
                closeModal={() => setIsLoginModalOpen(false)}
            />
        </>
    );
}

export default Home;