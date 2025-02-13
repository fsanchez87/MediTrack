import React from "react";
import { Outlet, useParams, Navigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./components/sidebar-nav";

const UserDetailsLayout: React.FC = () => {
  const { userId } = useParams();

  if (!userId) {
    return <Navigate to="/users" replace />;
  }

  const sidebarNavItems = [
    {
      title: "Patient Overview",
      to: `/users/${userId}/overview`,
    },
    {
      title: "Sensor Summary",
      to: `/users/${userId}/sensors-summary`,
    },
    {
      title: "Sensor Graphs",
      to: `/users/${userId}/sensors-graphs`,
    },
  ];

  return (
    <div className="hidden space-y-6 p-10 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Patient Data</h2>
        <p className="text-muted-foreground">
          View and analyze the patient’s telemetry data, including key sensor metrics and visual trends.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDetailsLayout;
