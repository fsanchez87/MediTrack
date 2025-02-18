import { Droplet, TrendingUp, TrendingDown } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import type { SensorSummary } from "@/types";

interface OxygenSaturationRadialChartProps {
  sensorsData: SensorSummary[];
}

export function OxygenSaturationRadialChart({ sensorsData }: OxygenSaturationRadialChartProps) {
  // Sort sensor data chronologically
  const sortedData = [...sensorsData].sort(
    (a, b) => a.lastMeasurement.getTime() - b.lastMeasurement.getTime()
  );

  const lastData = sortedData.length > 0 ? sortedData[sortedData.length - 1] : null;
  const lastOxygenSaturation = lastData ? lastData.oxygenSaturation : 0;

  // TODO: Export external
  // Calculate trending percentage based on comparison with the previous measurement
  let trendingPercentage = 0;
  if (sortedData.length > 1) {
    const previousData = sortedData[sortedData.length - 2];
    if (previousData.oxygenSaturation !== 0) {
      trendingPercentage =
        ((lastOxygenSaturation - previousData.oxygenSaturation) / previousData.oxygenSaturation) * 100;
    }
  }

  const chartData = [
    {
      label: "Oxygen Saturation",
      value: lastOxygenSaturation,
      fill: "var(--color-oxygen)",
    },
  ];

  const chartConfig: ChartConfig = {
    oxygen: {
      label: "Oxygen Saturation",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="flex items-center">
          <Droplet className="mr-2" size={20} />
          Oxygen Saturation
        </CardTitle>
        <CardDescription>
          Last Measurement: {lastData?.lastMeasurement?.toLocaleTimeString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[250px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              data={chartData}
              startAngle={0}
              endAngle={250}
              innerRadius={80}
              outerRadius={110}
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                className="first:fill-muted last:fill-background"
                polarRadius={[86, 74]}
              />
              <RadialBar dataKey="value" background cornerRadius={10} />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-4xl font-bold"
                          >
                            {lastOxygenSaturation.toFixed(0)}%
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Oxygen
                          </tspan>
                        </text>
                      );
                    }
                    return null;
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
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
          Displaying the last oxygen saturation measurement
        </div>
      </CardFooter>
    </Card>
  );
}
