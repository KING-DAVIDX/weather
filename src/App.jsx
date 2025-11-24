import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge, Thermometer, MapPin, Search } from 'lucide-react';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('Ikeja');
  const [searchInput, setSearchInput] = useState('');

  const getWeatherEmoji = (code, isDay) => {
    if (code === 1000) return isDay ? '☀️' : '🌙';
    if ([1003, 1006, 1009].includes(code)) return '☁️';
    if ([1063, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(code)) return '🌧️';
    if ([1066, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(code)) return '❄️';
    if ([1087, 1273, 1276, 1279, 1282].includes(code)) return '⛈️';
    if ([1030, 1135, 1147].includes(code)) return '🌫️';
    return '🌤️';
  };

  const fetchWeather = async (location) => {
    setLoading(true);
    try {
      const response = await fetch(`/api?q=${location}`);
      const data = await response.json();
      setWeather(data.data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput);
      setSearchInput('');
    }
  };

  if (loading && !weather) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
      </div>
    );
  }

  if (!weather) return null;

  const { current, location } = weather;
  const weatherEmoji = getWeatherEmoji(current.condition.code, current.is_day);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">
            👑 King Xer Weather
          </h1>
          <p className="text-white text-sm md:text-lg opacity-90">Your Royal Weather Forecast</p>
        </div>

        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
              placeholder="Enter city name..."
              className="flex-1 px-4 md:px-6 py-3 rounded-full text-base md:text-lg focus:outline-none focus:ring-2 md:focus:ring-4 focus:ring-white/50"
            />
            <button
              onClick={handleSearch}
              className="bg-white text-blue-600 px-4 md:px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <Search size={18} />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-lg rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 md:p-8 text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
              <div className="flex items-center gap-2">
                <MapPin size={20} />
                <h2 className="text-xl md:text-3xl font-bold">
                  {location.name}, {location.region}
                </h2>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs md:text-sm opacity-90">🌍 {location.country}</p>
                <p className="text-xs md:text-sm opacity-90">{location.localtime}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <div className="text-5xl md:text-8xl font-bold mb-1 md:mb-2">
                  {current.temp_c}°C
                </div>
                <div className="text-lg md:text-2xl opacity-90">{current.temp_f}°F</div>
              </div>
              <div className="text-center">
                <div className="text-6xl md:text-8xl mb-1 md:mb-2">{weatherEmoji}</div>
                <div className="text-lg md:text-xl font-semibold">{current.condition.text}</div>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Weather Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-6 rounded-xl md:rounded-2xl">
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <Thermometer className="text-red-500" size={20} />
                  <span className="text-gray-600 font-medium text-sm md:text-base">Feels Like</span>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-800">
                  {current.feelslike_c}°C
                </div>
                <div className="text-xs md:text-sm text-gray-600">{current.feelslike_f}°F</div>
              </div>

              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-4 md:p-6 rounded-xl md:rounded-2xl">
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <Droplets className="text-blue-500" size={20} />
                  <span className="text-gray-600 font-medium text-sm md:text-base">Humidity</span>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-800">
                  {current.humidity}%
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 md:p-6 rounded-xl md:rounded-2xl">
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <Wind className="text-green-500" size={20} />
                  <span className="text-gray-600 font-medium text-sm md:text-base">Wind Speed</span>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-800">
                  {current.wind_kph}
                </div>
                <div className="text-xs md:text-sm text-gray-600">km/h {current.wind_dir}</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 md:p-6 rounded-xl md:rounded-2xl">
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <Eye className="text-purple-500" size={20} />
                  <span className="text-gray-600 font-medium text-sm md:text-base">Visibility</span>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-800">
                  {current.vis_km}
                </div>
                <div className="text-xs md:text-sm text-gray-600">km</div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 md:p-6 rounded-xl md:rounded-2xl">
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <Gauge className="text-orange-500" size={20} />
                  <span className="text-gray-600 font-medium text-sm md:text-base">Pressure</span>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-800">
                  {current.pressure_mb}
                </div>
                <div className="text-xs md:text-sm text-gray-600">mb</div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 md:p-6 rounded-xl md:rounded-2xl">
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <Sun className="text-yellow-500" size={20} />
                  <span className="text-gray-600 font-medium text-sm md:text-base">UV Index</span>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-800">
                  {current.uv}
                </div>
                <div className="text-xs md:text-sm text-gray-600">
                  {current.uv < 3 ? 'Low' : current.uv < 6 ? 'Moderate' : current.uv < 8 ? 'High' : 'Very High'}
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 rounded-xl md:rounded-2xl">
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <Cloud className="text-gray-500" size={20} />
                  <span className="text-gray-600 font-medium text-sm md:text-base">Cloud Cover</span>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-800">
                  {current.cloud}%
                </div>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 md:p-6 rounded-xl md:rounded-2xl">
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <CloudRain className="text-pink-500" size={20} />
                  <span className="text-gray-600 font-medium text-sm md:text-base">Precipitation</span>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-800">
                  {current.precip_mm}
                </div>
                <div className="text-xs md:text-sm text-gray-600">mm</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-6 md:mt-8 text-white">
          <p className="text-xs md:text-sm opacity-80">
            Last updated: {current.last_updated} | Made with 👑 by King Xer
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
