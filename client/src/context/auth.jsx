import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();


const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    });

    useEffect(() => {
        const userData = localStorage.getItem('userAuth');

        if(userData) {
            const parsedData = JSON.parse(userData);
            setAuth({
                ...auth,
                user: parsedData.user,
                token: parsedData.token
            })
        }

    },[])

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