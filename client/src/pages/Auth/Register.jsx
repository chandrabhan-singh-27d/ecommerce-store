import { API_ENDPOINT } from "@/config";
import { useAuth } from "@/context/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
    /* User State Variables */
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userConfPassword, setUserConfPassword] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [userSecurityQuestion, setUserSecurityQuestion] = useState("");
    const [auth, setAuth] = useAuth();

    const navigateTo = useNavigate();

    /* Request body object */
    const user = {
        name: userName,
        email: userEmail,
        password: userPassword,
        phone: userPhone,
        address: userAddress,
        securityQuestion: userSecurityQuestion
    };

    /* Register form submit handler */
    const handleRegistrationSubmit = async (e) => {
        e.preventDefault();

        if (userPassword !== userConfPassword) {
            alert("Password and confirm password does not match")
            return;
        }

        try {
            const response = await fetch(`${API_ENDPOINT}/api/v1/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(user)
            });
            const resData = await response.json();

            if (resData.success) {
                setAuth({
                    ...auth,
                    user: resData.user,
                    token: resData.token
                });
                
                localStorage.setItem('userAuth', JSON.stringify(resData));
                alert(resData.message);
                navigateTo('/')
            } else {
                alert(resData.message)
            }
        } catch (error) {
            console.log("registation error", error)
        }

    }

    return (
        <div className="flex justify-center items-center">
            <div className="bg-white shadow-lg px-8 py-10 w-1/3 rounded-md">
                <div className="text-center">
                    <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                        Register
                    </p>
                </div>
                <form id="register-form" className="mx-auto flex flex-col justify-center pb-2 px-7" onSubmit={handleRegistrationSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Please enter your name"
                            required
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@mail.com"
                            required
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Please enter a password"
                            required value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)} />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="conf_password" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                        <input
                            type="password"
                            id="conf_password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Please confirm password"
                            required value={userConfPassword}
                            onChange={(e) => setUserConfPassword(e.target.value)} />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Please enter your phone number"
                            required
                            value={userPhone}
                            onChange={(e) => setUserPhone(e.target.value)} />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Address</label>
                        <input
                            type="text"
                            id="address"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Please enter your address"
                            required
                            value={userAddress}
                            onChange={(e) => setUserAddress(e.target.value)} />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="security_question" className="block mb-2 text-sm font-medium text-gray-900">What's your best friend's middle name?</label>
                        <input
                            type="text"
                            id="security_question"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Please enter your address"
                            required
                            value={userSecurityQuestion}
                            onChange={(e) => setUserSecurityQuestion(e.target.value)} />
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-primary_color hover:bg-primary_hover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center self-center">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default UserRegister;