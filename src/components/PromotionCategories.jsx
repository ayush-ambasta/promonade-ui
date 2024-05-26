import React, { useContext, useEffect, useState } from 'react'
import { convertToTitleCase, convertToSnakeCase } from '@/lib/utils';
import { PromotionCategoryIcon } from './PromoCategoryIcon';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"





export const PromotionCategories = () => {

  return (
    <div className="grid auto-rows-max items-start gap-4 bg-white lg:gap-8 min-h-screen border-r-[1px] border-solid border-grey ">
      <Card x-chunk="dashboard-07-chunk-3 " className="shadow-none rounded-none border-none bg-inherit">
        <CardHeader>
          <CardTitle className="font-normal text-xl py- text-slate-600">Promotion Categories</CardTitle>
        </CardHeader>

        
        <CardContent className="px-0">
  
          <div className="flex-1 ">
            <nav className="grid pl-4 font-medium  ">
            <ToggleGroup className="flex-col items-start" type="single">

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
        </CardContent>
      </Card>
    </div>
  )
}
