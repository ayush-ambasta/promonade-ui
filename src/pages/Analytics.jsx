import React from 'react'
import { PreviousPromotions } from '@/components/PreviousPromotions';
import { ActivePromotions } from '@/components/ActivePromotions';
import PromotionAnalysis from '@/components/PromotionAnalysis';
import BusinessAnalysis from '@/components/BusinessAnalysis';

function Analytics(){
  return (
    <div className='flex flex-col lg:flex-row justify-between bg-zinc-100 gap-4'>
      <div>
        <PreviousPromotions/>
      </div>

      <div className='w-full lg:w-7/12 flex-col flex gap-8'>
        <PromotionAnalysis/>
          <hr className='w-full lg:w-[120%]'/>
        <BusinessAnalysis/>
      </div>
      
      <div className='w-full lg:w-1/5 mr-2 relative'>
        <ActivePromotions/>
      </div>
    </div>
  )
}

export default Analytics;