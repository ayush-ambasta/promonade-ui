import React, { useContext, useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getNotApprovedPromotions } from '@/services/promotionsService';
import { Button } from './ui/button';
import {
  Sheet,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  RefreshCcw,
  Frown,
  Smile
} from "lucide-react"
import { PromotionCategoryIcon } from './PromoCategoryIcon';
import { convertToTitleCase } from '@/lib/utils';
import AuditPromotion from './AuditPromotion';
import UserContext from '@/contexts/UserContext';

export const Notification = () => {
  const { state } = useContext(UserContext);
  const user = state.user;

  const [promotions, setPromotions] = useState([]);
  const [refresh, setrefresh] = useState(0);


const getPromotion=async() => {
  let data = await getNotApprovedPromotions();
  if(user.role==="MANAGER"){
    data = data.filter(promo=> promo.createdBy.username===user.username)
  }
  setPromotions(data);
  setPromotions([]);
  }

  useEffect(() => {
    getPromotion();
  }, [refresh])

  const handleRefresh=()=>{
    setrefresh((refresh)=>refresh+1);
  }

  return (
    <Sheet >
      <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
        <Card x-chunk="dashboard-07-chunk-3" className="border-0">
          <CardHeader className="p-4">
            <div className="flex items-baseline justify-between">
              <CardTitle className="font-normal text-xl py- text-slate-600"> Notifications</CardTitle>
              <Button className="bg-transparent hover:bg-transparent" onClick={handleRefresh}><RefreshCcw size={16} color="#000000" /></Button>
            </div>
            <hr></hr>
          </CardHeader>
          <CardContent>
          {promotions.length === 0 ? <h2 className=''>
          <div className='flex gap-3 justify-center mt-2 text-sm items-center'>
              {user.role==="OWNER" && (<><Frown /> No Promotion Approval Requests </>)}
              {user.role==="MANAGER" && (<><Smile /> No Pending Promotion Approvals </>)}
          </div> 
          </h2> :
          (
          <div>
            <div className="flex-1">
              <nav className="grid items-start font-medium ">
              {promotions?.map((promo) => (
                <div className='flex items-center justify-between' key={promo.id}>
                  <div className="flex text-sm cursor-pointer justify-start items-center gap-5 rounded-lg py-2 text-muted-foreground transition-all hover:text-primary">
                    <PromotionCategoryIcon category={promo.category} size={25} className="h-4 w-4 mx-2" />
                    <div>
                      <h4>{promo?.name}</h4>
                      <h6 className='text-xs font-normal'>{convertToTitleCase(promo?.category)}</h6>
                    </div>
                  </div>

                  <div>
                    <SheetTrigger className="bg-black text-white px-3 py-1 rounded text-xs" >Audit</SheetTrigger>
                    <AuditPromotion promotion={promo} setPromotions={setPromotions} promotions={promotions}/>
                  </div>
                </div>
                ))}
              </nav>
            </div>
          </div>
          )}
          </CardContent>
        </Card>
      </div>
    </Sheet>
  )
}
