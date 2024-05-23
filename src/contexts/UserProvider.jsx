import React, { useEffect, useReducer, useState } from "react";
import UserContext from "./UserContext";
import { userReducer } from "@/reducer/userReducer";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user:user
};
  

export const UserProvider =({children})=>{
    const [state, dispatch] = useReducer(userReducer, initialState);
    const [teamName, setteamName] = useState();
    useEffect(() => {
      setteamName(user?.name);
    }, [])
    
    return (
        <UserContext.Provider value={{state,dispatch,teamName,setteamName}}>
            {children}
        </UserContext.Provider>
    )
}