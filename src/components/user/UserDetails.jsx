import React, { useContext } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { convertToTitleCase } from '@/lib/utils';
import UserContext from '@/contexts/UserContext';
import {CircleUserRound} from "lucide-react"


export const UserDetails = () => {
  const { state } = useContext(UserContext);
  const user = state.user;
  
  return (
    <Card x-chunk="dashboard-07-chunk-0" className="border-0">
        <CardHeader>
        <CardTitle>
            <div className='flex justify-start gap-3 items-center text-3xl font-normal text-gray-700 dark:text-slate-300'>
                <CircleUserRound size={40}/> User Details
            </div>
        </CardTitle>
        </CardHeader>
        <CardContent >
        <div className="overflow-x-auto ">
            <table className="min-w-full  divide-y divide-gray-200">
                <tbody className="bg-white dark:bg-slate-950 divide-y divide-gray-200">
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-gray-300 text-gray-900">
                            Email
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-gray-400 text-gray-500">
                            {user?.email}
                        </td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-gray-300 font-medium text-gray-900">
                            Username
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-gray-400 text-gray-500">
                            {user?.username}
                        </td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-gray-300 font-medium text-gray-900">
                            Team
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-gray-400 text-gray-500">
                            {convertToTitleCase(user?.team)}
                        </td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-gray-300 font-medium text-gray-900">
                            Role
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-gray-400 text-gray-500">
                            {convertToTitleCase(user?.role)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </CardContent>
    </Card>
  )
}
