
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const defaultWeatherData = [
  { date: "14/05/2025", condition: "Soleggiato", temp: "24°C", wind: "5 km/h", rain: "0 mm", impacts: "Nessuno" },
  { date: "13/05/2025", condition: "Nuvoloso", temp: "22°C", wind: "12 km/h", rain: "0 mm", impacts: "Nessuno" },
  { date: "12/05/2025", condition: "Pioggia leggera", temp: "19°C", wind: "15 km/h", rain: "12 mm", impacts: "Ritardo minimo nei lavori esterni" },
  { date: "11/05/2025", condition: "Pioggia forte", temp: "17°C", wind: "28 km/h", rain: "35 mm", impacts: "Sospensione lavori esterni per 4 ore" },
  { date: "10/05/2025", condition: "Soleggiato", temp: "21°C", wind: "8 km/h", rain: "0 mm", impacts: "Nessuno" },
];

const WeatherConditions = () => {
  const [weatherData] = useState(defaultWeatherData);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'soleggiato':
        return '☀️';
      case 'nuvoloso':
        return '☁️';
      case 'pioggia leggera':
        return '🌦️';
      case 'pioggia forte':
        return '🌧️';
      case 'neve':
        return '❄️';
      case 'temporale':
        return '⛈️';
      default:
        return '🌤️';
    }
  };

  const getImpactColor = (impacts: string) => {
    if (impacts.toLowerCase().includes('sospensione')) {
      return 'text-red-600';
    } else if (impacts.toLowerCase().includes('ritardo')) {
      return 'text-amber-600';
    }
    return 'text-green-600';
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Condizioni Meteorologiche</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condizione</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temp.</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vento</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pioggia</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impatto</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {weatherData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.date}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className="flex items-center gap-2">
                      <span className="text-lg">{getWeatherIcon(item.condition)}</span>
                      {item.condition}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">{item.temp}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">{item.wind}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">{item.rain}</td>
                  <td className={`px-4 py-3 whitespace-nowrap text-sm font-medium ${getImpactColor(item.impacts)}`}>
                    {item.impacts}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherConditions;
