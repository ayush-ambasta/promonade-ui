import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    } from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
  } from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label";
import { useContext, useState } from "react"
import PromotionsContext from "@/contexts/PromotionsContext"
import { getAllPromotions } from "@/services/promotionsService";
import { useToast } from "./ui/use-toast";

const FilterPromotionList = ({defaultPromo}) => {
    const { toast } = useToast()
    const { promotions, dispatch } = useContext(PromotionsContext);
    
    // const [promotionCategory, setPromotionCategory] = useState("")
    const [promotionType, setPromotionType] = useState("")
    const [validFromDate, setValidFromDate] = useState("")
    const [validTillDate, setValidTillDate] = useState("")
    const [status, setStatus] = useState(undefined)

    async function fetchPromotions(){
        try{
            const data = await getAllPromotions()
            const filteredData = data.filter(promo => defaultPromo===promo.category && promo.approved)
            filteredData.sort((a, b) =>  new Date(b.createdAt) - new Date(a.createdAt));
            const newData = filteredData.map((item, index) => ({
                ...item,
                _id: index + 1 // Incrementing id values
            }));
            return newData
        }catch(err){
            toast({
                variant: "destructive",
                title: "Filter Promotions Failed",
                description: String(err).split(":")[1],
            })
        }
        
    }

    const filterPromotions = async() =>{
        try{
            let promos = await fetchPromotions();
            promos = promos.filter(element => {
                const matchType = !promotionType || element.promotionType === promotionType;
                const matchValidDate = (!validFromDate || Date.parse(element.validFrom) >= Date.parse(validFromDate)) &&
                                   (!validTillDate || Date.parse(element.validTill) <= Date.parse(validTillDate));
                const matchStatus = status === undefined || element.active === (status === "true");
                return matchValidDate && matchType && matchStatus;
            });
            dispatch({type:'ADDALL',payload:promos});
        }catch(err){
            console.log(err)
        }
    }

    return (
        <Dialog className="w-full flex justify-center">
            <DialogTrigger className='w-full flex justify-center'><div className="px-8 py-4 flex items-center h-4 my-2 bg-primary text-primary-foreground rounded-lg ">Filter</div></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle className="mb-4">Filter Promotions</DialogTitle>
                <div className="flex-col flex w-full">
                    {/* <div className='flex justify-between items-center my-2'>
                        <Label htmlFor="category" className="text-black text-xs">Category</Label>  
                        <Select onValueChange={(value)=>setPromotionCategory(value)} >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Milestone">Milestone</SelectItem>
                                <SelectItem value="Referral">Referral</SelectItem>
                                <SelectItem value="Highpurchase">Highpurchase</SelectItem>
                                <SelectItem value="Loyalty">Loyalty</SelectItem>
                                <SelectItem value="Flashsale">Flashsale</SelectItem>
                                <SelectItem value="Seasonal">Seasonal</SelectItem>
                            </SelectContent>
                        </Select>
                    </div> */}
                    <div className='flex justify-between items-center my-2'>
                        <Label htmlFor="category" className="text-black text-xs">Type</Label>  
                        <Select onValueChange={(value)=>setPromotionType(value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="BOGO">BOGO</SelectItem>
                                <SelectItem value="DISCOUNT">DISCOUNT</SelectItem>
                                <SelectItem value="BUNDLEDEAL">BUNDLEDEAL</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex my-2 justify-between items-center">
                        <Label htmlFor="validTill" className="text-black text-xs">Valid Between (YYYY-MM-DD)</Label>
                        <div className="w-2/5 flex">
                            <Input className="text-xs py-2 mr-2"  onChange={(e)=>{setValidFromDate(e.target.value)}}/>
                            <Input className="text-xs py-2" onChange={(e)=>{setValidTillDate(e.target.value)}}/>
                        </div> 
                    </div>
                    <div className='flex justify-between items-center my-2'>
                        <Label htmlFor="active" className="text-black text-xs">Status</Label>  
                        <Select onValueChange={(value)=>setStatus(value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">Active</SelectItem>
                                <SelectItem value="false">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogClose asChild>
                        <Button className="h-8 w-3/12 self-center mt-4" onClick={filterPromotions}>Filter</Button>
                    </DialogClose>
                    
                </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default FilterPromotionList;