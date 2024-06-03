import { useContext, useEffect, useState } from "react";
import {Navigate, useLocation } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import { testUserToken } from "./services/userService";
import { useNavigate } from 'react-router-dom';

export const RequireAuth = ({children})=> {
    const {state, dispatch} = useContext(UserContext);
    const user = state?.user || null;
    const location = useLocation();
    const navigate = useNavigate();
    const [tokenValid, setTokenValid] = useState(false)

    const checkToken = async () => {
        try {
            const valid = await testUserToken();
            setTokenValid(valid)
        } catch (err) {
            if (err.message === "SESSION_EXPIRED") {
                dispatch({ type: 'LOGOUT' });
                navigate('/login')
            }
        }
    };

    useEffect(() => {
        checkToken();
    }, [dispatch]);
    
    if (user === null) {
        return <Navigate to={'/login'} state={{ path: location.pathname }} />;
    }

    return tokenValid ? children : null;
}