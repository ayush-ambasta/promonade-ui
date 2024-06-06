import React from 'react'
import { PreviousPromotions } from '@/components/promotion/PreviousPromotions';
import PromotionAnalysis from '@/components/analytics/PromotionAnalysis';
import BusinessAnalysis from '@/components/analytics/BusinessAnalysis';
import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getPromotionById,getApprovedPromotions } from "@/services/promotionsService";


function Analytics(){
  const location = useLocation();
  const [Promotion, setPromotion] = useState(null)
  const [loading, setLoading] = useState(true)

  async function getPromotion(id){
    const promotion = await getPromotionById(id);
    setPromotion(promotion)
    setLoading(false)
  }

  const checkVaildTill = (promo) =>{
      const validTill = new Date(promo?.validTill);
      const today = new Date();
      if(validTill<today){
          return true;
      }
      return false;
  }

  const getDefaultPromotion=async() => {
      const data = await getApprovedPromotions();
      setLoading(false)
      if(data.length===0){
        return
      }
      const promotion = data.filter(checkVaildTill)[0]
      setPromotion(promotion);
  }

  useEffect(()=>{
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    if(id){
        getPromotion(id) 
    } else {
        getDefaultPromotion()
    }
  }, [location.search])


  return (
    <div className='flex flex-col lg:flex-row bg-zinc-100 dark:bg-slate-900 gap-4'>
      <div className='lg:w-1/5'>
        {loading &&(
                <div className="flex justify-center w-full h-screen items-center">
                    Loading Promotions ...
                </div>
            )}
        {Promotion &&<PreviousPromotions Promotion={Promotion}/>}
        {!Promotion && (
                <div className="flex justify-center w-full h-screen items-center">
                    No Promotions found ...
                </div>
            )}
      </div>

      <div className='w-full flex-col flex gap-8'>
        <div >
            {loading &&(
                <div className="flex justify-center w-full h-screen items-center">
                    Loading Promotion ...
                </div>
            )}
          {Promotion && <PromotionAnalysis Promotion={Promotion}/>}
          {!Promotion && (
                <div className="flex justify-center w-full h-screen items-center">
                    No Promotions found ...
                </div>
            )}
          
        </div>
        <hr className='w-full '/>
          <BusinessAnalysis/>
      </div>
    </div>
  )
}

export default Analytics;