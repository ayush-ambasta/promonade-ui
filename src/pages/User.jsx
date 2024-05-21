import { ActivePromotions } from '@/components/ActivePromotions';
import { Notification } from '@/components/Notification';
import { PreviousPromotions } from '@/components/PreviousPromotions';
import { TeamDetails } from '@/components/TeamDetails';
import { UserDetails } from '@/components/UserDetails';
import React from 'react'

function User(){
  return (
    <>
    <main className="flex flex-col lg:flex-row items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 my-1 lg:justify-between">
      <div className="flex flex-col gap-4 lg:gap-8 w-full lg:w-auto order-3 lg:order-1">
        <ActivePromotions />
        <PreviousPromotions />
      </div>
      <div className="flex flex-col gap-4 lg:gap-8 w-full lg:w-2/3 order-2 lg:order-2">
        <UserDetails />
        <TeamDetails />
      </div>
      <div className="grid auto-rows-max items-start gap-4 lg:gap-8 w-full lg:w-auto order-1 lg:order-3">
        <Notification />
      </div>
    </main>
    </>
  )
}

export default User;
