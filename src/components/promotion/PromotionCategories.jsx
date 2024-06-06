import React from 'react'
import { convertToTitleCase } from '@/lib/utils';
import { PromotionCategoryIcon } from './PromoCategoryIcon';

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"


export const PromotionCategories = ({defaultPromo, setDefaultPromo}) => {

  return (
    <div className="flex max-h-screen  flex-col lg:shadow-md lg:h-screen">
        <div className="flex flex-col items-center p-4 lg:px-6">
              <span className="font-normal text-xl dark:text-slate-300 text-slate-600">Promotion Categories</span>
              <hr className='mt-2.5 h-1 w-full'></hr>
        </div>
        <div className="flex-1 ">
            <nav className="grid pl-4 font-medium">
            <ToggleGroup className="flex-col lg:items-start" type="single" defaultValue={defaultPromo} onValueChange={(value) => setDefaultPromo(value)}>

                <ToggleGroupItem value="MILESTONE"  className=" text-left px-4 ">
                    <div className="flex cursor-pointer w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <PromotionCategoryIcon category={"MILESTONE"} size={25} className="h-4 w-4 mx-2" />
                        <h4>{convertToTitleCase("MILESTONE")} Promotions</h4>
                    </div>
                </ToggleGroupItem>
                
                <ToggleGroupItem value="REFERRAL"  className=" text-left px-4 ">
                    <div className="flex justify-between cursor-pointer w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <PromotionCategoryIcon category={"REFERRAL"} size={25} className="h-4 w-4 mx-2" />
                        <h4>{convertToTitleCase("REFERRAL")} Promotions</h4>
                    </div>
                </ToggleGroupItem>

                <ToggleGroupItem value="SEASONAL"  className=" text-left px-4 ">
                    <div className="flex justify-between cursor-pointer w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <PromotionCategoryIcon category={"SEASONAL"} size={25} className="h-4 w-4 mx-2" />
                        <h4>{convertToTitleCase("SEASONAL")} Promotions</h4>
                    </div>
                </ToggleGroupItem>

                <ToggleGroupItem value="LOYALTY"  className=" text-left px-4 ">
                    <div className="flex justify-between cursor-pointer w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <PromotionCategoryIcon category={"LOYALTY"} size={25} className="h-4 w-4 mx-2" />
                        <h4>{convertToTitleCase("LOYALTY")} Promotions</h4>
                    </div>
                </ToggleGroupItem>

                <ToggleGroupItem value="FLASHSALE"  className=" text-left px-4 ">
                    <div className="flex justify-between cursor-pointer w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <PromotionCategoryIcon category={"FLASHSALE"} size={25} className="h-4 w-4 mx-2" />
                        <h4>{convertToTitleCase("FLASHSALE")} Promotions</h4>
                    </div>
                </ToggleGroupItem>

                <ToggleGroupItem value="HIGHPURCHASE"  className=" text-left px-4 ">
                    <div className="flex justify-between cursor-pointer w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <PromotionCategoryIcon category={"HIGHPURCHASE"} size={25} className="h-4 w-4 mx-2" />
                        <h4>{convertToTitleCase("HIGHPURCHASE")} Promotions</h4>
                    </div>
                </ToggleGroupItem>

            </ToggleGroup>
            </nav>
        </div>
    </div>
  )
}
