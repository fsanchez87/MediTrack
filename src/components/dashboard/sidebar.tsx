import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Building2,
  LayoutDashboard,
  Users,
  Settings,
} from "lucide-react";
import NavMain from "@/components/dashboard/nav-main";
import NavUser from "@/components/dashboard/nav-user";
import CompanySwitcher from "./company-switcher";

const data = {
  user: {
    name: "Francisco Sánchez",
    email: "fsanchez@example.com",
    avatar: "https://source.unsplash.com/random/32x32?face",
  },
  companies: [
    {
      name: "Umbrella Corp",
      logo: Building2,
      plan: "Enterprise",
    }
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },   
    {
      title: "Patients",
      url: "/dashboard/users",
      icon: Users,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
      items: [
        {
          title: "Profile",
          url: "/dashboard/settings/profile",
        },
      ],
    },
  ],
};

export function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <h2 className="text-lg font-bold">
                <span className="hidden group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:h-full group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center">
                  MT
                </span>
                <span className="group-data-[collapsible=icon]:hidden">MediTrack Dashboard</span>
              </h2>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu> */}
        <CompanySwitcher companies={data.companies} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
