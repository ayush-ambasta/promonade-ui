import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { Label } from "@radix-ui/react-dropdown-menu"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { convertToTitleCase, formatDate, convertToIndianTime, convertToSnakeCase, isValidDateString, isValidTimeString } from "@/lib/utils"
import { MoreHorizontal } from "lucide-react"
import { useContext, useState } from "react"
import PromotionsContext from "@/contexts/PromotionsContext"
import { editPromotion } from "@/services/promotionsService"

const EditPromotion = ({promotion}) => {
    const { dispatch } = useContext(PromotionsContext);

    const [name, setName] = useState(promotion.name)
    const [type, setType] = useState(promotion.promotionType)
    const [validFromTime, setValidFromTime] = useState(convertToIndianTime(promotion.validFrom).split("T")[1])
    const [validFromDate, setValidFromDate] = useState(convertToIndianTime(promotion.validFrom).split("T")[0])
    const [validTillTime, setValidTillTime] = useState(convertToIndianTime(promotion.validTill).split("T")[1])
    const [validTillDate, setValidTillDate] = useState(convertToIndianTime(promotion.validTill).split("T")[0])
    const [ageCategory, setAgeCategory] = useState(promotion.criteria.ageCategory)
    const [gender, setGender] = useState(promotion.criteria.gender)
    const [maritalStatus, setMartialStatus] = useState(promotion.criteria.maritalStatus)
    const [productType, setProductType] = useState(promotion.criteria.productType)


    async function savePromotionValues(){

        promotion.name = name;
        promotion.promotionType = type;
        if(!isValidDateString(validFromDate) || !isValidDateString(validTillDate)){
            alert("Validity Date is not in right format!")
            return
        }
        if(!isValidTimeString(validFromTime) || !isValidTimeString(validTillTime)){
            alert("Validity Time is not in right format!")
            return
        }
        promotion.validFrom = validFromDate +"T"+ validFromTime + "+05:30"
        promotion.validTill = validTillDate +"T"+ validTillTime + "+05:30"

        promotion.criteria.ageCategory = ageCategory
        promotion.criteria.maritalStatus = maritalStatus
        promotion.criteria.productType = productType
        promotion.criteria.gender = gender

        const promo = await editPromotion(promotion.id, {
            name, 
            category: promotion.category, 
            promotionType: type, 
            validFrom: validFromDate +"T"+ validFromTime + "+05:30",
            validTill: validTillDate +"T"+ validTillTime + "+05:30",
            criteria: {
                ageCategory, maritalStatus, gender, productType
            }
        })
        dispatch({type:'EDIT',payload:{id: promotion.id, promotion: promotion}})
    }

    

    return (
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Edit Promotion</DialogTitle>
                <div>
                <div>
                    <div className="flex my-2 text-xs justify-between items-center">
                        <Label htmlFor="name" className="text-black">Name</Label>
                        <Input className="text-xs w-2/5 py-2" defaultValue={promotion.name} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    {/* <div className="flex my-2 text-xs justify-between items-center">
                    <Label htmlFor="category" className="text-black">Category</Label>
                    <Select defaultValue={convertToTitleCase(promotion.category)} onValueChange={(value)=> setCategory(convertToSnakeCase(value))}>
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
                        <Label htmlFor="type" className="text-black">Type</Label>
                        <Select defaultValue={promotion.promotionType} onValueChange={(value)=> setType(value)}>
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
                        <Label htmlFor="validFrom" className="text-black">Valid From (YYYY-MM-DD) (HH:MM:SS)</Label>
                        <div className="w-2/5 flex">
                        <Input className="text-xs py-2 mr-2" defaultValue={convertToIndianTime(promotion.validFrom).split("T")[0] } onChange={(e)=>{setValidFromDate(e.target.value)}}/>
                        <Input className="text-xs py-2" defaultValue={convertToIndianTime(promotion.validFrom).split("T")[1]} onChange={(e)=>{setValidFromTime(e.target.value)}}/>
                        </div>
                    </div>
                    <div className="flex my-2 text-xs justify-between items-center">
                        <Label htmlFor="validTill" className="text-black">Valid Till (YYYY-MM-DD) (HH:MM:SS)</Label>
                        <div className="w-2/5 flex">
                        <Input className="text-xs py-2 mr-2" defaultValue={convertToIndianTime(promotion.validTill).split("T")[0]} onChange={(e)=>{setValidTillDate(e.target.value)}}/>
                        <Input className="text-xs py-2" defaultValue={convertToIndianTime(promotion.validTill).split("T")[1]} onChange={(e)=>{setValidTillTime(e.target.value)}}/>
                        </div> 
                    </div>
                    <MoreHorizontal className="h-4 w-4" />
                    <div className="flex my-2 text-xs justify-between items-center">
                        <Label htmlFor="ageCategory" className="text-black">Age Category</Label>
                        <Select defaultValue={promotion.criteria.ageCategory} onValueChange={(value)=> setAgeCategory(value)}>
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
                        <Label htmlFor="gender" className="text-black">Gender</Label>
                        <Select defaultValue={promotion.criteria.gender} onValueChange={(value)=> setGender(value)}>
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
                        <Label htmlFor="maritalStatus" className="text-black">Marital Status</Label>
                        <Select defaultValue={promotion.criteria.maritalStatus} onValueChange={(value)=> setMartialStatus(value)}>
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
                        <Label htmlFor="productType" className="text-black">Product Type</Label>
                        <Select defaultValue={promotion.criteria.productType} onValueChange={(value)=> setProductType(value)}>
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
    )
}

export default EditPromotion;