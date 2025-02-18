import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/app/dashboard/components/sidebar"
import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <SidebarProvider>
      <DashboardSidebar variant="floating" />
        <Outlet/>
    </SidebarProvider>
  )
}
