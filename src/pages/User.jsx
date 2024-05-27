import { Notification } from '@/components/Notification';
import {Team} from '@/components/Team';
import { TeamDetails } from '@/components/TeamDetails';
import { UserDetails } from '@/components/UserDetails';
import React from 'react'

function User(){
  return (
    <>
    <main className="bg-zinc-100 relative h-[120vh]">
      <div className='flex flex-col relative top-5 lg:flex-row items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8  lg:justify-between '>
        <div className="rounded-lg flex flex-col gap-4 pb-4 lg:gap-8 w-full lg:w-1/4 order-2 lg:order-1 bg-white">
          <Team/>
        </div>
        <div className="flex flex-col gap-4 lg:gap-8 w-full lg:w-2/4 order-3 lg:order-2">
          <UserDetails />
          <TeamDetails />
        </div>
        <div className="grid lg:w-1/4 auto-rows-max items-start gap-4 lg:gap-8 w-full order-1 lg:order-3">
          <Notification />
        </div>
      </div>
    </main>
    </>
  )
}

export default User;
