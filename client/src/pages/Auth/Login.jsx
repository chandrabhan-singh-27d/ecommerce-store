import { useState, useRef, useEffect, useCallback } from "react";
import UserRegister from "./Register";
import { useAuth } from "@/context/auth";
import ResetPassword from "./ResetPassword";
import { useUserControls } from "@/context/UserControls";

const UserLogin = () => {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const loginModal = useRef(null);
    
    /* Contexts */
    const [auth, setAuth] = useAuth()
    const {isLoginOpen,setIsLoginOpen, isRegisterOpen, setIsRegisterOpen, isResetOpen, setIsResetOpen} = useUserControls();
    
    /* Address to call api request */
    const API_ENDPOINT = import.meta.env.VITE_API;

    useEffect(() => {
        if (isLoginOpen) {
            loginModal.current?.showModal()
        } else {
            /* Reset Login variables */
            setUserEmail("")
            setUserPassword("")

            /* Close login modal */
            loginModal.current?.close()
        }
    }, [isLoginOpen])


    /* Request body object */
    const user = {
        email: userEmail,
        password: userPassword
    }

    const handleUserLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_ENDPOINT}/api/v1/auth/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(user)
            })
            const resData = await response.json();

            if (resData?.success) {
                /* Set the context of the logged in user */
                setAuth({
                    ...auth,
                    user: resData.user,
                    token: resData.token
                });
                localStorage.setItem('userAuth', JSON.stringify(resData));

                /* Close login modal only when the request is fulfilled */
                setIsLoginOpen(() => false)
                alert(resData.message);
            } else {
                alert(resData.message)
            }
        } catch (error) {
            console.log("error in login", error);
        }
    }

    const redirectToRegister = () => {
        setIsRegisterOpen(true);
        setIsLoginOpen(false);
        console.log(isLoginOpen, isRegisterOpen)
    }

    const redirectToResetPassword = () => {
        setIsLoginOpen(false)
        setIsResetOpen(true)
    }

    return (
        <>
            <dialog
                ref={loginModal}
                className="w-1/4 border rounded-xl box-border shadow-lg border-gray-500 p-3 backdrop:bg-black/60"
                onCancel={() => setIsLoginOpen(false)}
            >
                <div className="flex justify-end">
                    <button onClick={() => setIsLoginOpen(false)} className="hover:bg-gray-100 hover:rounded-md p-2">
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="#c6c7c7"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="sr-only">Close popup</span>
                    </button>
                </div>
                <div className="text-center p-5">
                    <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                        Sign in to your account
                    </p>
                    <p className="mt-2 text-sm leading-4 text-slate-600">
                        You must be signed in to perform this action.
                    </p>
                </div>
                <form id="login-form" className="max-w-sm mx-auto flex flex-col justify-center pb-2 px-5" onSubmit={handleUserLogin}>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@mail.com"
                            required
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)} />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)} />
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-primary_color hover:bg-primary_hover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
                </form>
                <div className="mt-6 text-center text-sm text-slate-600">
                    Don't have an account? &nbsp;
                    <span onClick={redirectToRegister} className="cursor-pointer font-medium text-[#4285f4]">
                        Sign up
                    </span>
                </div>
                <div className="mt-2 mb-4 text-center text-sm text-slate-600">
                    Forgot Password? &nbsp;
                    <span onClick={redirectToResetPassword} className="cursor-pointer font-medium text-[#4285f4]">
                        Reset
                    </span>
                </div>
            </dialog>
            {isRegisterOpen && <UserRegister />}
            {isResetOpen && <ResetPassword />}
        </>
    );
};

export default UserLogin;
