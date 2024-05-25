import { Notification } from '@/components/Notification';
import {Team} from '@/components/Team';
import { TeamDetails } from '@/components/TeamDetails';
import { UserDetails } from '@/components/UserDetails';
import React from 'react'

function User(){
  return (
    <>
    <main className="flex flex-col lg:flex-row mt-6 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 my-1 lg:justify-between">
      <div className="rounded-lg basis-1/4 flex flex-col gap-4 pb-4 lg:gap-8 w-full lg:w-auto order-2 lg:order-1 border">
        <Team/>
      </div>
      <div className="flex flex-col gap-4 lg:gap-8 w-full lg:w-2/3 order-3 lg:order-2">
        <UserDetails />
        <TeamDetails />
      </div>
      <div className="grid basis-1/4 auto-rows-max items-start gap-4 lg:gap-8 w-full lg:w-auto order-1 lg:order-3">
        <Notification />
      </div>
    </main>
    </>
  )
}

export default User;
