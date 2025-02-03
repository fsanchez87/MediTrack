import { type SensorSummary } from "../types";

interface SensorSummaryListProps {
    sensorsData: SensorSummary[];
}

export default function SensorSummaryList({ sensorsData }: SensorSummaryListProps) {
  return (
    <p>{JSON.stringify(sensorsData)}</p>
);
}
