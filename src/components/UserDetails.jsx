import React, { useContext } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import UserContext from '@/contexts/UserContext';


export const UserDetails = () => {
  const { state } = useContext(UserContext);
  const user = state.user;
  
  return (
    <Card x-chunk="dashboard-07-chunk-0">
        <CardHeader>
        <CardTitle>User Details</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Email
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user?.email}
                        </td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            username
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user?.username}
                        </td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Team
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user?.team}
                        </td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Role
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user?.role}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </CardContent>
    </Card>
  )
}
