import type { SensorSummary } from "../../../types";
import { useMemo } from "react";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Clock, Heart, Activity, Droplet } from "lucide-react";

interface SensorSummaryProps {
  sensorsData: SensorSummary[];
  isLoading: boolean;
}

export default function UserSensorSummary({ sensorsData, isLoading }: SensorSummaryProps) {
  // Reverse the sensor data to display the most recent first
  const sortedData = useMemo(() => [...sensorsData].reverse(), [sensorsData]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="flex justify-center p-4">
      <div className="flex-grow h-96 overflow-auto rounded-md border">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex items-center space-x-2">
                  <Clock size={16} />
                  <span>Last Measurement</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center space-x-2">
                  <Heart size={16} />
                  <span>Heart Rate</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center space-x-2">
                  <Activity size={16} />
                  <span>Blood Pressure</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center space-x-2">
                  <Droplet size={16} />
                  <span>Oxygen Saturation</span>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.lastMeasurement.toLocaleString()}</TableCell>
                <TableCell>{item.heartRate}</TableCell>
                <TableCell>
                  {item.bloodPressure.systolic}/{item.bloodPressure.diastolic}
                </TableCell>
                <TableCell>{item.oxygenSaturation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
