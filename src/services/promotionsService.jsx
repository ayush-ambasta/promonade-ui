import axios from "axios";
import { BASE_URL } from ".";


export const getApprovedPromotions = async ()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.accessToken;
    try{
        const response = await axios(`${BASE_URL}/api/promotions/get-approved`,
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
        }else{
            throw new Error("Error");
        }
        
    }catch(e){
        alert('Error: ' + e.response.data.message);
    }
}

export const getAllPromotions = async() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.accessToken;
    try{
        const response = await axios(`${BASE_URL}/api/promotions`,
            {
                method: 'GET',
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            }
        )
        if(response.status==200){
            return response.data;
        }else{
            throw new Error("Error");
        }
    }
    catch(e){
        alert('Error: ' + e.response.data.message);
    }
}

export const getNotApprovedPromotions = async ()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.accessToken;
    try{
        const response = await axios(`${BASE_URL}/api/promotions/get-non-approved-user-team`,
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
        }else{
            throw new Error("Error");
        }
        
    }catch(e){
        alert('Error: ' + e.response.data.message);
    }
}

export const approvePromotion = async (id)=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.accessToken;
    try{
        const response = await axios(`${BASE_URL}/api/promotions/approve-promotion?id=${id}`,
            {
                method: 'POST',
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                
            }
        );
        
        if(response.status==200){
            return response.data;
        }else{
            throw new Error("Error");
        }
        
    }catch(e){
        alert('Error: ' + e.response.data.message);
    }
}

export const disapprovePromotion = async (id)=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.accessToken;
    try{
        const response = await axios(`${BASE_URL}/api/promotions/disapprove-promotion?id=${id}`,
            {
                method: 'POST',
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                
            }
        );
        
        if(response.status==200){
            return response.data;
        }else{
            throw new Error("Error");
        }
        
    }catch(e){
        alert('Error: ' + e.response.data.message);
    }
}


export const deletePromotion = async (id)=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.accessToken;
    try{
        const response = await axios(`${BASE_URL}/api/promotions/delete/${id}`,
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
        }else{
            throw new Error("Error");
        }
        
    }catch(e){
        alert('Error: ' + e.response.data.message);
    }
}


export const editPromotion = async (id, promotionChanges)=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.accessToken;
    try{
        const response = await axios(`${BASE_URL}/api/promotions/${id}`,
            {
                method: 'PATCH',
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                data: JSON.stringify(promotionChanges)
                
            }
        );
        
        if(response.status==200){
            return response.data;
        }else{
            throw new Error("Error");
        }
        
    }catch(e){
        alert('Error: ' + e.response.data.message);
    }
}


export const createPromotion = async (promotion)=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.accessToken;
    try{
        const response = await axios(`${BASE_URL}/api/promotions/create`,
            {
                method: 'POST',
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                data: JSON.stringify(promotion)
                
            }
        );
        
        if(response.status==200){
            return response.data;
        }else{
            throw new Error("Error");
        }
        
    }catch(e){
        alert('Error: ' + e.response.data.message);
    }
}

export const getPromotionById = async (id)=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.accessToken;
    try{
        const response = await axios(`${BASE_URL}/api/promotions/${id}`,
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
        }else{
            throw new Error("Error");
        }
        
    }catch(e){
        alert('Error: ' + e.response.data.message);
    }
}
