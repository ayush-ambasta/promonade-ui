import { useEffect, useState } from "react";
import { PromotionCategoryIcon } from "./PromoCategoryIcon";
import { convertToTitleCase, getDateString } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
    Tooltip as DescribeToolTip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"  
import { Coins, Wallet, Banknote, PersonStanding, Gem, LampDesk, Info
} from "lucide-react"
import { DatePickerWithRange } from "./DateRangePicker";
import { addDays, format } from "date-fns"
import { Button } from "./ui/button";
import AuditPromotion from "./AuditPromotion";
import { useMediaQuery } from "react-responsive";
import {
    Sheet,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { getAgeCriteriaSuccessRateOfPromotion, getGenderCriteriaSuccessRateOfPromotion, getMaritalStatusCriteriaSuccessRateOfPromotion, getPurchaseConversionRate, getPurchaseConversionRateOfPromotion, getPurchaseShareConversionRateOfPromotion, getRevenueConversionRateOfPromotion, getRevenueVsDateForPromotion } from "@/services/analyticsService";

const PromotionAnalysis = ({Promotion}) => {
    const isSmallScreen = useMediaQuery({ maxWidth: 767 });
    const isLargeScreen = useMediaQuery({ minWidth: 768 });

    const [promotionRevenueData, setPromotionRevenueData] = useState([])
    const [revenueConversionRate, setRevenueConversionRate] = useState(0);
    const [purchaseConversionRate, setPurchaseConversionRate] = useState(0);
    const [promotionConversionRate, setPromotionConversionRate] = useState(0);
    const [ageSuccessRate, setAgeSuccessConversionRate] = useState(0);
    const [maritalStatusSuccessRate, setMaritalStatusSuccessConversionRate] = useState(0);
    const [genderSuccessRate, setGenderSuccessConversionRate] = useState(0);
    
    const [date, setDate] = useState({
        from: new Date(2024, 3, 25),
        to: addDays(new Date(2024, 3, 29), 0),
    })


    function performAnalysis(promotionId){
        getData("REVENUEVSTIME", promotionId)
        getData("REVENUECONVERSIONRATE", promotionId)
        getData("PURCHASECONVERSIONRATE", promotionId)
        getData("PROMOTIONCONVERSIONRATE", promotionId)
        getData("AGESUCCESSRATE", promotionId)
        getData("MARITALSTATUSSUCCESSRATE", promotionId)
        getData("GENDERSUCCESSRATE", promotionId)
    }

    async function getData(type, promotionId){
        const startDate = getDateString(date.from)
        const endDate = getDateString(date.to)
        let data
        switch(type){
            case "REVENUEVSTIME":
                data = await getRevenueVsDateForPromotion(startDate, endDate, promotionId)
                setPromotionRevenueData(data)
                return
            case "REVENUECONVERSIONRATE":
                data = await getRevenueConversionRateOfPromotion(startDate, endDate, promotionId)
                setRevenueConversionRate(data.conversionRate)
                return
            case "PURCHASECONVERSIONRATE":
                data = await getPurchaseConversionRateOfPromotion(startDate, endDate, promotionId)
                setPurchaseConversionRate(data.conversionRate)
                return
            case "PROMOTIONCONVERSIONRATE":
                data = await getPurchaseShareConversionRateOfPromotion(startDate, endDate, promotionId)
                setPromotionConversionRate(data.conversionRate)
                return
            case "AGESUCCESSRATE":
                data = await getAgeCriteriaSuccessRateOfPromotion(startDate, endDate, promotionId)
                setAgeSuccessConversionRate(data.conversionRate)
                return
            case "MARITALSTATUSSUCCESSRATE":
                data = await getMaritalStatusCriteriaSuccessRateOfPromotion(startDate, endDate, promotionId)
                setMaritalStatusSuccessConversionRate(data.conversionRate)
                return
            case "GENDERSUCCESSRATE":
                data = await getGenderCriteriaSuccessRateOfPromotion(startDate, endDate, promotionId)
                setGenderSuccessConversionRate(data.conversionRate)
                return
            default:
                return
        }
    }

    useEffect(()=>{
        performAnalysis(Promotion.id)
    }, [Promotion])


    return (
        <div className="mt-5 min-h-screen">
            
            
            {Promotion!={} && ( <>
            <div className="flex items-center mb-4">
                <h1  className=" p-3 font-normal text-sm text-slate-500"> Your Analytics For Promotion: <span className="lg:text-2xl lg:ml-5 text-md text-slate-700 font-normal">{Promotion.name} </span></h1>
                <PromotionCategoryIcon category={Promotion.category} size={35}/>
            </div>

            <div className="p-4 bg-white rounded-lg w-full lg:w-fit mx-auto flex flex-col lg:flex-row items-center gap-5">
                <Sheet >
                    <h4 className="text-sm text-slate-600">Analysis Period</h4>
                    <DatePickerWithRange date={date} setDate={setDate} />
                    <Button className="h-8" onClick={() => {performAnalysis(Promotion.id)}}>Analyse</Button>
                    <SheetTrigger className="bg-slate-800 text-white rounded-lg text-sm px-3 p-2">Promotion Details</SheetTrigger>
                    <AuditPromotion promotion={Promotion} analytics={true}/>
                </Sheet>
            </div>
            <TooltipProvider>
            <div className="flex-col mt-5">
                
                <div className="flex flex-col lg:flex-row justify-around gap-3">
                    <div id="revenue-conversion-rate" className="flex relative bg-white rounded-2xl items-center gap-5 p-5 justify-around">
                        <div className="absolute top-2 right-3">
                            <DescribeToolTip>
                                <TooltipTrigger>
                                    <Info size={15}/>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Percentage of revenue generated from promotions to total revenue</p>
                                </TooltipContent>
                            </DescribeToolTip>
                        </div>
                        <div className="rounded-full bg-yellow-100 p-2">
                            <Coins/>
                        </div>
                        
                        <div className="flex-col ">
                            <h2 className="text-3xl mb-3">{revenueConversionRate}%</h2>
                            <h4 className="text-xs font-medium text-slate-600">Revenue Conversion Rate</h4>
                        </div>
                    </div>
                    <div id="purchase-conversion-rate" className="flex relative bg-white rounded-2xl items-center gap-5 p-5 justify-around">
                        <div className="absolute top-2 right-3">
                            <DescribeToolTip>
                                <TooltipTrigger>
                                    <Info size={15}/>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Percentage of purchases due to promotions to the number of logins</p>
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
                    <div id="promotion-conversion-rate" className="flex relative bg-white rounded-2xl items-center gap-5 p-5 justify-around">
                        <div className="absolute top-2 right-3">
                            <DescribeToolTip>
                                <TooltipTrigger>
                                    <Info size={15}/>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Percentage of purchases made with a specific promotion to total purchases</p>
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
                <div className="flex flex-col lg:flex-row items-center justify-around gap-4">
                    
                    <div id="bar-graph-revenue-vs-time-promotion" className="bg-white relative rounded-2xl p-6 w-fit my-5">
                        <div className="absolute top-2 right-3">
                            <DescribeToolTip>
                                <TooltipTrigger>
                                    <Info size={15}/>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Visualization of the revenue generated by the promotion over time</p>
                                </TooltipContent>
                            </DescribeToolTip>
                        </div>
                        <div className="p-4 pt-0">
                            <h3 className="text-slate-500 font-normal text-lg">Revenue Vs Time Analytics</h3>
                        </div>
                        <BarChart
                        className="text-xs"
                            width={isSmallScreen ? 300 : isLargeScreen ? 430 : 650}
                            height={isSmallScreen ? 200 : isLargeScreen ? 300 : 650}
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
                    <div className="flex-col justify-around lg:w-1/3 w-full" id="customer segments">
                        <div id="age-cat" className="flex relative bg-white my-3 rounded-2xl items-center gap-5 p-5 ">
                            <div className="absolute top-2 right-3">
                                <DescribeToolTip>
                                    <TooltipTrigger>
                                        <Info size={15}/>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Percentage of purchases using the promotion within a specific age group</p>
                                    </TooltipContent>
                                </DescribeToolTip>
                            </div>
                            <div className="rounded-full bg-yellow-100 p-2">
                                <LampDesk/>
                            </div>
                            
                            <div className="flex-col ">
                                <h2 className="text-3xl mb-3">{ageSuccessRate}%</h2>
                                <h4 className="text-xs font-medium text-slate-600">Age Criteria Success Rate - {convertToTitleCase(Promotion.criteria.ageCategory)}</h4>
                            </div>
                        </div>
                        <div id="gender" className="flex relative bg-white my-3 rounded-2xl items-center gap-5 p-5 ">
                            <div className="absolute top-2 right-3">
                                <DescribeToolTip>
                                    <TooltipTrigger>
                                        <Info size={15}/>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Percentage of purchases using a promotion within a specific gender</p>
                                    </TooltipContent>
                                </DescribeToolTip>
                            </div>
                            <div className="rounded-full bg-green-100 p-2">
                                <PersonStanding/>
                            </div>
                            
                            <div className="flex-col ">
                                <h2 className="text-3xl mb-3">{genderSuccessRate}%</h2>
                                <h4 className="text-xs font-medium text-slate-600">Gender Criteria Success Rate - {convertToTitleCase(Promotion.criteria.gender)}</h4>
                            </div>
                        </div>
                        <div id="marital-status" className="flex relative bg-white my-3 rounded-2xl items-center gap-5 p-5 ">
                            <div className="absolute top-2 right-3">
                                <DescribeToolTip>
                                    <TooltipTrigger>
                                        <Info size={15}/>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Percentage of purchases using a promotion within a specific marital status</p>
                                    </TooltipContent>
                                </DescribeToolTip>
                            </div>
                            <div className="rounded-full bg-blue-100 p-2">
                                <Gem/>
                            </div>
                            
                            <div className="flex-col ">
                                <h2 className="text-3xl mb-3">{maritalStatusSuccessRate}%</h2>
                                <h4 className="text-xs font-medium text-slate-600">Marital Status Criteria Success Rate - {convertToTitleCase(Promotion.criteria.maritalStatus)}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            </TooltipProvider>
            </>)}
        </div>
    )
}

export default PromotionAnalysis;