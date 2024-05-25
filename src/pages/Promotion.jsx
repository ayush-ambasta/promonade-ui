import React from 'react'
import { PreviousPromotions } from '@/components/PreviousPromotions';
import { ActivePromotions } from '@/components/ActivePromotions';

function Promotion(){
  return (
    <div className='flex justify-between bg-zinc-50'>
      <div>
        <PreviousPromotions/>
      </div>

      <div></div>
      
      <div>
        <ActivePromotions/>
      </div>
    </div>
  )
}

export default Promotion;
