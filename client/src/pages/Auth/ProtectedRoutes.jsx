import { useAuth } from "@/context/auth"
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";
import UserLogin from "@/pages/Auth/Login";
import { useUserControls } from "@/context/UserControls";


const ProtectedRoutes = () => {
    const API_ENDPOINT = import.meta.env.VITE_API;
    const navigate = useNavigate();
    const [ok, setOk] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
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
                setIsLoginOpen(true);
                setIsLoading(false);
            } else if (res.status === 200) {
                if (res.ok) {
                    setOk(true)
                    setIsLoginOpen(false);
                    setIsLoading(false);
                } else {
                    setOk(false)
                    setIsLoading(false)
                    alert("You don't have right access to this page.")
                }

            }
        } catch (error) {
            setIsLoading(false)
            console.log("Error in authenticating user")
        }
    }

    useEffect(() => {
        if (auth?.token){ 
            setIsLoading(true);
            authCheck()
        } else {
            setIsLoginOpen(true)
            setIsLoading(false)
        }
    }, [auth?.token])



    return (
        <div>
            <UserLogin />
            {isLoading && <LoadingPage />}
            {!isLoading && ok ? <Outlet /> : (
                <>
                    <div className="mt-4 px-3 py-2 h-[80vh] flex justify-center items-center">
                        <div className="bg-white shadow-lg px-12 py-16 text-primary_color rounded-md text-center">
                            <div>Please sign in to access the page.</div>
                            <div className="mt-5 text-black" >Visit <span className="cursor-pointer font-medium text-[#4285f4]" onClick={() => navigate('/')}>Home</span> instead.</div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )

}

export default ProtectedRoutes;