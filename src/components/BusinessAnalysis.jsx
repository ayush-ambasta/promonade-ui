import { useContext, useEffect, useState } from "react";
import { getDateString } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
LineChart, Line, PieChart, Pie, PolarGrid
} from 'recharts';
import { Wallet, Banknote, BriefcaseBusiness, Info
} from "lucide-react"
import {
    Tooltip as DescribeToolTip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip" 
import { DatePickerWithRange } from "./DateRangePicker";
import { addDays, format } from "date-fns"
import { Button } from "./ui/button";
import { useMediaQuery } from "react-responsive";
import { getLoginsVsDate, getRevenueVsDate, getOverallPromotionConversionRate, getPromotionTrendsPieChart, getPurchaseConversionRate, getPurchasesVsDate } from "@/services/analyticsService";


const BusinessAnalysis = () => {
    
    const [purchaseConversionRate, setPurchaseConversionRate] = useState(0);
    const [promotionConversionRate, setPromotionConversionRate] = useState(0);
    const [businessRevenueData, setBusinessRevenueData] = useState([])
    const [businessPurchaseData, setBusinessPurchaseData] = useState([])
    const [businessLoginData, setBusinessLoginData] = useState([])
    const [businessPromotionShares, setBusinessPromotionShares] = useState([])

    const isSmallScreen = useMediaQuery({ maxWidth: 767 });
    const isLargeScreen = useMediaQuery({ minWidth: 768 });
    
    const [date, setDate] = useState({
        from: new Date(2024, 3, 25),
        to: addDays(new Date(2024, 3, 29), 0),
      })


    function performAnalysis(){
        getData("PURCHASECONVERSIONRATE")
        getData("REVENUEVSTIME")
        getData("PROMOTIONCONVERSIONRATE")
        getData("LOGINVSTIME")
        getData("PURCHASESVSTIME")
        getData("PROMOTIONTRENDS")
    }

    async function getData(type, promotionId){
        const startDate = getDateString(date.from)
        const endDate = getDateString(date.to)
        let data
        try{
            switch(type){
                case "REVENUEVSTIME":
                    data = await getRevenueVsDate(startDate, endDate, promotionId)
                    setBusinessRevenueData(data)
                    return
                case "PURCHASECONVERSIONRATE":
                    data = await getPurchaseConversionRate(startDate, endDate, promotionId)
                    setPurchaseConversionRate(data.conversionRate)
                    return
                case "PROMOTIONCONVERSIONRATE":
                    data = await getOverallPromotionConversionRate(startDate, endDate, promotionId)
                    setPromotionConversionRate(data.conversionRate)
                    return
                case "LOGINVSTIME":
                    data = await getLoginsVsDate(startDate, endDate, promotionId)
                    setBusinessLoginData(data)
                    return
                case "PURCHASESVSTIME":
                    data = await getPurchasesVsDate(startDate, endDate, promotionId)
                    setBusinessPurchaseData(data)
                    return
                case "PROMOTIONTRENDS":
                    data = await getPromotionTrendsPieChart(startDate, endDate, promotionId)
    
                    setBusinessPromotionShares(data)
                    return
                default:
                    return
            }
        }catch(err){
            console.log(err)
        }
        
    }

    useEffect(()=>{
        performAnalysis()
    }, [])


    return (
        <div className="my-3 mx-5">
            <div className="flex items-center my-4 mt-0">
                <h1  className=" p-3 font-normal text-sm text-slate-500"> Your Analytics For:   <span className=" lg:ml-5 lg:text-2xl text-slate-700 font-normal">Your  Business </span></h1>
                <BriefcaseBusiness size={35}/>
            </div>
            <div className="p-4 bg-white rounded-lg w-full lg:w-fit mx-auto flex flex-col lg:flex-row items-center gap-5">
                <h4 className="text-sm text-slate-600">Analysis Period</h4>
                <DatePickerWithRange date={date} setDate={setDate} />
                <Button className="h-8" onClick={performAnalysis}>Analyse</Button>
            </div>
            <TooltipProvider>
            <div className="mt-5">
                <div className="flex flex-col lg:flex-row justify-around items-center">
                    <div id="line-graph-logins-vs-time" className="bg-white relative rounded-2xl p-6 w-fit my-5">
                        <div className="absolute top-2 right-3">
                            <DescribeToolTip>
                                <TooltipTrigger>
                                    <Info size={15}/>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Visualization of the total customer logins over time</p>
                                </TooltipContent>
                            </DescribeToolTip>
                        </div>
                        <div className="p-4 pt-0">
                            <h3 className="text-slate-500 font-normal text-lg">Logins Vs Time Analytics</h3>
                        </div>
                        
                        <LineChart width={340} height={200} data={businessLoginData} className="text-xs" >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="logins" stroke="#c7ca1c" />
                        </LineChart>
                    </div>
                    <div id="piechart-promotions" className="bg-white relative rounded-2xl p-6 w-fit my-5">
                        <div className="absolute top-2 right-3">
                            <DescribeToolTip>
                                <TooltipTrigger>
                                    <Info size={15}/>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Visualization of the number of purchases made with each promotion</p>
                                </TooltipContent>
                            </DescribeToolTip>
                        </div>
                        <div className="p-4 pt-0">
                            <h3 className="text-slate-500 font-normal text-lg">Promotions Usage</h3>
                        </div>
                        <PieChart width={200} height={200}>
                            <Tooltip />
                            <Pie data={businessPromotionShares} dataKey="frequency" nameKey="promotionName" cx="50%" cy="50%" outerRadius={70} fill="#f2ca9d" label/>
                        </PieChart>
                    </div>
                    <div className="flex flex-col gap-3 w-full lg:w-fit">
                        <div id="purchase-conversion-rate" className="flex relative h-2/5 bg-white rounded-2xl items-center gap-5 p-5 justify-around">
                            <div className="absolute top-2 right-3">
                                <DescribeToolTip>
                                    <TooltipTrigger>
                                        <Info size={15}/>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Percentage of the total number of purchases to the number of logins</p>
                                    </TooltipContent>
                                </DescribeToolTip>
                            </div>
                            <div className="rounded-full bg-green-100 p-2">
                                <Wallet/>
                            </div>
                            
                            <div className="flex-col ">
                                <h2 className="text-3xl mb-3">{purchaseConversionRate}%</h2>
                                <h4 className="text-xs font-medium text-slate-600">Purchase Conversion Rate</h4>
                            </div>
                        </div>
                        <div id="promotion-conversion-rate" className="flex relative h-2/5 bg-white rounded-2xl items-center gap-5 p-5 justify-around">
                            <div className="absolute top-2 right-3">
                                <DescribeToolTip>
                                    <TooltipTrigger>
                                        <Info size={15}/>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Percentage of purchases made with any promotion to total purchases</p>
                                    </TooltipContent>
                                </DescribeToolTip>
                            </div>
                            <div className="rounded-full bg-blue-100 p-2">
                                <Banknote/>
                            </div>
                            
                            <div className="flex-col ">
                                <h2 className="text-3xl mb-3">{promotionConversionRate}%</h2>
                                <h4 className="text-xs font-medium text-slate-600">Promotion Conversion Rate</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-around gap-8 items-center">
                    <div id="bar-graph-revenue-vs-time" className="bg-white relative rounded-2xl p-6 w-fit my-5">
                        <div className="absolute top-2 right-3">
                            <DescribeToolTip>
                                <TooltipTrigger>
                                    <Info size={15}/>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Visualization of the total business revenue over time</p>
                                </TooltipContent>
                            </DescribeToolTip>
                        </div>
                        <div className="p-4 pt-0">
                            <h3 className="text-slate-500 font-normal text-lg">Revenue Vs Time Analytics</h3>
                        </div>
                        <BarChart
                            className="text-xs"
                                width={isSmallScreen ? 300 : isLargeScreen ? 400 : 650}
                                height={isSmallScreen ? 200 : isLargeScreen ? 300 : 650}
                                data={businessRevenueData}
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
                            <Bar dataKey="revenue" fill="#f884d8" />
                        </BarChart>
                    </div>
                    <div id="line-graph-purchases-vs-time" className="bg-white relative rounded-2xl p-6 w-fit my-5">
                        <div className="absolute top-2 right-3">
                            <DescribeToolTip>
                                <TooltipTrigger>
                                    <Info size={15}/>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Visualization of the total number of purchases over time</p>
                                </TooltipContent>
                            </DescribeToolTip>
                        </div>
                        <div className="p-4 pt-0">
                            <h3 className="text-slate-500 font-normal text-lg">Purchases Vs Time Analytics</h3>
                        </div>
                        <LineChart width={isSmallScreen ? 300 : isLargeScreen ? 400 : 650}
                            height={isSmallScreen ? 200 : isLargeScreen ? 300 : 650}
                            data={businessPurchaseData} className="text-xs" >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="purchases" stroke="green" />
                        </LineChart>
                    </div>
                </div>
            </div>
            </TooltipProvider>
        </div>
    )
}

export default BusinessAnalysis

