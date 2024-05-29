import { useAuth } from "@/context/auth"
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";
import UserLogin from "@/pages/Auth/Login";
import { useUserControls } from "@/context/UserControls";


const ProtectedRoutes = () => {
    const API_ENDPOINT = import.meta.env.VITE_API;
    const [ok, setOk] = useState(false);

    /* Contexts */
    const { setIsLoginOpen } = useUserControls();
    const [auth] = useAuth();

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
                setIsLoginOpen(true)
            } else if (res.status === 200) {
                if (res.ok) {
                    setOk(true)
                    setIsLoginOpen(false)
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
        else setIsLoginOpen(true)
    }, [auth?.token])



    return (
        <div>
            <UserLogin />
            {ok ? <Outlet /> : !auth.user ?
                <div className="mt-4 px-3 py-2 h-[80vh] flex justify-center items-center">
                    <div className="bg-white shadow-lg px-12 py-16 text-primary_color rounded-md">Please sign in to access the page.</div>
                </div>
                : (
                    <>
                        <div className="mt-4 px-3 py-2 h-[80vh] flex justify-center items-center">
                            <div className="bg-white shadow-lg px-12 py-16 text-primary_color rounded-md">Please sign in to access the page.</div>
                        </div>
                        <LoadingPage />
                    </>
                )}
        </div>
    )

}

export default ProtectedRoutes;