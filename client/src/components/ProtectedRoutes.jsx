import { useAuth } from "@/context/auth"
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import UserLogin from "@/pages/Auth/Login";


const ProtectedRoutes = () => {
    const API_ENDPOINT = import.meta.env.VITE_API;
    const [auth, setAuth] = useAuth();
    const [ok, setOk] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const navigate = useNavigate();
    const [isValidToken, setIsValidToken] = useState(true)

    useEffect(() => {
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
                    setIsValidToken(false);
                } else if (res.status === 200) {
                    setIsValidToken(true)
                    if (res.ok) {
                        setOk(true)
                    } else {
                        setOk(false)
                    }

                }
            } catch (error) {
                console.log("Error in authenticating user")
            }
        }

        if (auth?.token) authCheck();
        else setIsLoginModalOpen(true);
    }, [auth?.token])

    const handleModalClose = () => {
        const closeConfirmation = confirm("Please Login to perform the operation. Press Ok to go back to home OR Cancel to stay on the page and login");

        if (closeConfirmation) {
            setIsLoginModalOpen(false);
            navigate("/");
        } else return;
    }

    if (!auth.token || !isValidToken) return <UserLogin openModal={isLoginModalOpen} closeModal={handleModalClose} />

    return ok ? <Outlet /> : <LoadingPage />

}

export default ProtectedRoutes;