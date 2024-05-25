import React, { useContext, useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Modal from './Modal';
import { getNotApprovedPromotions,approvePromotion,disapprovePromotion } from '@/services/promotionsService';
import UserContext from '@/contexts/UserContext';
import { Button } from './ui/button';

import {
  RefreshCcw 
} from "lucide-react"



export const Notification = () => {

const {state} = useContext(UserContext);
const {user} = state?.user;
const [promotions, setPromotions] = useState([]);
const [selectedPromotion, setSelectedPromotion] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const [refresh, setrefresh] = useState(0);


const handleButtonClick = (promotion, action) => {
  setSelectedPromotion({ ...promotion, action });
  setIsModalOpen(true);
};
const getPromotion=async() => {
  const data = await getNotApprovedPromotions();
  setPromotions(data);
}

useEffect(() => {
  getPromotion();
}, [refresh])

const handleRefresh=()=>{
  setrefresh((refresh)=>refresh+1);
}

const closeModal = () => {
  setIsModalOpen(false);
  setSelectedPromotion(null);
};

const handleModalAction = async () => {
  try{
    if (selectedPromotion.action === 'accept') {
      await approvePromotion(selectedPromotion.id);
      alert('Promotion Accepted');
    } else if (selectedPromotion.action === 'decline') {
      await disapprovePromotion(selectedPromotion.id);
      alert('Promotion Declined');
    }
    setPromotions(promotions.filter(promo => promo?.id !== selectedPromotion?.id));
    closeModal();
  }catch(e){
    alert("Something went wrong");
  }
  
};

  return (
    <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
      <Card x-chunk="dashboard-07-chunk-3">
        <CardHeader className="p-4">
          <div className="flex items-baseline justify-between">
            <CardTitle>Notifications</CardTitle>
            <Button className="bg-transparent hover:bg-transparent" onClick={handleRefresh}><RefreshCcw size={16} color="#000000" /></Button>
          </div>
          <hr></hr>
        </CardHeader>
        <CardContent>
        {promotions.length === 0 ? <h2>No Notifications</h2> :
        (
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {promotions?.map((promotion) => (
                  <tr key={promotion?.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {promotion?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button 
                          className="bg-black text-white px-3 py-1 rounded text-xs" 
                          onClick={() => handleButtonClick(promotion, 'accept')}
                        >
                          Accept
                        </button>
                        <button 
                          className="bg-black text-white px-3 py-1 rounded text-xs" 
                          onClick={() => handleButtonClick(promotion, 'decline')}
                        >
                          Decline
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isModalOpen && selectedPromotion && (
            <Modal promotion={selectedPromotion} onClose={closeModal} onAction={handleModalAction} />
          )}
        </div>
        )}
        </CardContent>
      </Card>
    </div>
  )
}
