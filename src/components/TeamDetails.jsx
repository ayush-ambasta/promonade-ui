import React, { useContext, useEffect, useState } from 'react';
import { convertToTitleCase } from '@/lib/utils';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import UserContext from '@/contexts/UserContext';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { addUser, deleteUser, getByTeam } from '@/services/userService';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const teams = ["MILESTONE_PROMO_TEAM", "REFERRAL_PROMO_TEAM", "HIGHPURCHASE_PROMO_TEAM", "LOYALTY_PROMO_TEAM", "FLASHSALE_PROMO_TEAM", "SEASONAL_PROMO_TEAM"];
const roles = ["MANAGER", "OWNER"]

export const TeamDetails = () => {
  const {state,teamName} = useContext(UserContext);  
  const user = state?.user;
  const [team, setTeam] = useState();
  const defaultTeamName = user?.team;
  const [loading, setloading] = useState(true);
  const [key, setKey] = React.useState(+new Date())
  const [newMember, setNewMember] = useState({ name: '', username: '', password: '', email: '', role: '', team: user?.team });
  
  
  const getByTeamName = async ()=>{
    const teamname = teamName || defaultTeamName;
    try{
      const response = await getByTeam(teamname);
      setTeam(response);
      setloading(false);
    }catch(err){
      alert('Error: ' + err.message);
    }
    
  }
  
  useEffect(() => {
    getByTeamName();
  }, [teamName]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const handleRoleChange = (value) => {
    if(value==="MANAGER"){
      setKey(+new Date())
      handleTeamChange(user?.team)
    }
    setNewMember({ ...newMember, role: value });
  };

  const handleTeamChange = (value) => {
    newMember.team = value
    setNewMember(newMember);
  };

  const handleAddMember = async() => {
    console.log(newMember)
    if (!newMember.name || !newMember.username || !newMember.password || !newMember.email || !newMember.role || !newMember.team) {
      alert('All fields need to be filled.');
      return; // Exit the function early if any field is empty
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newMember.email)) {
        alert('Invalid email format.');
        return; // Exit the function early if email format is invalid
    }
    await addUser(newMember);
    getByTeamName(newMember.team);
  };

  const handleDelete = async (username) => {
    await deleteUser(username);
    
    setTeam(team.filter(member => member.username !== username));
  };

  if(loading){
    return <h2>Loading...</h2>
  }
  return (
    
      <Card x-chunk="dashboard-07-chunk-3" className="border-0">
        <CardHeader>
          <CardTitle className="font-normal text-2xl text-slate-700 mb-2">Team Details</CardTitle>
          
        </CardHeader>
        <CardContent>
        <div className="container mx-auto p-4 pt-0">
          <div className='flex justify-between items-center mb-6'>
            <h2 className='font-normal text-lg text-slate-800'>{(teamName && convertToTitleCase(teamName)) || (defaultTeamName && convertToTitleCase(defaultTeamName)) }</h2>
            <div className="flex justify-end ">
                {user.role === 'OWNER' && (
                <>
                    <Dialog>
                      <DialogTrigger className="bg-black text-white px-3 py-1 rounded text-xs mr-2">
                        Add Member
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="mb-4">Add Member</DialogTitle>
                          <div >
                              <div className="flex my-2 text-xs justify-between items-center">
                                <Label className="text-black font-normal">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    onChange={handleInputChange}
                                    className="text-xs w-2/5 py-2"
                                />
                              </div>
                              <div className="flex my-2 text-xs justify-between items-center">
                                <Label className="text-black font-normal">Username</Label>
                                <Input
                                    type="text"
                                    name="username"
                                    onChange={handleInputChange}
                                    className="text-xs w-2/5 py-2"                                />
                                </div>
                              <div className="flex my-2 text-xs justify-between items-center">
                                <Label className="text-black font-normal">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    onChange={handleInputChange}
                                    className="text-xs w-2/5 py-2"                                />
                              </div>
                              <div className="flex my-2 text-xs justify-between items-center">
                                <Label className="text-black font-normal">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    onChange={handleInputChange}
                                    className="text-xs w-2/5 py-2"                                />
                              </div>
                              <div className="flex my-2 text-xs justify-between items-center">
                                <Label className="text-black font-normal">Role</Label>
                                <Select
                                    name="role"
                                    onValueChange={handleRoleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                >
                                  <SelectTrigger className="w-2/5 text-xs">
                                      <SelectValue placeholder="Select Role" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {roles.map(role => (
                                      <SelectItem key={role} value={role}>{convertToTitleCase(role)}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="flex my-2 text-xs justify-between items-center">
                                <Label className="text-black font-normal">Team</Label>
                                <Select
                                    key={key}
                                    name="team"
                                    defaultValue={user?.team}
                                    onValueChange={handleTeamChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    disabled={newMember.role === 'MANAGER'}
                                >
                                  <SelectTrigger className="w-2/5 text-xs">
                                      <SelectValue placeholder="Select Team" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {teams.map(team => (
                                      <SelectItem key={team} value={team}>{convertToTitleCase(team)}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="flex justify-center">
                                <DialogClose asChild>
                                  <Button className="h-8 w-3/12 self-center mt-4" onClick={handleAddMember}>Add</Button>
                                </DialogClose>
                                
                              </div>
                          </div>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                </>
                )}
            </div>
          </div>
          {
            team.length>0 ?
          
            (<table className="min-w-full bg-white border">
                <thead>
                <tr className='border'>
                    <th className="py-2 text-xs">Username</th>
                    <th className="py-2 text-xs">Name</th>
                    <th className="py-2 text-xs">Email</th>
                    <th className="py-2 text-xs">Role</th>
                    {user.role === 'OWNER' && user?.team===team[0]?.team && <th className="py-2 text-xs">Actions</th>}
                </tr>
                </thead>
                <tbody>
                
                  {team.map(member => (
                      <tr key={member.username} className="text-center border">
                      <td className="py-2 text-xs">{member.username}</td>
                      <td className="py-2 text-xs">{member.name}</td>
                      <td className="py-2 text-xs">{member.email}</td>
                      <td className="py-2 text-xs">{convertToTitleCase(member.role)}</td>
                      {user.role === 'OWNER' && (
                          <td className="py-2">
                            
                          {member.role !== 'OWNER' && user?.team === member?.team && (
                            <AlertDialog>
                              <AlertDialogTrigger  className="bg-black text-white px-3 py-1 rounded text-xs">Delete</AlertDialogTrigger>

                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the user "{member.name}". Are you sure?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(member.username)}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                              </AlertDialog>
                          )}
                          </td>
                      )}
                      </tr>
                  ))}
                </tbody>
                
            </table>):
            (
              <div className='text-center text-sm'>
                There are no members.
              </div>
            )
            
          }
        </div>
        </CardContent>
      </Card>
    
  );
};


