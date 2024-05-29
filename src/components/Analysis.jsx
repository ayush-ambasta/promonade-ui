import { useEffect, useState } from "react";
import { PromotionCategoryIcon } from "./PromoCategoryIcon";
import { convertToTitleCase, formatDate } from "@/lib/utils";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Coins, Wallet, Banknote, PersonStanding, Gem, LampDesk
} from "lucide-react"

const Analysis = () => {
    const [Promotion, setPromotion] = useState({
        active: false,
        approved:true,
        category: "MILESTONE",
        createdAt: "2024-05-26T08:59:37.530+00:00",
        createdBy: {userId: 1, username: 'jeevika', name: 'Jeevika Iqbal', email: 'jeevikaiqbal@gmail.com', role: 'OWNER'},
        criteria: {id: 1, ageCategory: 'YOUNGADULT', maritalStatus: 'SINGLE', gender: 'MALE', productType: 'SPORTS'},
        decline: false,
        id: 1,
        name: "100 Successful years",
        promotionType: "DISCOUNT",
        validFrom: "2024-05-10T07:32:00.000+00:00",
        validTill: "2024-05-10T07:33:00.000+00:00"
    })

    const data = {
        dates: ["2024-04-25T08:18:02.260+00:00", "2024-04-26T08:18:02.260+00:00", "2024-04-27T08:18:02.260+00:00", "2024-04-28T08:18:02.260+00:00", "2024-04-29T08:18:02.260+00:00"],
        revenues: [500, 200, 250, 170, 400]
    }

    const [promotionRevenueData, setPromotionRevenueData] = useState([])

    function reformatData(data){
        let newData = []
        for(var i=0; i<data.dates.length; i++){
            const formattedDate = formatDate(data.dates[i]).split(',')[0]
            const split_date = formattedDate.split(' ')
            let temp = {
                date: split_date.pop() + " " + split_date.pop(),
                revenue: data.revenues[i]
            }
            newData.push(temp)
        }
        console.log(newData)
        setPromotionRevenueData(newData)
    }

    useEffect(()=>{
        reformatData(data)
    }, [])

    return (
        <div className="mt-5">
            <div className="flex items-center mb-4">
                <h1  className=" p-3 font-normal text-sm text-slate-500"> Your Analytics For Promotion: &nbsp;&nbsp;&nbsp; <span className="text-2xl text-slate-700 font-normal">{Promotion.name} </span></h1>
                <PromotionCategoryIcon category={Promotion.category} size={35}/>
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
                <div className="flex items-center justify-around ">
                    
                    <div id="bar-graph-revenue-vs-time" className="bg-white rounded-2xl p-6 w-fit my-5">
                        <div className="p-4 pt-0">
                            <h3 className="text-slate-500 font-normal text-lg">Revenue Vs Time Analytics</h3>
                        </div>
                        <BarChart
                            width={430}
                            height={300}
                            data={promotionRevenueData}
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
        </div>
    )
}

export default Analysis;