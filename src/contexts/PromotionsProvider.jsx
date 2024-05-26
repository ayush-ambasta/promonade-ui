import React, { useEffect, useReducer, useState } from "react";
import PromotionsContext from "./PromotionsContext";
import { promotionReducer } from "@/reducer/promotionsReducer";

const initialState = [];

export const PromotionsProvider =({children})=>{
    const [promotions, dispatch] = useReducer(promotionReducer, initialState);

    return (
        <PromotionsContext.Provider value={{promotions,dispatch}}>
            {children}
        </PromotionsContext.Provider>
    )
}