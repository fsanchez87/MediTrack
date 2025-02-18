import { TrendingUp, TrendingDown, HeartPulse } from "lucide-react";
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
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
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { SensorSummary } from "@/types";

interface HeartRateLineChartProps {
  sensorsData: SensorSummary[];
}

const chartConfig: ChartConfig = {
  heartRate: {
    label: "Heart Rate",
    color: "hsl(var(--chart-1))",
  },
};

export function HeartRateLineChart({ sensorsData }: HeartRateLineChartProps) {
  // Use only the last 10 records
  const displayedData = sensorsData.slice(-10);

  // Calculate the trending percentage using the displayed data
  let trendingPercentage = 0;
  if (displayedData.length > 1) {
    const lastValue = displayedData[displayedData.length - 1].heartRate;
    const previousValue = displayedData[displayedData.length - 2].heartRate;
    if (previousValue !== 0) {
      trendingPercentage = ((lastValue - previousValue) / previousValue) * 100;
    }
  }

  // TODO: Export function
  // Function to format date and time
  const formatDateTime = (value: string | number | Date) => {
    const d = new Date(value);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <HeartPulse className="mr-2" size={20} />
          Heart Rate
        </CardTitle>
        <CardDescription>
          {displayedData.length > 0
            ? `${formatDateTime(displayedData[0].lastMeasurement)} - ${formatDateTime(
                displayedData[displayedData.length - 1].lastMeasurement
              )}`
            : ""}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[200px] w-full">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={displayedData}
              margin={{
                top: 30,
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="lastMeasurement"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={formatDateTime}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="line"
                    labelFormatter={formatDateTime}
                  />
                }
              />
              <Line
                dataKey="heartRate"
                type="natural"
                stroke="var(--color-heartRate)"
                strokeWidth={2}
                dot={{ fill: "var(--color-heartRate)" }}
                activeDot={{ r: 6 }}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Line>
            </LineChart>
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
          Showing sensor heart rate for the selected period
        </div>
      </CardFooter>
    </Card>
  );
}
