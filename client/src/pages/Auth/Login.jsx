import { useState } from "react";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "@/config";

const UserLogin = () => {
    const navigateTo = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [forgotPassword, setForgotPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [securityQuestion, setSecurityQuestion] = useState("");

    /* Contexts */
    const [auth, setAuth] = useAuth()

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
                alert(resData.message);
                if(sessionStorage.previousPath) {
                    location.href = sessionStorage.previousPath;
                } else {
                    navigateTo(-1);
                    // location.href = "/"
                }
            } else {
                alert(resData.message)
            }
        } catch (error) {
            console.log("error in login", error);
        }
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();

        /* Request body object */
        const resetUser = {
            email: userEmail,
            newPassword: newPassword,
            securityQuestion: securityQuestion
        }

        try {
            const response = await fetch(`${API_ENDPOINT}/api/v1/auth/reset-password`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(resetUser)
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
                alert(resData.message);
                navigateTo(-1)
            } else {
                alert(resData.message)
            }
        } catch (error) {
            console.log("error in resetting password", error);
        }
    }

    const redirectToRegister = () => {
        navigateTo('/register');
    }

    const redirectToResetPassword = () => {
        setForgotPassword(true)
    }

    return (
        <div className="h-[80vh] flex justify-center items-center">
            {!forgotPassword ?
                (<div className="bg-white shadow-lg px-12 py-10 rounded-md">
                    <div className="text-center mb-5">
                        <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                            Sign in to your account
                        </p>
                        <p className="mt-2 text-sm leading-4 text-slate-600">
                            You must be signed in to perform this action.
                        </p>
                    </div>
                    <form id="login-form" className="max-w-sm mx-auto flex flex-col justify-center pb-2 px-3" onSubmit={handleUserLogin}>
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
                </div>)
                : (
                    <div className="bg-white shadow-lg px-12 py-10 rounded-md">
                        <div className="text-center mb-5">
                            <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                                Reset password for your account
                            </p>
                        </div>
                        <form id="reset-password-form" className="max-w-sm mx-auto flex flex-col justify-center pb-2 px-3" onSubmit={handleResetPassword}>
                            <div className="mb-5">
                                <label htmlFor="reset-email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                <input
                                    type="email"
                                    id="reset-email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@mail.com"
                                    required
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)} />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="new-password" className="block mb-2 text-sm font-medium text-gray-900">New Password</label>
                                <input
                                    type="password"
                                    id="new-password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    required value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)} />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="security-question" className="block mb-2 text-sm font-medium text-gray-900">What's your best friend's middle name</label>
                                <input
                                    type="text"
                                    id="security-question"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    required value={securityQuestion}
                                    onChange={(e) => setSecurityQuestion(e.target.value)} />
                            </div>
                            <button
                                type="submit"
                                className="text-white bg-primary_color hover:bg-primary_hover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
                        </form>
                    </div>

                )}
        </div>
    );
};

export default UserLogin;
