import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PromotionCategoryIcon } from "./PromoCategoryIcon";
import { convertToTitleCase, formatDateToISTWords, convertToIndianDateObject } from "@/lib/utils";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Coins, Wallet, Banknote, PersonStanding, Gem, LampDesk
} from "lucide-react"
import { getPromotionById,getApprovedPromotions } from "@/services/promotionsService";
import { DatePickerWithRange } from "./DateRangePicker";
import { addDays, format } from "date-fns"
import { Button } from "./ui/button";
import AuditPromotion from "./AuditPromotion";
import {
    Sheet,
    SheetTrigger,
  } from "@/components/ui/sheet"

const PromotionAnalysis = () => {
    const location = useLocation();
    const [promotionRevenueData, setPromotionRevenueData] = useState([])
    const [Promotion, setPromotion] = useState(null)
    const [date, setDate] = useState({
        from: new Date(2024, 4, 20),
        to: addDays(new Date(2024, 5, 5), 30),
      })

    

    async function getPromotion(id){
        const promotion = await getPromotionById(id);
        setPromotion(promotion)
    }

    const checkVaildTill = (promo) =>{
        const validTill = new Date(promo?.validTill);
        const today = new Date();
        if(validTill<today){
            return true;
        }
        return false;
    }

    const getDefaultPromotion=async() => {
        const data = await getApprovedPromotions();
        setPromotion(data.filter(checkVaildTill)[0]);
    }

    function performAnalysis(){
        const validFrom = convertToIndianDateObject(Promotion.validFrom)
        const validTill = convertToIndianDateObject(Promotion.validTill)
        if(date.from>=validFrom && date.to<=validTill){
            console.log("Valid")
        } else {
            alert("Pick a Date Range within the validity period of the promotion.")
        }
    }

    const data = {
        dates: ["2024-04-25T08:18:02.260+00:00", "2024-04-26T08:18:02.260+00:00", "2024-04-27T08:18:02.260+00:00", "2024-04-28T08:18:02.260+00:00", "2024-04-29T08:18:02.260+00:00"],
        revenues: [500, 200, 250, 170, 400]
    }

    function reformatData(data){
        let newData = []
        for(var i=0; i<data.dates.length; i++){
            const formattedDate = formatDateToISTWords(data.dates[i]).split(',')[0]
            const split_date = formattedDate.split(' ')
            let temp = {
                date: split_date.pop() + " " + split_date.pop(),
                revenue: data.revenues[i]
            }
            newData.push(temp)
        }
        setPromotionRevenueData(newData)
    }

    useEffect(()=>{
        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.get('id');
        if(id){
            getPromotion(id) 
        } else {
            getDefaultPromotion()
        }
        reformatData(data)
    }, [location.search])

    return (
        <div className="mt-5 min-h-screen">
            {!Promotion &&(
                <div className="flex justify-center w-full h-screen items-center">
                    Loading Promotion ...
                </div>
            )}
            {Promotion && ( <>
            <div className="flex items-center mb-4">
                <h1  className=" p-3 font-normal text-sm text-slate-500"> Your Analytics For Promotion: &nbsp;&nbsp;&nbsp; <span className="text-2xl text-slate-700 font-normal">{Promotion.name} </span></h1>
                <PromotionCategoryIcon category={Promotion.category} size={35}/>
            </div>

            <div className="p-4 bg-white rounded-lg w-fit mx-auto flex items-center gap-5">
                <Sheet >
                    <h4 className="text-sm text-slate-600">Analysis Period</h4>
                    <DatePickerWithRange date={date} setDate={setDate} />
                    <Button className="h-8" onClick={performAnalysis}>Analyse</Button>
                    <SheetTrigger className="bg-slate-800 text-white rounded-lg text-sm px-3 p-2">Promotion Details</SheetTrigger>
                    <AuditPromotion promotion={Promotion} analytics={true}/>
                </Sheet>
            </div>

            <div className="flex-col mt-5">
                <div className="flex justify-around gap-3">
                    <div id="revenue-conversion-rate" className="flex bg-white rounded-2xl items-center gap-5 p-5 justify-around">
                        <div className="rounded-full bg-yellow-100 p-2">
                            <Coins/>
                        </div>
                        
                        <div className="flex-col ">
                            <h2 className="text-3xl mb-3">71%</h2>
                            <h4 className="text-xs font-medium text-slate-600">Revenue Conversion Rate</h4>
                        </div>
                    </div>
                    <div id="purchase-conversion-rate" className="flex bg-white rounded-2xl items-center gap-5 p-5 justify-around">
                        <div className="rounded-full bg-green-100 p-2">
                            <Wallet/>
                        </div>
                        
                        <div className="flex-col ">
                            <h2 className="text-3xl mb-3">58%</h2>
                            <h4 className="text-xs font-medium text-slate-600">Purchase Conversion Rate</h4>
                        </div>
                    </div>
                    <div id="promotion-conversion-rate" className="flex bg-white rounded-2xl items-center gap-5 p-5 justify-around">
                        <div className="rounded-full bg-blue-100 p-2">
                            <Banknote/>
                        </div>
                        
                        <div className="flex-col ">
                            <h2 className="text-3xl mb-3">21%</h2>
                            <h4 className="text-xs font-medium text-slate-600">Promotion Conversion Rate</h4>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-around gap-4">
                    
                    <div id="bar-graph-revenue-vs-time-promotion" className="bg-white rounded-2xl p-6 w-fit my-5">
                        <div className="p-4 pt-0">
                            <h3 className="text-slate-500 font-normal text-lg">Revenue Vs Time Analytics</h3>
                        </div>
                        <BarChart
                        className="text-xs"
                            width={430}
                            height={300}
                            data={promotionRevenueData}
                            maxBarSize={20}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                            >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip shared={false} trigger="click" />
                            <Legend />
                            <Bar dataKey="revenue" fill="#8884d8" />
                        </BarChart>
                    </div>
                    <div className="flex-col justify-around w-1/3" id="customer segments">
                        <div id="age-cat" className="flex bg-white my-3 rounded-2xl items-center gap-5 p-5 ">
                            <div className="rounded-full bg-yellow-100 p-2">
                                <LampDesk/>
                            </div>
                            
                            <div className="flex-col ">
                                <h2 className="text-3xl mb-3">71%</h2>
                                <h4 className="text-xs font-medium text-slate-600">Age Criteria Success Rate - {convertToTitleCase(Promotion.criteria.ageCategory)}</h4>
                            </div>
                        </div>
                        <div id="gender" className="flex bg-white my-3 rounded-2xl items-center gap-5 p-5 ">
                            <div className="rounded-full bg-green-100 p-2">
                                <PersonStanding/>
                            </div>
                            
                            <div className="flex-col ">
                                <h2 className="text-3xl mb-3">58%</h2>
                                <h4 className="text-xs font-medium text-slate-600">Gender Criteria Success Rate - {convertToTitleCase(Promotion.criteria.gender)}</h4>
                            </div>
                        </div>
                        <div id="marital-status" className="flex bg-white my-3 rounded-2xl items-center gap-5 p-5 ">
                            <div className="rounded-full bg-blue-100 p-2">
                                <Gem/>
                            </div>
                            
                            <div className="flex-col ">
                                <h2 className="text-3xl mb-3">21%</h2>
                                <h4 className="text-xs font-medium text-slate-600">Marital Status Criteria Success Rate - {convertToTitleCase(Promotion.criteria.maritalStatus)}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            </>)}
        </div>
    )
}

export default PromotionAnalysis;