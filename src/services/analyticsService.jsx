import axios from "axios";
import { BASE_URL } from ".";

export const getRevenueConversionRateOfPromotion = async (startDate, endDate, promotionId)=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.accessToken;
    try{
        const response = await axios(`${BASE_URL}/api/analytics/revenue-conversion-rate-with-promotion?start=${startDate}&end=${endDate}&promotionId=${promotionId}`,
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
        }
        alert('Error: ' + e.response.data.message);
    }
}

export const getPurchaseConversionRateOfPromotion = async (startDate, endDate, promotionId)=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.accessToken;
    try{
        const response = await axios(`${BASE_URL}/api/analytics/promotion-purchase-conversion-rate?start=${startDate}&end=${endDate}&promotionId=${promotionId}`,
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
        }
        alert('Error: ' + e.response.data.message);
    }
}

export const getPurchaseShareConversionRateOfPromotion = async (startDate, endDate, promotionId)=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.accessToken;
    try{
        const response = await axios(`${BASE_URL}/api/analytics/promotion-conversion-rate?start=${startDate}&end=${endDate}&promotionId=${promotionId}`,
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
        }
        alert('Error: ' + e.response.data.message);
    }
}

export const getAgeCriteriaSuccessRateOfPromotion = async (startDate, endDate, promotionId)=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.accessToken;
    try{
        const response = await axios(`${BASE_URL}/api/analytics/age-criteria-success-rate?start=${startDate}&end=${endDate}&promotionId=${promotionId}`,
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
        }
        alert('Error: ' + e.response.data.message);
    }
}

export const getGenderCriteriaSuccessRateOfPromotion = async (startDate, endDate, promotionId)=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.accessToken;
    try{
        const response = await axios(`${BASE_URL}/api/analytics/gender-criteria-success-rate?start=${startDate}&end=${endDate}&promotionId=${promotionId}`,
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
        }
        alert('Error: ' + e.response.data.message);
    }
}

export const getMaritalStatusCriteriaSuccessRateOfPromotion = async (startDate, endDate, promotionId)=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.accessToken;
    try{
        const response = await axios(`${BASE_URL}/api/analytics/maritalstatus-criteria-success-rate?start=${startDate}&end=${endDate}&promotionId=${promotionId}`,
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
        }
        alert('Error: ' + e.response.data.message);
    }
}

export const getRevenueVsDateForPromotion = async (startDate, endDate, promotionId)=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.accessToken;
    try{
        const response = await axios(`${BASE_URL}/api/analytics/promotion-revenue-by-date?start=${startDate}&end=${endDate}&promotionId=${promotionId}`,
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
        }
        alert('Error: ' + e.response.data.message);
    }
}

export const getLoginsVsDate = async (startDate, endDate)=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.accessToken;
    try{
        const response = await axios(`${BASE_URL}/api/analytics/login-frequency?start=${startDate}&end=${endDate}`,
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
        }
        alert('Error: ' + e.response.data.message);
    }
}

export const getRevenueVsDate = async (startDate, endDate)=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.accessToken;
    try{
        const response = await axios(`${BASE_URL}/api/analytics/revenue-by-date?start=${startDate}&end=${endDate}`,
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
        }
        alert('Error: ' + e.response.data.message);
    }
}

export const getPurchasesVsDate = async (startDate, endDate)=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.accessToken;
    try{
        const response = await axios(`${BASE_URL}/api/analytics/purchases-by-date?start=${startDate}&end=${endDate}`,
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
        }
        alert('Error: ' + e.response.data.message);
    }
}

export const getOverallPromotionConversionRate = async (startDate, endDate)=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.accessToken;
    try{
        const response = await axios(`${BASE_URL}/api/analytics/overall-promotion-conversion-rate?start=${startDate}&end=${endDate}`,
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
        }
        alert('Error: ' + e.response.data.message);
    }
}

export const getPurchaseConversionRate = async (startDate, endDate)=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.accessToken;
    try{
        const response = await axios(`${BASE_URL}/api/analytics/purchase-conversion-rate?start=${startDate}&end=${endDate}`,
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
        }
        alert('Error: ' + e.response.data.message);
    }
}

export const getPromotionTrendsPieChart = async (startDate, endDate)=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.accessToken;
    try{
        const response = await axios(`${BASE_URL}/api/analytics/promotion-pie-chart?start=${startDate}&end=${endDate}`,
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
        }
        alert('Error: ' + e.response.data.message);
    }
}