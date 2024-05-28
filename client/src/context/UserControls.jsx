import { createContext, useContext, useState } from "react";

const UserControlsContext = createContext();

const UserControlsProvider = ({children}) => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isResetOpen, setIsResetOpen] = useState(false);


    return <UserControlsContext.Provider value={{
        isLoginOpen,
        setIsLoginOpen,
        isRegisterOpen,
        setIsRegisterOpen,
        isResetOpen,
        setIsResetOpen
    }}>
        {children}
    </UserControlsContext.Provider>
}

const useUserControls = () => useContext(UserControlsContext)
export {
    useUserControls,
    UserControlsProvider
}