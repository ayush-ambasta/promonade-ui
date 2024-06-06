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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"


export const Team = () => {
    const {setteamName, state} = useContext(UserContext);
    const team = state.user?.team
    const handleClick = (e) =>{
        const name = convertToSnakeCase(e.target.textContent);
        setteamName(name);
    }
  return (
    
        <div className="flex max-h-screen  flex-col  ">
          <div className="flex-col items-center p-4 lg:px-6">
              <span className="font-normal pb-4 text-xl dark:text-slate-300 text-slate-600">Teams</span>
              <hr className='mt-2.5'></hr>
          </div>
          
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:pr-4 cursor-pointer" onClick={handleClick}>
              <ToggleGroup className="flex-col ml-5 items-start" defaultValue={team} type="single" >
              
                <ToggleGroupItem value="MILESTONE_PROMO_TEAM"  className=" text-left px-0 ">
                  <div
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <Milestone className="h-4 w-4" />
                    {convertToTitleCase("MILESTONE_PROMO_TEAM")}
                  </div>
                </ToggleGroupItem>

                <ToggleGroupItem value="REFERRAL_PROMO_TEAM"  className=" text-left px-0 ">
                  <div
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  > 
                    <Bolt className="h-4 w-4" />
                    {convertToTitleCase("REFERRAL_PROMO_TEAM")}
                  </div>
                </ToggleGroupItem>

                <ToggleGroupItem value="HIGHPURCHASE_PROMO_TEAM"  className=" text-left px-0 ">
                  <div
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <ChevronUp className="h-4 w-4" />
                    {convertToTitleCase("HIGHPURCHASE_PROMO_TEAM")}
                  </div>
                </ToggleGroupItem>

                <ToggleGroupItem value="LOYALTY_PROMO_TEAM"  className=" text-left px-0 ">
                  <div
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <Stamp className="h-4 w-4" />
                    {convertToTitleCase("LOYALTY_PROMO_TEAM")}
                  </div>
                </ToggleGroupItem>

                <ToggleGroupItem value="FLASHSALE_PROMO_TEAM"  className=" text-left px-0 ">
                  <div
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <Zap className="h-4 w-4" />
                    {convertToTitleCase("FLASHSALE_PROMO_TEAM")}
                  </div>
                </ToggleGroupItem>

                <ToggleGroupItem value="SEASONAL_PROMO_TEAM"  className=" text-left px-0 ">
                  <div
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <Leaf className="h-4 w-4" />
                    {convertToTitleCase("SEASONAL_PROMO_TEAM")}
                  </div>
                </ToggleGroupItem>

              </ToggleGroup>
            </nav>
          </div>
          </div>
  )
}

