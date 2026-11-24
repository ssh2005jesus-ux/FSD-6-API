

import { useState } from 'react';
import { getWeather } from '../services.jsx/weather';

function Home() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSearch() {
        if (city.trim() === '') {
            setError('Please enter a city name');
            return;
        }

        setLoading(true);
        setError('');
        setWeather(null);

        try {
            const data = await getWeather(city.trim());
            setWeather(data);
        } catch (err) {
            setError('City not found. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="home">

            <h1>Track Weather Anywhere</h1>

            <p className="subtitle">
                Get real-time weather data and 5-day forecasts
                for any location worldwide.
            </p>

            <div className="search-box">
                <input
                    type="text"
                    placeholder="Enter your city..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSearch();
                    }}
                />

                <button onClick={handleSearch} disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>

            {error && <p className="error">{error}</p>}

            {weather && (
                <div className="weather-card">

                    <div className="weather-left">
                        <h2>
                            {weather.name}, {weather.sys.country}
                        </h2>

                        <p>{new Date().toLocaleDateString()}</p>

                        <h1>{Math.round(weather.main.temp)}°C</h1>

                        <p>{weather.weather[0].description}</p>
                    </div>

                    <div className="weather-right">
                        <p>
                            Humidity
                            <strong>{weather.main.humidity}%</strong>
                        </p>

                        <p>
                            Wind Speed
                            <strong>{weather.wind.speed} m/s</strong>
                        </p>

                        <p>
                            Pressure
                            <strong>{weather.main.pressure} hPa</strong>
                        </p>
                    </div>

                </div>
            )}

        </div>
    );
}

export default Home;
