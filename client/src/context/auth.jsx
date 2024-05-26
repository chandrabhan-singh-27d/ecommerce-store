import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: JSON.parse(localStorage.getItem('userAuth')) ? JSON.parse(localStorage.getItem('userAuth')).user : null,
        token: JSON.parse(localStorage.getItem('userAuth')) ? JSON.parse(localStorage.getItem('userAuth')).token : ""
    });


    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);

export {
    useAuth,
    AuthProvider
}