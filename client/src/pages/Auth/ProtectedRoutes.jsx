import { useAuth } from "@/context/auth"
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";
import UserLogin from "@/pages/Auth/Login";


const ProtectedRoutes = () => {
    const API_ENDPOINT = import.meta.env.VITE_API;
    const [auth] = useAuth();
    const [ok, setOk] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const navigate = useNavigate();

    const authCheck = async () => {
        try {
            const res = await fetch(`${API_ENDPOINT}/api/v1/auth/user-auth`, {
                method: 'GET',
                headers: {
                    token: auth?.token
                }
            })
            if (res.status === 401) {
                localStorage.clear();
                setIsLoginModalOpen(true)
            } else if (res.status === 200) {
                if (res.ok) {
                    setOk(true)
                    setIsLoginModalOpen(false)
                } else {
                    setOk(false)
                    alert("You don't have right access to this page.")
                }

            }
        } catch (error) {
            console.log("Error in authenticating user")
        }
    }

    useEffect(() => {
        if (auth?.token) authCheck();
        else setIsLoginModalOpen(true)
    }, [auth?.token])

    const handleModalClose = () => {
        const closeConfirmation = confirm("Please Login to perform the operation. Press Cancel to go back to home OR Ok to stay on the page and login");

        if (!closeConfirmation) {
            setIsLoginModalOpen(false);
            navigate("/");
        } else return;
    }


    return (
        <>
            {isLoginModalOpen && <UserLogin openModal={isLoginModalOpen} closeModal={handleModalClose} />}
            {ok ? <Outlet /> : <LoadingPage />}
        </>
    )

}

export default ProtectedRoutes;