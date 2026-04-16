import { useState } from "react";

const API_KEY = "bd5e378503939ddaee76f12ad7a97608";

function getWeatherBg(id) {
  if (id >= 200 && id < 300) return "from-gray-600 to-gray-800";
  if (id >= 300 && id < 600) return "from-blue-500 to-indigo-700";
  if (id >= 600 && id < 700) return "from-blue-200 to-slate-300";
  if (id >= 700 && id < 800) return "from-yellow-300 to-orange-400";
  if (id === 800) return "from-sky-400 to-blue-500";
  return "from-slate-400 to-blue-400";
}

function StatBox({ emoji, label, value }) {
  return (
    <div className="bg-white/20 rounded-2xl p-3 text-white text-center">
      <p className="text-2xl">{emoji}</p>
      <p className="text-xs font-semibold uppercase tracking-wide text-white/70 mt-1">
        {label}
      </p>
      <p className="text-base font-bold">{value}</p>
    </div>
  );
}

function WeatherCard({ data }) {
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const condition = data.weather[0].description;
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  const id = data.weather[0].id;
  const bgClass = getWeatherBg(id);

  return (
    <div
      className={`bg-gradient-to-br ${bgClass} rounded-3xl shadow-2xl overflow-hidden w-full max-w-sm mx-auto`}
    >
      <div className="px-6 pt-6 pb-4 text-white">
        <div className="flex items-center justify-between mb-1">
          <div>
            <h2 className="text-3xl font-extrabold">{data.name}</h2>
            <p className="text-white/80 text-sm font-semibold uppercase tracking-widest">
              {data.sys.country}
            </p>
          </div>
          <img
            src={iconUrl}
            alt={condition}
            className="w-20 h-20 drop-shadow-lg"
          />
        </div>
        <p className="text-7xl font-extrabold mt-2">{temp}°C</p>
        <p className="capitalize text-white/90 text-lg font-semibold mt-1">
          {condition}
        </p>
        <p className="text-white/70 text-sm">Feels like {feelsLike}°C</p>
      </div>
      <div className="bg-white/20 backdrop-blur-sm mx-4 mb-6 rounded-2xl p-4 grid grid-cols-2 gap-3">
        <StatBox emoji="💧" label="Humidity" value={`${data.main.humidity}%`} />
        <StatBox
          emoji="💨"
          label="Wind Speed"
          value={`${data.wind.speed} m/s`}
        />
        <StatBox
          emoji="👁️"
          label="Visibility"
          value={`${(data.visibility / 1000).toFixed(1)} km`}
        />
        <StatBox
          emoji="🌡️"
          label="Pressure"
          value={`${data.main.pressure} hPa`}
        />
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-14 h-14 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="text-blue-600 font-semibold mt-4 text-sm">
        Fetching weather...
      </p>
    </div>
  );
}

function ErrorBox({ message }) {
  return (
    <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-center max-w-sm mx-auto">
      <p className="text-4xl mb-3">😕</p>
      <p className="text-red-600 font-bold text-lg">Oops!</p>
      <p className="text-red-500 text-sm mt-1">{message}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center text-blue-400 mt-8">
      <p className="text-6xl mb-3">🔍</p>
      <p className="font-semibold text-sm">
        Type a city above and press{" "}
        <span className="text-blue-600 font-bold">Go!</span>
      </p>
    </div>
  );
}

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    const trimmed = city.trim();
    if (!trimmed) {
      setError("Please type a city name first! 🏙️");
      return;
    }
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(trimmed)}&appid=${API_KEY}&units=metric`,
      );
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error(
            `City "${trimmed}" not found. Check the spelling and try again!`,
          );
        }
        throw new Error("Something went wrong. Please try again later.");
      }
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-200 flex flex-col items-center justify-start px-4 py-10">
 
      <div className="text-center mb-8">
        <p className="text-5xl mb-2">🌤️</p>
        <h1 className="text-4xl font-extrabold text-blue-700">Weather App</h1>
        <p className="text-blue-500 text-sm mt-1 font-semibold">
          Search any city in the world!
        </p>
      </div>

      <div className="flex gap-2 w-full max-w-sm mb-6">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
          placeholder="e.g. London, Tokyo..."
          className="flex-1 px-4 py-3 rounded-2xl border-2 border-blue-300 focus:border-blue-500 focus:outline-none text-gray-700 font-semibold shadow-sm placeholder:text-gray-400 text-sm bg-white"
        />
        <button
          onClick={fetchWeather}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 active:scale-95 disabled:opacity-60 text-white font-bold px-5 py-3 rounded-2xl shadow-md transition-all duration-150 cursor-pointer"
        >
          {loading ? "..." : "Go!"}
        </button>
      </div>

      {loading && <LoadingSpinner />}
      {error && !loading && <ErrorBox message={error} />}
      {weather && !loading && <WeatherCard data={weather} />}
      {!weather && !loading && !error && <EmptyState />}

      <p className="text-xs text-blue-300 mt-10 font-semibold">
        Made By HUZAIF TARAZI 
      </p>
    </div>
  );
}
