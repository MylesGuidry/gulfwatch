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
  const lastUpdated = `${buoy.month}/${buoy.day}/${buoy.year} at ${buoy.hour}:${buoy.minute} UTC`;
  const score = getMarineScore(data);

  const condition =
  score >= 85 ? "Stable" :
  score >= 65 ? "Caution" :
  "Risk";

const conditionStyle =
  score >= 85
    ? "bg-green-100 text-green-700"
    : score >= 65
    ? "bg-yellow-100 text-yellow-700"
    : "bg-red-100 text-red-700";

  return (
    <main className="min-h-screen bg-gradient-to-b from-cyan-100 via-slate-100 to-slate-100 p-8">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold text-slate-900">
          GulfWatch
        </h1>

        <p className="mt-2 text-slate-600">
          Marine Health Dashboard for the Gulf Coast
        </p>

        <div className="mt-4 rounded-xl bg-cyan-50 px-4 py-3 text-sm text-cyan-800">
          <p>Last Updated: {lastUpdated}</p>
          <p>Source: NOAA NDBC Station 42040</p>
        </div>

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

<div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4">
  <h3 className="font-semibold text-blue-900">
    Conditions Summary
  </h3>

  <p className="mt-2 text-blue-800">
    Current buoy data indicates generally stable marine conditions.
    Wind speeds are moderate and no hazardous wave activity has been reported.
  </p>
</div>

        <div className="mt-6 rounded-2xl bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-slate-900">
            Marine Health Score
          </h2>

          <p className="mt-4 text-5xl font-bold text-slate-900">
            {score}/100
          </p>

          <span
  className={`mt-3 inline-block rounded-full px-4 py-1 text-sm font-semibold ${conditionStyle}`}
>
  {condition}
</span>

<div className="mt-4">
  <div className="flex justify-between text-sm text-slate-600">
    <span>Health Index</span>
    <span>{score}%</span>
  </div>

  <div className="mt-2 h-3 w-full rounded-full bg-slate-200">
    <div
      className={`h-3 rounded-full ${
        score >= 85
          ? "bg-green-500"
          : score >= 65
          ? "bg-yellow-500"
          : "bg-red-500"
      }`}
      style={{ width: `${score}%` }}
    />
  </div>
</div>

          <p className="mt-2 text-slate-600">
            Higher score means healthier and calmer conditions.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
  <div className="rounded-lg border border-slate-200 bg-white p-3">
    <p className="font-semibold text-slate-900">Wind</p>
    <p className="font-semibold text-slate-900">
      {data.windSpeed < 10 ? "Light" : "Moderate"}
    </p>
  </div>

  <div className="rounded-lg border border-slate-200 bg-white p-3">
    <p className="font-semibold text-slate-900">Waves</p>
    <p className="font-semibold text-slate-900">
      {Number.isNaN(data.waveHeight)
        ? "Unknown"
        : data.waveHeight < 1
        ? "Calm"
        : "Moderate"}
    </p>
  </div>

  <div className="rounded-lg border border-slate-200 bg-white p-3">
    <p className="text-sm text-slate-500">Status</p>
    <p className="font-semibold text-green-600">Operational</p>
  </div>
</div>

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