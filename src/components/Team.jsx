import React, { useContext } from 'react'
import { convertToTitleCase, convertToSnakeCase } from '@/lib/utils';
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
        const name = convertToSnakeCase(e.target.textContent);
        setteamName(name);
    }
  return (
    
        <div className="flex max-h-screen flex-col gap-4">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <span className="font-semibold text-2xl">Team</span>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:pr-4 cursor-pointer" onClick={handleClick}>
              <div
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Milestone className="h-4 w-4" />
                {convertToTitleCase("MILESTONE_PROMO_TEAM")}
              </div>
              <div
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              > 
              
                <Bolt className="h-4 w-4" />
                {convertToTitleCase("REFERRAL_PROMO_TEAM")}
              </div>
              <div
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <ChevronUp className="h-4 w-4" />
                {convertToTitleCase("HIGHPURCHASE_PROMO_TEAM")}
              </div>
              <div
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Stamp className="h-4 w-4" />
                {convertToTitleCase("LOYALTY_PROMO_TEAM")}
              </div>
              <div
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Zap className="h-4 w-4" />
                {convertToTitleCase("FLASHSALE_PROMO_TEAM")}
              </div>
              <div
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                
                <Leaf className="h-4 w-4" />
                {convertToTitleCase("SEASONAL_PROMO_TEAM")}
              </div>
            </nav>
          </div>
          </div>
  )
}

