import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { deletePromotion } from "@/services/promotionsService"
import PromotionsContext from "@/contexts/PromotionsContext";
import { useContext } from "react";
import { useToast } from "@/components/ui/use-toast";


export function DataTable({ columns, data }) {
  const {toast} = useToast();
  const {dispatch} = useContext(PromotionsContext)

  async function deletePromotionWithID(id, validFrom){
    const currentDate = Date.now()
    const validity = Date.parse(validFrom)
    if(currentDate > validity){
      toast({
        variant: "destructive",
        title: "Operation Failed",
        description: "You cannot delete this promotion. It was once Live!",
      })
    } else {
      const resp = await deletePromotion(id)
      if(resp.success)
        dispatch({type: "DELETE", payload: {id: id}})
    }
  }


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    removeRow:(id, validFrom) => {
      deletePromotionWithID(id, validFrom )
    }
  })

  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader className="dark:bg-slate-800 bg-zinc-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="text-xs">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
