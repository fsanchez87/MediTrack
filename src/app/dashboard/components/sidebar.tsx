import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Building2,
  LayoutDashboard,
  Users,
  Settings,
} from "lucide-react";
import NavMain from "@/app/dashboard/components/nav-main";
import NavUser from "@/app/dashboard/components/nav-user";
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
      url: "/dashboard/users",
      icon: LayoutDashboard,
      isActive: false,
    },   
    {
      title: "Patients",
      url: "/dashboard/users",
      icon: Users,
      isActive: true,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
      isActive: false,
    },
  ],
};

export function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
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
