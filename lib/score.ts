type MarineData = {
    waterTemp: number;
    windSpeed: number;
    waveHeight: number;
  };
  
  export function getMarineScore(data: MarineData) {
    let score = 100;
  
    if (data.waterTemp > 30) score -= 15;
    if (data.windSpeed > 12) score -= 10;
    if (data.windSpeed > 18) score -= 10;
    if (data.waveHeight > 1.5) score -= 10;
    if (data.waveHeight > 2.5) score -= 15;
  
    return Math.max(score, 0);
  }