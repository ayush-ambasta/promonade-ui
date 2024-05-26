import React from 'react'
import { PromotionCategories } from '@/components/PromotionCategories';
import PromotionList from '@/components/PromotionList';

function Promotion(){
  return (
    <div className='flex'>
      <div>
        <PromotionCategories/>
      </div>

      <div className='w-3/4'>
        <PromotionList/>

      </div>
    </div>
  )
}

export default Promotion;
