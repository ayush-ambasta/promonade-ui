import { useContext } from "react";
import {Navigate, useLocation } from "react-router-dom";
import UserContext from "./contexts/UserContext";

export const RequireAuth = ({children})=> {
    const {state} = useContext(UserContext);
    const user = state?.user || null;
    // console.log(user)
    const location = useLocation();

    if(user === null) {
        return <Navigate to={'/login'} state={{path: location.pathname}} />;
    }

    return children;
}