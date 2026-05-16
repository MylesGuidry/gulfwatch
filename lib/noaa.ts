export async function getBuoyData() {
    const response = await fetch(
      "https://www.ndbc.noaa.gov/data/realtime2/42007.txt"
    );
  
    const text = await response.text();
  
    const lines = text.split("\n");
  
    const latest = lines[2].trim().split(/\s+/);
  
    return {
      waterTemp: latest[14],
      windSpeed: latest[6],
      waveHeight: latest[8],
    };
  }