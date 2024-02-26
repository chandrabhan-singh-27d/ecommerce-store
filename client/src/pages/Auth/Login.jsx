import { useState, useRef, useEffect } from "react";

const UserLogin = ({ openModal, closeModal }) => {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const loginModal = useRef();

    useEffect(() => {
        if (openModal) {
            loginModal.current?.showModal()
        } else {
            setUserEmail("")
            setUserPassword("")
            loginModal.current?.close()
        }
    }, [openModal])


    return (
        <dialog 
        ref={loginModal} 
        className="border rounded-xl box-border shadow-lg border-gray-500 p-3 backdrop:bg-black/60" 
        onCancel={closeModal}
        >
            <div className="flex justify-end">
                <button onClick={closeModal} className="hover:bg-gray-100 hover:rounded-md p-2">
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
                    Login to your account
                </p>
                <p className="mt-2 text-sm leading-4 text-slate-600">
                    You must be logged in to perform this action.
                </p>
            </div>
            {/* 
                
                The below code is for oAuth implementation will do it later

            */}

            {/* <div className="text-center font-semibold">
                <p className="mt-1 text-sm leading-4 text-slate-800">
                    Login With
                </p>
            </div>
            <div className="mt-5 flex gap-2 px-2">
                <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                    <img
                        src="https://www.svgrepo.com/show/512317/github-142.svg"
                        alt="GitHub"
                        className="h-[18px] w-[18px] "
                    />

                </button>
                <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="h-[18px] w-[18px] "
                    />
                </button>
                <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                    <img
                        src="https://www.svgrepo.com/show/448234/linkedin.svg"
                        alt="Google"
                        className="h-[18px] w-[18px] "
                    />
                </button>
            </div>
            <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
                <div className="h-px w-full bg-slate-200" />
                OR
                <div className="h-px w-full bg-slate-200" />
            </div> */}
            <form className="max-w-sm mx-auto flex flex-col justify-center pb-2 px-5">
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
                {/* <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                        <input
                            id="remember"
                            type="checkbox" value=""
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                            required />
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900">Remember me</label>
                </div> */}
                <button
                    type="submit"
                    className="text-white bg-primary_color hover:bg-primary_hover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
            </form>
            <div className="mt-6 text-center text-sm text-slate-600">
                Don't have an account?
                <a href="/signup" className="font-medium text-[#4285f4]">
                    Sign up
                </a>
            </div>
        </dialog>
    );
};

export default UserLogin;
