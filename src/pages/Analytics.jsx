import React from 'react'
import { PreviousPromotions } from '@/components/PreviousPromotions';
import { ActivePromotions } from '@/components/ActivePromotions';
import Analysis from '@/components/Analysis';

function Analytics(){
  return (
    <div className='flex justify-between bg-zinc-100'>
      <div>
        <PreviousPromotions/>
      </div>

      <div className='w-7/12'>
        <Analysis/>
      </div>
      
      <div className='w-1/5 mr-2 relative'>
        <ActivePromotions/>
      </div>
    </div>
  )
}

export default Analytics;