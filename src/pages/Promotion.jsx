import React from 'react'
import { PromotionCategories } from '@/components/PromotionCategories';
import PromotionList from '@/components/PromotionList';
import { useContext, useState, useEffect } from "react";
import UserContext from '@/contexts/UserContext';
import { PromotionsProvider } from '@/contexts/PromotionsProvider';

function Promotion(){

  const { state } = useContext(UserContext);

  const user = state.user;
  const userTeam = user.team

  const [defaultPromo, setDefaultPromo] = useState(userTeam.replace("_PROMO_TEAM", ""))
  
  return (
    <PromotionsProvider>
      <div className='flex flex-col lg:flex-row'>
        <div>
          <PromotionCategories defaultPromo={defaultPromo} setDefaultPromo={setDefaultPromo}/>
        </div>

        <div className='w-full lg:w-3/4'>
          <PromotionList defaultPromo={defaultPromo}/>

        </div>
      </div>
    </PromotionsProvider>
  )
}

export default Promotion;