import { useEffect, useState } from "react";
import { DataTable } from "./components/data-table";
import { User } from "@/types";
import { columns } from "./components/columns";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// TODO: Export to file config
const URL_API: string = "https://dummyjson.com/users";

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // TODO: USE TanStackQuery
  useEffect(() => {
    fetch(URL_API)
      .then(async (res) => await res.json())
      .then((res) => {
        setUsers(res.users);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading ...</p>;
  if (error)
    return (
      <p className="text-red-600">
        An error occurred while fetching the patients. Please try again later.
      </p>
    );

  return (
    <SidebarInset className="flex h-screen flex-col">
      <header className="flex h-16 shrink-0 items-center border-b px-4">
        <SidebarTrigger className="mr-2 -ml-1" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:inline-flex">
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:inline-flex" />
            <BreadcrumbItem>
              <BreadcrumbPage>Patients</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-grow flex-col space-y-6 overflow-hidden p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Patients
          </Button>
        </div>
        <DataTable columns={columns} data={users} />
      </div>
    </SidebarInset>
  );
}
