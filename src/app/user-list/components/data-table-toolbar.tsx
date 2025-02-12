import { Table } from "@tanstack/react-table"
import { ArrowDown, ArrowRight, ArrowUp, Mars, Venus, X } from "lucide-react"

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { DataTableViewOptions } from "./data-table-view-options"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

const PriorityOptions = [
  { label: "High", value: "High", icon: ArrowUp },
  { label: "Medium", value: "Medium", icon: ArrowRight },
  { label: "Low", value: "Low", icon: ArrowDown },
]

const GenderOptions = [
  { value: "male", label: "Male", icon: Mars, },    
  { value: "female", label: "Female", icon: Venus, },
]

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
					placeholder="Filter names..."
					value={(table.getColumn("firstName")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
					table.getColumn("firstName")?.setFilterValue(event.target.value)
					}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {table.getColumn("age") && (
          <DataTableFacetedFilter
            column={table.getColumn("age")}
            title="Priority"
            options={PriorityOptions}
          />
        )}
        {table.getColumn("gender") && (
          <DataTableFacetedFilter
            column={table.getColumn("gender")}
            title="Gender"
            options={GenderOptions}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}