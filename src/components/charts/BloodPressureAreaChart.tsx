import { useState } from "react";
import { TrendingUp, TrendingDown, HeartPulse } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SensorSummary } from "@/types";

interface BloodPressureData {
  date: string;
  systolic: number;
  diastolic: number;
}

interface BloodPressureAreaChartProps {
  sensorsData: SensorSummary[];
}

export function BloodPressureAreaChart({ sensorsData }: BloodPressureAreaChartProps) {
  const [timeRange, setTimeRange] = useState("24h");

  // Convert sensor data into chart data with date, systolic and diastolic values
  const fullChartData: BloodPressureData[] = sensorsData.map((sensor) => ({
    date: sensor.lastMeasurement.toISOString(),
    systolic: sensor.bloodPressure.systolic,
    diastolic: sensor.bloodPressure.diastolic,
  }));

  // Determine the most recent measurement date
  const dates = fullChartData.map((item) => new Date(item.date));
  const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));

  // Calculate hours to subtract based on selected time range
  const hoursToSubtract = timeRange === "6h" ? 6 : timeRange === "12h" ? 12 : 24;
  const startDate = new Date(maxDate);
  startDate.setHours(startDate.getHours() - hoursToSubtract);

  // Filter data to include only measurements within the selected time range
  const filteredData = fullChartData.filter(
    (item) => new Date(item.date) >= startDate
  );

  // TODO: Export function
  // Calculate trending percentage based on change in systolic pressure
  let trendingPercentage = 0;
  if (filteredData.length > 1) {
    const lastValue = filteredData[filteredData.length - 1].systolic;
    const previousValue = filteredData[filteredData.length - 2].systolic;
    if (previousValue !== 0) {
      trendingPercentage = ((lastValue - previousValue) / previousValue) * 100;
    }
  }

  // Chart configuration for labels and colors
  const chartConfig: ChartConfig = {
    systolic: { label: "Systolic", color: "hsl(var(--chart-1))" },
    diastolic: { label: "Diastolic", color: "hsl(var(--chart-2))" },
  };

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle className="flex items-center">
            <HeartPulse className="mr-2" size={20} />
            Blood Pressure
          </CardTitle>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a time range"
          >
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="24h" className="rounded-lg">
              Last 24 hours
            </SelectItem>
            <SelectItem value="12h" className="rounded-lg">
              Last 12 hours
            </SelectItem>
            <SelectItem value="6h" className="rounded-lg">
              Last 6 hours
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[195px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="fillSystolic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartConfig.systolic.color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={chartConfig.systolic.color} stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillDiastolic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartConfig.diastolic.color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={chartConfig.diastolic.color} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) =>
                      new Date(value).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    }
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="diastolic"
                type="monotone"
                fill="url(#fillDiastolic)"
                stroke={chartConfig.diastolic.color}
                stackId="1"
              />
              <Area
                dataKey="systolic"
                type="monotone"
                fill="url(#fillSystolic)"
                stroke={chartConfig.systolic.color}
                stackId="1"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {trendingPercentage >= 0 ? (
            <>
              <TrendingUp className="h-4 w-4" />
              Up {Math.abs(trendingPercentage).toFixed(1)}% compared to previous reading
            </>
          ) : (
            <>
              <TrendingDown className="h-4 w-4" />
              Down {Math.abs(trendingPercentage).toFixed(1)}% compared to previous reading
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Displaying blood pressure readings
        </div>
      </CardFooter>
    </Card>
  );
}
