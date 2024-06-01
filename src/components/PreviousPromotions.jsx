import React, { useContext, useEffect, useState } from 'react'
import { convertToTitleCase, convertToSnakeCase } from '@/lib/utils';
import { PromotionCategoryIcon } from './PromoCategoryIcon';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from './ui/button';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { getApprovedPromotions } from '@/services/promotionsService';
import {
  Search,
  Frown
} from "lucide-react"
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
import { Link } from 'react-router-dom';


export const PreviousPromotions = ({Promotion}) => {
    
    const [searchInput, setSearchInput] = useState("");
    const [promotionCategory, setPromotionCategory] = useState("")
    const [promotionType, setPromotionType] = useState("")
    const [promotions, setpromotions] = useState([]);

    const checkVaildTill = (promo) =>{
        const validTill = new Date(promo?.validTill);
        const today = new Date();
        if(validTill<today){
            return true;
        }
        
        return false;
    }

    const searchPromotions = async () =>{
      let promos = await getPromotion();
      promos = promos.filter(element => element.name.toLowerCase().includes(searchInput.toLowerCase()));
      setpromotions(promos)
    }

    const filterPromotions = async() =>{
      let promos = await getPromotion();
      promos = promos.filter(element => {
          const matchCategory = !promotionCategory || convertToTitleCase(element.category) === promotionCategory;
          const matchType = !promotionType || element.promotionType === promotionType;
          return matchCategory && matchType;
      });
      setpromotions(promos);
    }

    const getPromotion=async() => {
      const data = await getApprovedPromotions();
      return data.filter(checkVaildTill);
    }

    useEffect(() => {
      const fetchData = async () => {
        try {
            const promos = await getPromotion();
            setpromotions(promos);
        } catch (error) {
            console.error("Error setting promotions:", error);
        }
    };

    fetchData();
    }, []);



  return (
    <div className="grid h-fit lg:h-full auto-rows-max items-start gap-4 bg-white lg:gap-8 lg:min-h-screen shadow-lg lg:min-w-60">
      <Card x-chunk="dashboard-07-chunk-3 " className="shadow-none rounded-none border-none bg-inherit">
        <CardHeader>
          <CardTitle className="font-normal text-xl text-slate-600">Promotions</CardTitle>
        </CardHeader>

        {/* Search Button */}
        <div className='flex justify-center my-2'>
          <div className="relative text-gray-600 flex items-center justify-around shadow-[1px_1px_9px_-4px_rgba(0,0,0,0.31)] rounded-xl w-4/5">
            <input type="search" name="search" placeholder="Search By Name" onChange={(e)=>{setSearchInput(e.target.value)}} className="bg-white w-2/3 pl-2 py-2 rounded-full text-xs focus:outline-none"/>
            <button type="submit" onClick={searchPromotions}>
              <Search size={14}/>
            </button>
          </div>
        </div>

        {/* Filter Options */}
        <Dialog className="w-full flex justify-center">
          <DialogTrigger className='w-full flex justify-center'><div className="px-8 py-1 flex items-center h-6 my-2 bg-black rounded-lg text-white">Filter</div></DialogTrigger>
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
                <Button className="h-8 w-3/12 self-center mt-4" onClick={filterPromotions}>Filter</Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        
        {/* Promotions  */}
        <CardContent className="px-2 pr-0 mt-4">
        {promotions.length === 0 ? 

        (<h4 className='text-sm text-slate-400'>
          <div className='flex flex-col justify-center items-center'>
            <br/>
            <Frown /><br/>No Previous Promotions 
          </div> 
        </h4>) :

        (<>
          <div className="flex-1 overflow-y-auto lg:overflow-y-clip lg:max-h-none max-h-80">
            <nav className="grid items-start pl-4 font-medium pr-3 ">
            <ToggleGroup className="flex-col items-start justify-start" value={Promotion.id} type="single">

              {promotions?.map((promo) => (
              <ToggleGroupItem value={promo.id} key={promo.id} className="w-full flex justify-start text-left px-0 pr-1 py-8">
               
              <Link to={"/analytics?id=" + promo.id}
                className="flex cursor-pointer justify-between items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <PromotionCategoryIcon category={promo.category} size={25} className="h-4 w-4 mx-2" />
                <div>
                  <h4 className='text-sm'>{promo?.name}</h4>
                  <h6 className='text-xs font-normal'>{convertToTitleCase(promo?.category)}</h6>
                </div>
              </Link>
              </ToggleGroupItem>
              ))}

            </ToggleGroup>
            </nav>
          </div>
        </>
        )}
        </CardContent>
      </Card>
    </div>
  )
}
