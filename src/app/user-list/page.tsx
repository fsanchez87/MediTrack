import { useEffect, useState } from "react";
import { DataTable } from "./components/data-table";
import { User } from "@/types";
import { columns } from "./components/columns";

const URL_API: string = 'https://dummyjson.com/users'; 

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(URL_API)
    .then(async res => await res.json())
    .then(res => {
      setUsers(res.users)
      setIsLoading(false)
    })
    .catch(err => {
      console.log(err)
      setIsLoading(false) 
      }
    )
  }, [])

  if (isLoading) return <p>Loading ...</p>

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Patient List</h2>
          <p className="text-muted-foreground">
          View and manage the list of patients in the system.
          </p>
        </div>
      </div>
    <DataTable columns={columns} data={users} />
  </div>
  );
}
