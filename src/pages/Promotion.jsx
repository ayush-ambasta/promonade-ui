import React from 'react'
import { PromotionCategories } from '@/components/PromotionCategories';
import PromotionList from '@/components/PromotionList';
import { useContext, useState, useEffect } from "react";
import UserContext from '@/contexts/UserContext';
import { PromotionsProvider } from '@/contexts/PromotionsProvider';
import { Team } from '@/components/Team';

function Promotion(){

  const { state } = useContext(UserContext);

  const user = state.user;
  const userTeam = user.team

  const [defaultPromo, setDefaultPromo] = useState(userTeam.replace("_PROMO_TEAM", ""))
  
  return (
    <PromotionsProvider>
      <main className="bg-zinc-100 relative ">
      <div className='flex flex-col relative top-5 lg:flex-row items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8  lg:justify-between '>
        <div className="rounded-lg flex flex-col gap-4 pb-4 lg:gap-8 w-full lg:w-1/4 lg:order-1 bg-white">
          <PromotionCategories defaultPromo={defaultPromo} setDefaultPromo={setDefaultPromo}/>
        </div>
        <div className="grid lg:w-3/4 auto-rows-max items-start gap-4 lg:gap-8 w-full  lg:order-3">
            <PromotionList defaultPromo={defaultPromo}/>
        </div>
      </div>
    </main>
    </PromotionsProvider>
  )
}

export default Promotion;
