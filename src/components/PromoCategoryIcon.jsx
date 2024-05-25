import {
    Bolt,
    ChevronUp,
    Leaf,
    Milestone,
    Stamp,
    Zap,

  } from "lucide-react"

export const PromotionCategoryIcon = ({size, category}) => {

    switch(category){
        case "MILESTONE":
            return (
                <Milestone size={size}/>
            )
        case "REFERRAL":
            return (
                <Bolt size={size}/>
            )
        case "HIGHPURCHASE":
            return (
                <ChevronUp size={size}/>
            )
        case "FLASHSALE":
            return (
                <Zap size={size}/>
            )
        case "SEASONAL":
            return (
                <Leaf size={size}/>
            )
        case "LOYALTY":
            return (
                <Stamp size={size}/>
            )
        default:
            return (
                <></>
            )
    }
}