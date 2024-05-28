import React from 'react'
import { PreviousPromotions } from '@/components/PreviousPromotions';
import { ActivePromotions } from '@/components/ActivePromotions';

function Analytics(){
  return (
    <div className='flex justify-between bg-zinc-100'>
      <div>
        <PreviousPromotions/>
      </div>

      <div></div>
      
      <div className='w-1/4 relative'>
        <ActivePromotions/>
      </div>
    </div>
  )
}

export default Analytics;