import { useAuth } from "@/context/auth"
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingPage from "@/components/LoadingPage";

const AdminRoutes = () => {
    const API_ENDPOINT = import.meta.env.VITE_API;
    const [ok, setOk] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    /* Contexts */
    const [auth] = useAuth();

    const authCheck = async () => {
        try {
            const res = await fetch(`${API_ENDPOINT}/api/v1/auth/admin-auth`, {
                method: 'GET',
                headers: {
                    token: auth?.token
                }
            })
            const jsonRes = await res.json()
            if (res.status === 401) {
                if (jsonRes.error.message === "jwt expired") {
                    alert("Session time out, logging off.")
                    localStorage.clear();
                    location.href = '/login';
                }
                setOk(false);
                setIsLoading(false)
            } else if (res.status === 200) {
                if (res.ok) {
                    setOk(true)
                    setIsLoading(() => false)
                } else {
                    setOk(false)
                    setIsLoading(() => false)
                    alert("You don't have right access to this page.")
                }

            }
        } catch (error) {
            setIsLoading(() => false)
            console.log("Error in authenticating user")
        }
    }

    useEffect(() => {
        if (auth?.token) {
            setIsLoading(true);
            authCheck()
        } else {
            location.href = "/login"
            setIsLoading(false)
        }
    }, [auth?.token])


    return (
        <div>
            {isLoading && <LoadingPage />}
            {!isLoading && ok ? <Outlet /> : (
                <div className="mt-4 px-3 py-2 h-[80vh] flex justify-center items-center">
                    <div className="bg-white shadow-lg px-12 py-16 text-primary_color rounded-md text-center">
                        {!auth.user ? <div>Please sign in to access the page.</div> : (
                            <div>Please contact admin to access the page.</div>
                        )}
                        <div className="mt-5 text-black" >Visit <span className="cursor-pointer font-medium text-[#4285f4]" onClick={() => navigate('/')}>Home</span> instead.</div>
                    </div>
                </div>
            )}
        </div>
    )

}

export default AdminRoutes