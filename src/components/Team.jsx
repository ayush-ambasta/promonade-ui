import React, { useContext } from 'react'

import {
    Bolt,
    ChevronUp,
    Leaf,
    Milestone,
    Stamp,
    Zap,
} from "lucide-react"
import UserContext from '@/contexts/UserContext';

export const Team = () => {
    const {setteamName} = useContext(UserContext);
    const handleClick = (e) =>{
        const name = e.target.textContent;
        setteamName(name);
    }
  return (
    
        <div className="flex h-full max-h-screen flex-col gap-4">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <span className="font-semibold text-2xl">Team</span>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 cursor-pointer" onClick={handleClick}>
              <div
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Milestone className="h-4 w-4" />
                MILESTONE_PROMO_TEAM
              </div>
              <div
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              > 
              
                <Bolt className="h-4 w-4" />
                REFERRAL_PROMO_TEAM
              </div>
              <div
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <ChevronUp className="h-4 w-4" />
                HIGHPURCHASE_PROMO_TEAM
              </div>
              <div
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Stamp className="h-4 w-4" />
                LOYALTY_PROMO_TEAM
              </div>
              <div
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Zap className="h-4 w-4" />
                FLASHSALE_PROMO_TEAM
              </div>
              <div
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                
                <Leaf className="h-4 w-4" />
                SEASONAL_PROMO_TEAM
              </div>
            </nav>
          </div>
          </div>
  )
}

