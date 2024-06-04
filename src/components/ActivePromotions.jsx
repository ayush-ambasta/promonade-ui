import React, { useContext, useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { convertToTitleCase, formatDateToISTWords, getDateString } from '@/lib/utils';
import { getApprovedPromotions } from '@/services/promotionsService';
import { Frown
} from "lucide-react"
import { PromotionCategoryIcon } from './PromoCategoryIcon';
import { Link } from 'react-router-dom';
import { getActivePromotions } from '@/services/analyticsService';


export const ActivePromotions = ({date}) => {
    const [promotions, setpromotions] = useState([]);
    useEffect(() => {
      const getPromotion=async() => {
      try{
        const from = getDateString(date.from)
        const to = getDateString(date.to)
        const data = await getActivePromotions(from, to);
        setpromotions(data);
      }catch(err){
        console.log(err)
        }
      }

      getPromotion();
    }, [])


  return (
    <div className="grid auto-rows-max items-start lg:w-[26%] lg:min-w-[26%] mt-6  gap-4 rounded-2xl lg:min-h-[80vh] bg-white shadow-sm lg:gap-8 ">
      <Card x-chunk="dashboard-07-chunk-3" className="rounded-2xl relative shadow-none border-none bg-inherit">
        <CardHeader className="pb-3">
          <CardTitle className="font-normal text-center text-xl text-red-700">Active Promotions</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
        {promotions.length === 0 ? <h4 className='text-sm text-slate-400'>
          <div className='flex flex-col justify-center items-center'>
            <br/>
            <Frown /><br/>No Active Promotions 
          </div> 
        </h4> :
        (
        <div className="overflow-x-auto">
        
            {promotions?.map((promo) => (
              <div key={promo?.id}
                className="flex bg-red-50 px-2 my-3 rounded-xl cursor-pointer items-center gap-3 py-1 text-muted-foreground transition-all hover:text-primary"
              >
                <Link to={"/analytics?id=" + promo.id}
                className="flex cursor-pointer justify-between items-center gap-3 rounded-lg  py-1 text-muted-foreground transition-all hover:text-primary"
                >
                <PromotionCategoryIcon category={promo.category} size={35} className="h-4 w-4 mx-2" />
                <div>
                  <h4 className='text-sm font-medium'>{promo?.name}</h4>
                  <div >
                    <h6 className='text-xs font-normal'>{convertToTitleCase(promo?.category)}</h6>
                    <h6 className='text-xs font-normal italic'>Ends on {formatDateToISTWords(promo?.validTill)}</h6>
                  </div>
                </div>
                </Link>
              </div>
            ))}
        </div>
        )}
        </CardContent>
      </Card>
    </div>
  )
}
