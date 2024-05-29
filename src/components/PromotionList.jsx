import { useContext, useState, useEffect } from "react";
import UserContext from '@/contexts/UserContext';
import { convertToTitleCase } from "@/lib/utils";
import {
    Search,
  } from "lucide-react"
import { getAllPromotions } from "@/services/promotionsService";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import PromotionsContext from "@/contexts/PromotionsContext";
import CreatePromotion from "./CreatePromotions";
import FilterPromotionList from "./FilterPomotionList";


const PromotionList = ({defaultPromo}) =>{

    const { state } = useContext(UserContext);
    const user = state.user;
    const { promotions , dispatch } = useContext(PromotionsContext)

    const [searchInput, setSearchInput] = useState("");


    async function fetchPromotions(){
        const data = await getAllPromotions()
        const filteredData = data.filter(promo => defaultPromo===promo.category && promo.approved)
        filteredData.sort((a, b) =>  new Date(b.createdAt) - new Date(a.createdAt));
        const newData = filteredData.map((item, index) => ({
            ...item,
            _id: index + 1 // Incrementing id values
        }));
        return newData
    }

    const searchPromotions = async () =>{
        let promos = await fetchPromotions();
        promos = promos.filter(element => element.name.toLowerCase().includes(searchInput.toLowerCase()) || element.createdBy.name.toLowerCase().includes(searchInput.toLowerCase()));
        dispatch({type:'ADDALL',payload:promos})
    }


    useEffect(() => {
        const fetchData = async () => {
          try {
              const promos = await fetchPromotions();
              dispatch({type:'ADDALL',payload:promos})
          } catch (error) {
              console.error("Error setting promotions:", error);
          }
      };
  
      fetchData();
      }, [defaultPromo]);

    return (
        <div className="m-8 w-full overflow-x-auto mx-1">
            <div>
                <h1 className="text-3xl text-gray-600 font-semibold">Welcome Back, {user? convertToTitleCase(user.username): "User"}!</h1>
            </div>
            <div className="justify-between items-center my-8 flex flex-col lg:flex-row">
                <div>
                    <h2 className="text-2xl font-normal text-gray-700">Promotions List</h2>
                </div>
                <div className="flex justify-center w-full lg:w-6/12">

                    {/* Search Button */}
                    <div className='flex my-2 mx-2'>
                        <div className="relative text-gray-600 px-3 flex items-center justify-around shadow-[1px_1px_9px_-4px_rgba(0,0,0,0.31)] rounded-xl ">
                            <input type="search" name="search" placeholder="Search by name or creator" onChange={(e)=>{setSearchInput(e.target.value)}} className="bg-white w-48  pl-2 py-2 rounded-full text-xs focus:outline-none"/>
                            <button type="submit" onClick={searchPromotions}>
                                <Search size={14}/>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="mx-2">
                            <FilterPromotionList defaultPromo={defaultPromo}/>
                        </div>
                        <div>
                            <CreatePromotion defaultPromo={defaultPromo}/>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <DataTable columns={columns} data={promotions} />
            </div>
        </div>
    )
}

export default PromotionList