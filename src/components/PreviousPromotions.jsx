import React, { useContext, useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { getApprovedPromotions } from '@/services/promotionsService';
import UserContext from '@/contexts/UserContext';

export const PreviousPromotions = () => {
    
    const {setteamName} = useContext(UserContext);
    const [promotions, setpromotions] = useState([]);
    const handleClick = (promo) => {
        // setteamName(`${promo.createdBy.team}`);
    };
    const checkVaildTill = (promo) =>{
        const validTill = new Date(promo?.validTill);
        const today = new Date();
        if(validTill<today){
            return true;
        }
        
        return false;
    }
    useEffect(() => {
      const getPromotion=async() => {
        const data = await getApprovedPromotions();
        setpromotions(data.filter(checkVaildTill));
      }
      getPromotion();
    }, []);

    
  return (
    <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
      <Card x-chunk="dashboard-07-chunk-3">
        <CardHeader>
          <CardTitle>Previous Promotions</CardTitle>
        </CardHeader>
        <CardContent>
        {promotions.length === 0 ? <h2>No Previous Promotions</h2> :
        (
        <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
            <thead>
            <tr>
                <th className="px-2 sm:px-4 py-2 border-b">Name</th>
                <th className="px-2 sm:px-4 py-2 border-b">Team</th>
            </tr>
            </thead>
            <tbody>
            {promotions?.map((promo) => (
                <tr key={promo.id} onClick={() => handleClick(promo)} className="cursor-pointer hover:bg-gray-100">
                <td className="px-2 sm:px-4 py-2 border-b text-center">{promo?.name}</td>
                <td className="px-2 sm:px-4 py-2 border-b text-center">{promo?.createdBy?.team}</td>
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
