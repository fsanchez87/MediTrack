import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import UserSensorSummary from "@/app/user-details/components/UserSensorSummary";
import SensorCharts from "@/app/user-details/components/SensorCharts";
import PatientProfile from "@/app/user-details/components/PatientProfile";
import { SensorData, SensorSummary } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// TODO: Export to config file
const URL_SENSOR: string = "https://dummyjson.com/c/2a53-476e-482b-81ec";

const getRandomValue = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export default function UserDetails() {
  const { userId } = useParams<{ userId: string }>();
  const [sensorsData, setSensorsData] = useState<SensorSummary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Polling function: receives the interval in seconds
  function startPolling(intervalSeconds: number) {
    return setInterval(() => {
      const newSensor: SensorSummary = {
        lastMeasurement: new Date(),
        heartRate: getRandomValue(60, 100),
        bloodPressure: {
          systolic: getRandomValue(100, 140),
          diastolic: getRandomValue(60, 90),
        },
        oxygenSaturation: getRandomValue(60, 100),
      };

      // Add the new sensor data to state and sort by measurement date
      setSensorsData((prev) =>
        [...prev, newSensor].sort(
          (a, b) => a.lastMeasurement.getTime() - b.lastMeasurement.getTime()
        )
      );
    }, intervalSeconds * 1000);
  }

  // TODO: USE TanStackQuery
  useEffect(() => {
    fetch(URL_SENSOR)
      .then(async (res) => await res.json())
      .then((data) => {
        interface SensorDataResponse {
          sensorData: SensorData[];
        }

        const filteredSensors: SensorSummary[] = (data as SensorDataResponse).sensorData
          .filter((sensorData: SensorData) => sensorData.userId === Number(userId))
          .map((sensorData: SensorData) => ({
            ...sensorData.sensorSummary,
            lastMeasurement: new Date(sensorData.sensorSummary.lastMeasurement),
          }))
          .sort(
            (a, b) =>
              a.lastMeasurement.getTime() - b.lastMeasurement.getTime()
          );

        setSensorsData(filteredSensors);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setIsLoading(false);
      });
  }, [userId]);

  // Effect to start polling every 5 seconds
  useEffect(() => {
    const intervalId = startPolling(5);
    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error)
    return (
      <SidebarInset className="p-6">
        <p className="text-red-600">
          An error occurred while fetching sensor data. Please try again later.
        </p>
      </SidebarInset>
    );

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/dashboard/users">Patients</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Overview</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Patient Details</h1>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sensors-summary">Sensors Summary</TabsTrigger>
            <TabsTrigger value="sensors-graphs">Sensors Graphs</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <PatientProfile />
          </TabsContent>
          <TabsContent value="sensors-summary" className="space-y-4">
            <UserSensorSummary sensorsData={sensorsData} isLoading={isLoading} />
          </TabsContent>
          <TabsContent value="sensors-graphs" className="space-y-4">
            <SensorCharts sensorsData={sensorsData} isLoading={isLoading} />
          </TabsContent>
        </Tabs>
      </div>
    </SidebarInset>
  );
}

