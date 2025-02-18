import { TrendingUp, TrendingDown, Droplet } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
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
import type { SensorSummary } from "@/types";

interface OxygenSaturationChartData {
  time: string;
  saturation: number;
  deficit: number;
}

interface OxygenSaturationBarChartProps {
  sensorsData: SensorSummary[];
}

const chartConfig: ChartConfig = {
  saturation: {
    label: "Saturation",
    color: "hsl(var(--chart-1))",
  },
  deficit: {
    label: "Deficit",
    color: "hsl(var(--chart-2))",
  },
};

export function OxygenSaturationBarChart({ sensorsData }: OxygenSaturationBarChartProps) {
  // Use only the last 6 sensor records
  const displayedSensorsData = sensorsData.slice(-6);

  // Convert sensor data into chart data
  const chartData: OxygenSaturationChartData[] = displayedSensorsData.map((sensor) => {
    const date = new Date(sensor.lastMeasurement);
    return {
      time: date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      saturation: sensor.oxygenSaturation,
      deficit: 100 - sensor.oxygenSaturation,
    };
  });

  // TODO: Export function
  // Calculate trending percentage using the displayed sensor data
  let trendingPercentage = 0;
  if (displayedSensorsData.length > 1) {
    const lastValue = displayedSensorsData[displayedSensorsData.length - 1].oxygenSaturation;
    const previousValue = displayedSensorsData[displayedSensorsData.length - 2].oxygenSaturation;
    if (previousValue !== 0) {
      trendingPercentage = ((lastValue - previousValue) / previousValue) * 100;
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Droplet className="mr-2" size={20} />
          Oxygen Saturation 
        </CardTitle>
        <CardDescription>
          {displayedSensorsData.length > 0
            ? `${new Date(displayedSensorsData[0].lastMeasurement).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })} - ${new Date(
                displayedSensorsData[displayedSensorsData.length - 1].lastMeasurement
              ).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}`
            : ""}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[200px] w-full">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tickFormatter={(value) => value}
              />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="saturation"
                stackId="a"
                fill="var(--color-deficit)"
                radius={[0, 0, 4, 4]}
              />
              <Bar
                dataKey="deficit"
                stackId="a"
                fill="var(--color-saturation)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
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
          Showing oxygen saturation for the selected period
        </div>
      </CardFooter>
    </Card>
  );
}
