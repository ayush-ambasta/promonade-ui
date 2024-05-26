import { convertToTitleCase, formatDate } from "@/lib/utils"
import {
    SquareCheckBig, CircleOff
} from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Label } from "@radix-ui/react-dropdown-menu"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { MoreHorizontal } from "lucide-react"




export const columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "promotionType",
    header: "Type",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({row}) =>{
        const category = row.getValue("category")
        return convertToTitleCase(category)
    }
  },
  {
    accessorKey: "createdBy.name",
    header: "Creator",
  },
  {
    accessorKey: "active",
    header: "Active",
    cell: ({row}) => {
        const value = row.getValue("active")
        if(value){
            return <SquareCheckBig size={16}/>
        } else{
            return <CircleOff size={16}/>  
        }
    }
  },
  {
    accessorKey: "validFrom",
    header: "Valid From",
    cell: ({row}) => {
        const value = row.getValue("validFrom")
        return formatDate(value)
    }
  },
  {
    accessorKey: "validTill",
    header: "Valid Till",
    cell: ({row}) => {
        const value = row.getValue("validTill")
        return formatDate(value)
    }
  },
  {
    accessorKey: "criteria",
    header: "Criteria",
    cell: ({row}) => {
        const criteria = row.getValue("criteria")
        return (
            <Popover>
                <PopoverTrigger><div className="px-2 pb-1 border-2 rounded-md">. . .</div></PopoverTrigger>
                <PopoverContent>
                    <div className="flex text-xs justify-between items-center">
                        <Label htmlFor="ageCategory" className="text-black">Age Category</Label>
                        <Input className="text-xs w-2/5 py-2" value={convertToTitleCase(criteria.ageCategory)} disabled/>
                    </div>
                    <div className="flex text-xs justify-between items-center">
                        <Label htmlFor="gender" className="text-black">Gender</Label>
                        <Input className="text-xs w-2/5 py-2" value={convertToTitleCase(criteria.gender)} disabled/>
                    </div>
                    <div className="flex text-xs justify-between items-center">
                        <Label htmlFor="maritalStatus" className="text-black">Marital Status</Label>
                        <Input className="text-xs w-2/5 py-2 " value={convertToTitleCase(criteria.maritalStatus)} disabled/>
                    </div>
                    <div className="flex text-xs justify-between items-center">
                        <Label htmlFor="productType" className="text-black">Product Type</Label>
                        <Input className="text-xs w-2/5 py-2" value={convertToTitleCase(criteria.productType)} disabled/>
                    </div>
                    
                </PopoverContent>
            </Popover>
        )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-800 font-normal">Delete </DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
