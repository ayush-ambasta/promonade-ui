import {
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
  } from "@/components/ui/sheet"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "./ui/button"
import { convertToTitleCase, formatDateToISTWords, convertToIndianTime, convertToSnakeCase, isValidDateString, isValidTimeString } from "@/lib/utils"
import { MoreHorizontal } from "lucide-react"
import { approvePromotion, disapprovePromotion } from "@/services/promotionsService"
import UserContext from "@/contexts/UserContext"
import { useContext } from "react"

const AuditPromotion = ({promotion, setPromotions, promotions, analytics}) => {
    const { state } = useContext(UserContext);
    const user = state.user;
    
    const handleButtonClick = async (action) => {
        try{
          if (action === 'accept') {
            await approvePromotion(promotion.id);
            alert('Promotion Accepted');
          } else if (action === 'decline') {
            await disapprovePromotion(promotion.id);
            alert('Promotion Declined');
          }
          setPromotions(promotions.filter(promo => promo?.id !== promotion?.id));
        }catch(err){
            console.log(err)
        }
      };

     return (
        <SheetContent side="left" className="lg:max-w-lg lg:overflow-y-scroll">
            <SheetHeader>
                <SheetTitle>Audit Promotion</SheetTitle>
                <div>
                    <div>
                        <div className="flex my-2 text-xs justify-between items-center">
                            <Label htmlFor="name" className="text-black text-xs font-normal">Name</Label>
                            <Input className="text-xs w-2/5 py-2" defaultValue={promotion.name} disabled/>
                        </div>
                        <div className="flex my-2 text-xs justify-between items-center">
                        <Label htmlFor="category" className="text-black text-xs font-normal">Category</Label>
                        <Select defaultValue={convertToTitleCase(promotion.category)} disabled>
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
                        </div>
                        <div className="flex my-2 text-xs justify-between items-center">
                            <Label htmlFor="type" className="text-black text-xs font-normal">Type</Label>
                            <Select defaultValue={promotion.promotionType} disabled>
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
                            <Label htmlFor="validFrom" className="text-black text-xs font-normal">Valid From (YYYY-MM-DD) (HH:MM:SS)</Label>
                            <div className="w-2/5 flex">
                            <Input className="text-xs py-2 mr-2" defaultValue={convertToIndianTime(promotion.validFrom).split("T")[0] } disabled/>
                            <Input className="text-xs py-2" defaultValue={convertToIndianTime(promotion.validFrom).split("T")[1]} disabled/>
                            </div>
                        </div>
                        <div className="flex my-2 text-xs justify-between items-center">
                            <Label htmlFor="validTill" className="text-black text-xs font-normal">Valid Till (YYYY-MM-DD) (HH:MM:SS)</Label>
                            <div className="w-2/5 flex">
                            <Input className="text-xs py-2 mr-2" defaultValue={convertToIndianTime(promotion.validTill).split("T")[0]} disabled/>
                            <Input className="text-xs py-2" defaultValue={convertToIndianTime(promotion.validTill).split("T")[1]} disabled/>
                            </div> 
                        </div>
                        <MoreHorizontal className="h-4 w-4" />
                        <div className="flex my-2 text-xs justify-between items-center">
                            <Label htmlFor="ageCategory" className="text-black text-xs font-normal">Age Category</Label>
                            <Select defaultValue={promotion.criteria.ageCategory} disabled>
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
                            <Label htmlFor="gender" className="text-black text-xs font-normal">Gender</Label>
                            <Select defaultValue={promotion.criteria.gender} disabled>
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
                            <Label htmlFor="maritalStatus" className="text-black text-xs font-normal">Marital Status</Label>
                            <Select defaultValue={promotion.criteria.maritalStatus} disabled>
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
                            <Label htmlFor="productType" className="text-black text-xs font-normal">Product Type</Label>
                            <Select defaultValue={promotion.criteria.productType} disabled>
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
                    {!analytics &&
                    <div className="flex justify-around">
                        {(user?.role==="OWNER")?
                            <>
                            <SheetClose asChild>
                                <Button className="h-8 w-3/12 bg-green-900 self-center mt-4" onClick={() => handleButtonClick('accept')}>Accept</Button>
                            </SheetClose>
                            <SheetClose asChild>
                                <Button className="h-8 w-3/12 bg-red-900 self-center mt-4" onClick={() => handleButtonClick('decline')}>Decline</Button>
                            </SheetClose>:
                            </>:
                            <SheetClose asChild>
                                <Button className="h-8 self-center mt-4" >Awaiting Approval . . .</Button>
                            </SheetClose>
                        }
                        
                    </div>}
                </div>
            </SheetHeader>
        </SheetContent>
    )
}

export default AuditPromotion