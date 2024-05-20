import React from "react";
import { useState } from "react";
import UserContext from "./UserContext";

export const UserProvider =({children})=>{
    
    const [user, setuser] = useState({'name':'owner'});
    
    const updateUser=(newUser)=>{
        setuser(newUser);
    }
    return (
        <UserContext.Provider value={{user,updateUser}}>
            {children}
        </UserContext.Provider>
    )
}