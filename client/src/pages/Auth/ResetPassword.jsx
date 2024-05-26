import { useState, useRef, useEffect } from "react";

const ResetPassword = ({ openModal, closeModal, setIsResetPasswordModalOpen, setResetFulfilled }) => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [securityQuestion, setSecurityQuestion] = useState("");
    const resetPasswordModal = useRef();

    /* Address to call api request */
    const API_ENDPOINT = import.meta.env.VITE_API;

    useEffect(() => {
        if (openModal) {
            resetPasswordModal.current?.showModal()
        } else {
            /* Reset variables */
            setEmail("")
            setNewPassword("")
            setSecurityQuestion("")

            /* Close modal */
            resetPasswordModal.current?.close()
        }
    }, [openModal])

    /* Request body object */
    const user = {
        email: email,
        newPassword: newPassword,
        securityQuestion: securityQuestion
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_ENDPOINT}/api/v1/auth/reset-password`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(user)
            })
            const resData = await response.json();

            if (resData?.success) {
                setIsResetPasswordModalOpen(false)
                resetPasswordModal.current?.close();
                alert(resData.message); 
                setResetFulfilled(true);
            } else {
                alert(resData.message)
            }
        } catch (error) {
            console.log("error in login", error);
        }
    }

    return (
        <dialog
            ref={resetPasswordModal}
            className="w-1/4 border rounded-xl box-border shadow-lg border-gray-500 p-3 backdrop:bg-black/60"
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
                    Reset password for your account
                </p>
            </div>
            <form id="reset-password-form" className="max-w-sm mx-auto flex flex-col justify-center pb-2 px-5" onSubmit={handleResetPassword}>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@mail.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
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
        </dialog>
    );
};

export default ResetPassword;
