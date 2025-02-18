import { SensorSummary } from "../../../types";
import { HeartRateLineChart } from "../../../components/charts/HeartRateLineChart";
import { BloodPressureAreaChart } from "../../../components/charts/BloodPressureAreaChart";
import { OxygenSaturationRadialChart } from "../../../components/charts/OxygenSaturationRadialChart";
import { OxygenSaturationBarChart } from "../../../components/charts/OxygenSaturationBarChart";

interface SensorChartsProps {
  sensorsData: SensorSummary[];
  isLoading: boolean;
}

export default function SensorCharts({ sensorsData, isLoading }: SensorChartsProps ) {

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container-wrapper">
      <div className="container mx-auto py-6">
        <section id="charts" className="scroll-mt-20">
          <div className="grid gap-4 md:flex md:flex-row-reverse md:items-start">
            <div className="grid flex-1 gap-12">
              <div className="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10">
                <BloodPressureAreaChart sensorsData={sensorsData} />
                <OxygenSaturationRadialChart sensorsData={sensorsData} />
                <OxygenSaturationBarChart sensorsData={sensorsData} />
                <div className="md:col-span-2 lg:col-span-3">
                  <HeartRateLineChart sensorsData={sensorsData} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
