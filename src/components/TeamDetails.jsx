import React, { useContext, useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import UserContext from '@/contexts/UserContext';
import { addUser, deleteUser, getByTeam } from '@/services/userService';

const teams = ["MILESTONE_PROMO_TEAM", "REFERRAL_PROMO_TEAM", "HIGHPURCHASE_PROMO_TEAM", "LOYALTY_PROMO_TEAM", "FLASHSALE_PROMO_TEAM", "SEASONAL_PROMO_TEAM"];

export const TeamDetails = () => {
  const {state,teamName} = useContext(UserContext);  
  const user = state?.user;
  const [team, setTeam] = useState();
  const defaultTeamName = user?.team;
  const [loading, setloading] = useState(true);
  const [isManagerModalOpen, setIsManagerModalOpen] = useState(false);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', username: '', password: '', email: '', role: '', team: '' });
  
  
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

  const openManagerModal = () => {
    setNewMember({ ...newMember, role: 'MANAGER', team: user.team });
    setIsManagerModalOpen(true);
  };

  const openOwnerModal = () => {
    setNewMember({ ...newMember, role: 'OWNER' });
    setIsOwnerModalOpen(true);
  };

  const closeModal = () => {
    setIsManagerModalOpen(false);
    setIsOwnerModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setNewMember({ ...newMember, [name]: value });
  };

  const handleAddMember = async() => {
    await addUser(newMember);
    getByTeamName(newMember.team);
    closeModal();
  };

  const handleDelete = async (username) => {
    await deleteUser(username);
    setTeam(team.filter(member => member.username !== username));
  };

  if(loading){
    return <h2>Loading...</h2>
  }
  return (
    
      <Card x-chunk="dashboard-07-chunk-3">
        <CardHeader>
          <CardTitle>Team Details</CardTitle>
          
        </CardHeader>
        <CardContent>
        <div className="container mx-auto p-4">
        <h2 className='font-bold'>{teamName || defaultTeamName}</h2>
        <div className="flex justify-end mb-4">
            {user.role === 'OWNER' && (
            <>
                <button onClick={openManagerModal} className="bg-black text-white px-3 py-1 rounded text-xs mr-2">Add Manager</button>
                <button onClick={openOwnerModal} className="bg-black text-white px-3 py-1 rounded text-xs">Add Owner</button>
            </>
            )}
        </div>

        <table className="min-w-full bg-white border">
            <thead>
            <tr className='border'>
                <th className="py-2">Username</th>
                <th className="py-2">Email</th>
                <th className="py-2">Role</th>
                {user.role === 'OWNER' && user?.team===team[0]?.team && <th className="py-2">Actions</th>}
            </tr>
            </thead>
            <tbody>
            {team.map(member => (
                <tr key={member.username} className="text-center border">
                <td className="py-2">{member.username}</td>
                <td className="py-2">{member.email}</td>
                <td className="py-2">{member.role}</td>
                {user.role === 'OWNER' && (
                    <td className="py-2">
                    {member.role !== 'OWNER' && user?.team === member?.team && (
                        <button onClick={() => handleDelete(member.username)} className="bg-black text-white px-3 py-1 rounded text-xs">Delete</button>
                    )}
                    </td>
                )}
                </tr>
            ))}
            </tbody>
        </table>

        {isManagerModalOpen || isOwnerModalOpen ? (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {newMember.role === 'MANAGER' ? 'Add Manager' : 'Add Owner'}
                </h3>
                <button onClick={closeModal} className="bg-black text-white px-3 py-1 rounded text-xs">
                    <span className="text-xl">&times;</span>
                </button>
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input
                    type="text"
                    name="name"
                    value={newMember.name}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                <input
                    type="text"
                    name="username"
                    value={newMember.username}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input
                    type="password"
                    name="password"
                    value={newMember.password}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                    type="email"
                    name="email"
                    value={newMember.email}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
                <input
                    type="text"
                    name="role"
                    value={newMember.role}
                    readOnly
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                />
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Team</label>
                <select
                    name="team"
                    value={newMember.team}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    disabled={newMember.role === 'MANAGER'}
                >
                    <option value="">Select An option</option>
                    {teams.map(team => (
                    <option key={team} value={team}>{team}</option>
                    ))}
                </select>
                </div>
                <div className="flex justify-end">
                <button onClick={handleAddMember} className="bg-black text-white px-3 py-1 rounded text-xs mr-2">Add</button>
                <button onClick={closeModal} className="bg-black text-white px-3 py-1 rounded text-xs">Cancel</button>
                </div>
            </div>
            </div>
        ) : null}
        </div>
        </CardContent>
      </Card>
    
  );
};


