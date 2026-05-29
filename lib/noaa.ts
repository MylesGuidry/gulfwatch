export async function getBuoyData() {
  const response = await fetch(
    "https://www.ndbc.noaa.gov/data/realtime2/42040.txt"  );

  const text = await response.text();

  const lines = text.split("\n");

  // Actual newest data row
  const latest = lines[2].trim().split(/\s+/);

  return {
    windSpeed: latest[6],
    waveHeight: latest[8],
    waterTemp: latest[14],
    raw: latest,
  };
}