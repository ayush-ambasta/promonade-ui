import axios from "axios";
import { BASE_URL } from ".";


export const login = async (username,password)=>{
    const post={username,password};
    try{
        const response = await axios(`${BASE_URL}/api/auth/signin`,
            {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                data: JSON.stringify(post)
            }
        );
        
        if(response.status==200){
            
            return response.data;
        }
        
    }catch(e){
        alert('Error: ' + e.response.data.message);
        // console.error(e);
    }
}

export const getByTeam = async (teamName)=>{
    
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.accessToken;
    
    try{
        const response = await axios(`${BASE_URL}/api/user/team-users?team=${teamName}`, //check gender?
            {
                method: 'GET',
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                
            }
        );
        
        if(response.status==200){
            return response.data;
        }
        
        
    }catch(e){
        alert('Error: ' + e.response.data.message);
    }
}

export const addUser = async (post)=>{
    // console.log(post);s
    try{
        const response = await axios(`${BASE_URL}/api/auth/signup`,
            {
                method: 'POST',
                headers: { 
                    "Content-Type": "application/json",
                    
                },
                data: JSON.stringify(post)
            }
        );
        
        if(response.status==200){
            return response.data;
        }
        
    }catch(e){
        alert('Error: ' + e.response.data.message);
    }
}

export const deleteUser = async (username)=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.accessToken;
    
    try{
        const response = await axios(`${BASE_URL}/api/user/delete/${username}`,
            {
                method: 'DELETE',
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            }
        );
        
        if(response.status==200){
            return response.data;
        }
        
    }catch(e){
        alert('Error: ' + e.response.data.message);
    }
}

export const testUserToken = async ()=>{
    
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.accessToken;
    
    try{
        const response = await axios(`${BASE_URL}/api/auth/test-token`, //check gender?
            {
                method: 'GET',
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                
            }
        );
        
        if(response.status==200){
            return response.data;
        }
        
        
    }catch(e){
        if(e.response.data.message==="SESSION_EXPIRED"){
            throw new Error("SESSION_EXPIRED");
        } else {
            alert('Error: ' + e.response.data.message);
        }
        
    }
}