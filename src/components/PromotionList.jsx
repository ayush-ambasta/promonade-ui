import { useContext, useState, useEffect } from "react";
import UserContext from '@/contexts/UserContext';
import { convertToTitleCase } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Label } from './ui/label';
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import {
    Search,
  } from "lucide-react"
import { Button } from './ui/button';
import { getAllPromotions } from "@/services/promotionsService";
import { columns } from "./columns";
import { DataTable } from "./data-table";


const PromotionList = ({defaultPromo}) =>{

    const { state } = useContext(UserContext);
    const user = state.user;

    const [searchInput, setSearchInput] = useState("");
    const [promotionCategory, setPromotionCategory] = useState("")
    const [promotionType, setPromotionType] = useState("")
    const [promotions, setPromotions] = useState([]);


    async function fetchPromotions(){
        const data = await getAllPromotions()
        // console.log(data)
        const filteredData = data.filter(promo => defaultPromo===promo.category && promo.approved)
        filteredData.sort((a, b) =>  new Date(b.createdAt) - new Date(a.createdAt));
        const newData = filteredData.map((item, index) => ({
            ...item,
            _id: index + 1 // Incrementing id values
        }));
        setPromotions(newData)
    }

    useEffect(()=>{
        fetchPromotions()
    }, [defaultPromo])

    return (
        <div className="m-8 w-full">
            <div>
                <h1 className="text-3xl text-gray-600 font-semibold">Welcome Back, {user? convertToTitleCase(user.username): "User"}!</h1>
            </div>
            <div className="flex justify-between items-center my-8">
                <div>
                    <h2 className="text-2xl font-normal text-gray-700">Promotions List</h2>
                </div>
                <div className="flex items-center w-5/12">

                    {/* Search Button */}
                    <div className='flex justify-center my-2'>
                        <div className="relative text-gray-600 px-3 flex items-center justify-around shadow-[1px_1px_9px_-4px_rgba(0,0,0,0.31)] rounded-xl ">
                            <input type="search" name="search" placeholder="Search By Name" onChange={(e)=>{setSearchInput(e.target.value)}} className="bg-white w-48  pl-2 py-2 rounded-full text-xs focus:outline-none"/>
                            <button type="submit">
                                <Search size={14}/>
                            </button>
                        </div>
                    </div>

                    {/* Filter Options */}
                    <Dialog className="w-full flex justify-center">
                        <DialogTrigger className='w-full flex justify-center'><div className="px-8 py-4 flex items-center h-6 my-2 bg-black rounded-lg text-white">Filter</div></DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle className="mb-4">Filter Promotions</DialogTitle>
                            <div className="flex-col flex">
                                <div className='flex justify-between items-center my-2 w-4/5'>
                                <Label htmlFor="category" className="text-black">Category</Label>  
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
                                </div>
                                <div className='flex justify-between items-center my-2 w-4/5'>
                                <Label htmlFor="category" className="text-black">Type</Label>  
                                <Select onValueChange={(value)=>setPromotionType(value)}>
                                    <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectItem value="BOGO">BOGO</SelectItem>
                                    <SelectItem value="Discount">DISCOUNT</SelectItem>
                                    <SelectItem value="Bundledeal">BUNDLEDEAL</SelectItem>
                                    </SelectContent>
                                </Select>
                                </div>
                                <Button className="h-8 w-3/12 self-center mt-4" >Filter</Button>
                            </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                </div>
            </div>
            <div>
                <DataTable columns={columns} data={promotions} />
            </div>
        </div>
    )
}

export default PromotionList