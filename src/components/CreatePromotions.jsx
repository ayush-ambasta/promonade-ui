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
  } from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label";
import { MoreHorizontal } from "lucide-react"
import { useContext, useState } from "react"
import PromotionsContext from "@/contexts/PromotionsContext"
import { convertToTitleCase, formatDate, convertToIndianTime, convertToSnakeCase, isValidDateString, isValidTimeString } from "@/lib/utils"
import { createPromotion } from "@/services/promotionsService";


const CreatePromotion = ({defaultPromo}) => {
    const { promotions, dispatch } = useContext(PromotionsContext);

    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [validFromTime, setValidFromTime] = useState("")
    const [validFromDate, setValidFromDate] = useState("")
    const [validTillTime, setValidTillTime] = useState("")
    const [validTillDate, setValidTillDate] = useState("")
    const [ageCategory, setAgeCategory] = useState("")
    const [gender, setGender] = useState("")
    const [maritalStatus, setMartialStatus] = useState("")
    const [productType, setProductType] = useState("")


    async function savePromotionValues(){
        if(!name || !type || !validFromDate || !validFromTime || !validTillDate || !validTillTime || !ageCategory || !gender || !maritalStatus || !productType){
            alert("Please fill all the fields to create a promotion")
            return
        }
        if(!isValidDateString(validFromDate) || !isValidDateString(validTillDate)){
            alert("Validity Date is not in right format!")
            return
        }
        if(!isValidTimeString(validFromTime) || !isValidTimeString(validTillTime)){
            alert("Validity Time is not in right format!")
            return
        }

        const promotion = await createPromotion({
            name,
            category: defaultPromo,
            promotionType: type,
            validFrom: validFromDate +"T"+ validFromTime + "+05:30",
            validTill: validTillDate +"T"+ validTillTime + "+05:30",
            criteria: {
                ageCategory, maritalStatus, gender, productType
            }
        })
        dispatch({type:'CREATE',payload:{...promotion, _id: promotions.length+1}})
    }

    function resetStates(){
        setName("")
        setType("")
        setValidFromDate("")
        setValidFromTime("")
        setValidTillTime("")
        setValidTillDate("")
        setGender("")
        setAgeCategory("")
        setMartialStatus("")
        setProductType("")
    }

    return (

        <Dialog className="w-full flex justify-center">
        <DialogTrigger onClick={resetStates} className='w-full flex justify-center'><div className="px-8 py-4 flex items-center h-4 my-2 bg-black rounded-lg text-white">Create</div></DialogTrigger>
        <DialogContent className="font-light">
        <DialogHeader>
            <DialogTitle>Create Promotion</DialogTitle>
            <div >
                <div>
                <div className="flex my-2 text-xs justify-between items-center">
                    <Label htmlFor="name" className="text-black font-normal text-xs">Name</Label>
                    <Input className="text-xs w-2/5 py-2" onChange={(e)=>setName(e.target.value)}/>
                </div>
                {/* <div className="flex my-2 text-xs justify-between items-center">
                    <Label htmlFor="category" className="text-black font-normal text-xs">Category</Label>
                    <Select >
                    <SelectTrigger className="w-2/5 text-xs">
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
                <div className="flex my-2 text-xs justify-between items-center">
                    <Label htmlFor="type" className="text-black font-normal text-xs">Type</Label>
                    <Select onValueChange={(value)=> setType(value)}>
                        <SelectTrigger className="w-2/5 text-xs">
                        <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="BOGO">BOGO</SelectItem>
                        <SelectItem value="DISCOUNT">DISCOUNT</SelectItem>
                        <SelectItem value="BUNDLEDEAL">BUNDLEDEAL</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex my-2 text-xs justify-between items-center">
                    <Label htmlFor="validFrom" className="text-black font-normal text-xs">Valid From (YYYY-MM-DD) (HH:MM:SS)</Label>
                    <div className="w-2/5 flex">
                        <Input className="text-xs py-2 mr-2" onChange={(e)=>{setValidFromDate(e.target.value)}}/>
                        <Input className="text-xs py-2"  onChange={(e)=>{setValidFromTime(e.target.value)}}/>
                    </div>
                </div>
                <div className="flex my-2 text-xs justify-between items-center">
                    <Label htmlFor="validTill" className="text-black font-normal text-xs">Valid Till (YYYY-MM-DD) (HH:MM:SS)</Label>
                    <div className="w-2/5 flex">
                        <Input className="text-xs py-2 mr-2" onChange={(e)=>{setValidTillDate(e.target.value)}}/>
                        <Input className="text-xs py-2" onChange={(e)=>{setValidTillTime(e.target.value)}}/>
                    </div> 
                </div>
                <MoreHorizontal className="h-4 w-4" />
                <div className="flex my-2 text-xs justify-between items-center">
                    <Label htmlFor="ageCategory" className="text-black font-normal text-xs" >Age Category</Label>
                    <Select onValueChange={(value)=> setAgeCategory(value)}>
                        <SelectTrigger className="w-2/5 text-xs">
                        <SelectValue placeholder="Age Category" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="KID">Kid</SelectItem>
                        <SelectItem value="TEEN">Teen</SelectItem>
                        <SelectItem value="YOUNGADULT">Youngadult</SelectItem>
                        <SelectItem value="MIDDLEAGEDADULT">Middle Aged Adult</SelectItem>
                        <SelectItem value="OLD">Old</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex my-2 text-xs justify-between items-center">
                    <Label htmlFor="gender" className="text-black font-normal text-xs">Gender</Label>
                    <Select onValueChange={(value)=> setGender(value)}>
                        <SelectTrigger className="w-2/5 text-xs">
                        <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex my-2 text-xs justify-between items-center">
                    <Label htmlFor="maritalStatus" className="text-black font-normal text-xs">Marital Status</Label>
                    <Select onValueChange={(value)=> setMartialStatus(value)}>
                        <SelectTrigger className="w-2/5 text-xs">
                        <SelectValue placeholder="Marital Status" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="SINGLE">Single</SelectItem>
                        <SelectItem value="MARRIED">Married</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex my-2 text-xs justify-between items-center">
                    <Label htmlFor="productType" className="text-black font-normal text-xs">Product Type</Label>
                    <Select onValueChange={(value)=> setProductType(value)}>
                        <SelectTrigger className="w-2/5 text-xs">
                        <SelectValue placeholder="Product Type" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="SPORTS">Sports</SelectItem>
                        <SelectItem value="ELECTRONICS">Elctronics</SelectItem>
                        <SelectItem value="EDUCATION">Education</SelectItem>
                        <SelectItem value="FASHION">Fashion</SelectItem>
                        <SelectItem value="MEDICAL">Medical</SelectItem>
                        <SelectItem value="HOUSEHOLD">Household</SelectItem>
                        <SelectItem value="TOYS">Toys</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                </div>
                <div className="flex justify-center">
                <Button className="h-8 w-3/12 self-center mt-4" onClick={savePromotionValues}>Save</Button>
                </div>
            </div>
        </DialogHeader>
        </DialogContent>
    </Dialog>
    )
}

export default CreatePromotion;