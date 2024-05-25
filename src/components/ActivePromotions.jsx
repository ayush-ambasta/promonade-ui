import React, { useContext, useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { getApprovedPromotions } from '@/services/promotionsService';
import UserContext from '@/contexts/UserContext';
import { Frown
} from "lucide-react"



export const ActivePromotions = () => {
    const {setteamName} = useContext(UserContext);
    const [promotions, setpromotions] = useState([]);
    const handleClick = (promo) => {
        // setteamName(`${promo.createdBy.team}`);
    };
    useEffect(() => {
      const getPromotion=async() => {
        const data = await getApprovedPromotions();
        setpromotions(data.filter(promo=>promo.active));
      }
      getPromotion();
    }, [])

    
  return (
    <div className="grid auto-rows-max items-start mr-10 mt-10 gap-4 rounded-3xl bg-white shadow-sm lg:gap-8">
      <Card x-chunk="dashboard-07-chunk-3" className="shadow-none border-none bg-inherit">
        <CardHeader>
          <CardTitle className="font-normal text-xl py- text-slate-600">Active Promotions</CardTitle>
        </CardHeader>
        <CardContent>
        {promotions.length === 0 ? <h4 className='text-sm text-slate-400'>
          <div className='flex flex-col justify-center items-center'>
            <br/>
            <Frown /><br/>No Active Promotions 
          </div> 
        </h4> :
        (
        <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
            <thead>
            <tr>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Team</th>
            </tr>
            </thead>
            <tbody>
            {promotions?.map((promo) => (
                <tr key={promo?.id} onClick={() => handleClick(promo)} className="cursor-pointer hover:bg-gray-100">
                <td className="px-4 py-2 border-b text-center">{promo?.name}</td>
                <td className="px-4 py-2 border-b text-center">{promo?.createdBy?.team}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
        )}
        </CardContent>
      </Card>
    </div>
  )
}
