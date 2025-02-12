import { Button } from "@/components/ui/button";
import { User } from "@/types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowRight, ArrowUp, Mars, MoreHorizontal, Venus } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "./data-table-column-header";


const getPriority = (age: number) => {
  if (age >= 38) return "High";
  if (age >= 30) return "Medium";
  return "Low";
};

export const columns: ColumnDef<User>[] = [
  {
      accessorKey: "id",
      header: "Id"
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => ( 
        <DataTableColumnHeader column={column} title="Name" />
    ),      
    cell: ({ row }) => {
      const { firstName, lastName } = row.original;
      return `${firstName} ${lastName}`;
    },
    filterFn: (row, _, filterValue) => {
        const firstName = row.original.firstName.toLowerCase();
        const lastName = row.original.lastName.toLowerCase();
        const searchValue = filterValue.toLowerCase();
        return firstName.includes(searchValue) || lastName.includes(searchValue);
    }
  },
  {
    accessorKey: "gender",
    header: ({ column }) => ( 
        <DataTableColumnHeader column={column} title="Gender" />
    ),      
    cell: ({ getValue }) => {
      const gender = getValue<string>();
      const Icon = gender === "female" ? Venus : Mars;
      
      return (
        <span className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-gray-500" />
          {gender.charAt(0).toUpperCase() + gender.slice(1)}
        </span>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "age",
    header: ({ column }) => ( 
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ getValue }) => {
        const age = getValue<number>();  
        let priority = "Low";
        let Icon = ArrowDown;

        if (age >= 38) {
            priority = "High";
            Icon = ArrowUp;
        } else if (age >= 30) {
            priority = "Medium";
            Icon = ArrowRight;
        }

        return (
            <span className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-gray-500" />
                {priority}
            </span>
        );
    },
    filterFn: (row, id, value) => {
        const age = row.getValue<number>(id);
        const priority = getPriority(age);
        return value.includes(priority);
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => {
      const city = row.original.address?.state || "Unknown";
      const phone = row.getValue("phone") as string; 
    
      return (
        <div className="flex space-x-2">
          {city && <Badge variant="outline">{city}</Badge>}
          <span className="max-w-[200px] truncate font-medium">{phone}</span>
        </div>
      );
    },
  },  
  {
    accessorKey: "email",
    header: ({ column }) => ( 
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original     
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.email)}
            >
              Copy Email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to={`/users/${user.id}`}>Details</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];