import { getMarineScore } from "@/lib/score";
import { getBuoyData } from "../lib/noaa";

export default async function Home() {
  const buoy = await getBuoyData();
  console.log(buoy.raw);

const data = {
  station: "42007",
  name: "Gulf Buoy 42040",
  waterTemp: Number(buoy.waterTemp),
  windSpeed: Number(buoy.windSpeed),
  waveHeight: Number(buoy.waveHeight),
};

  const score = getMarineScore(data);

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold text-slate-900">
          GulfWatch
        </h1>

        <p className="mt-2 text-slate-600">
          Marine Health Dashboard for the Gulf Coast
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card title="Station" value={data.name} />

<Card
  title="Water Temp"
  value={Number.isNaN(data.waterTemp) ? "N/A" : `${data.waterTemp} °C`}
/>

<Card
  title="Wind Speed"
  value={Number.isNaN(data.windSpeed) ? "N/A" : `${data.windSpeed} m/s`}
/>
<Card
  title="Wave Height"
  value={Number.isNaN(data.waveHeight) ? "N/A" : `${data.waveHeight} m`}
/>
        </div>

        <p className="mt-4 text-sm text-slate-500">
  Some values may show N/A when the NOAA buoy is not reporting that measurement.
</p>

        <div className="mt-6 rounded-2xl bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-slate-900">
            Marine Health Score
          </h2>

          <p className="mt-4 text-5xl font-bold text-slate-900">
            {score}/100
          </p>

          <p className="mt-2 text-slate-600">
            Higher score means healthier and calmer conditions.
          </p>
        </div>
      </section>
    </main>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow">
      <p className="text-sm text-slate-500">{title}</p>

      <p className="mt-2 text-2xl font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}