import React from 'react'
import { PromotionCategories } from '@/components/PromotionCategories';
import PromotionList from '@/components/PromotionList';
import { useContext, useState, useEffect } from "react";
import UserContext from '@/contexts/UserContext';

function Promotion(){

  const { state } = useContext(UserContext);

  const user = state.user;
  const userTeam = user.team

  const [defaultPromo, setDefaultPromo] = useState(userTeam.replace("_PROMO_TEAM", ""))
  
  return (
    <div className='flex'>
      <div>
        <PromotionCategories defaultPromo={defaultPromo} setDefaultPromo={setDefaultPromo}/>
      </div>

      <div className='w-3/4'>
        <PromotionList defaultPromo={defaultPromo}/>

      </div>
    </div>
  )
}

export default Promotion;
