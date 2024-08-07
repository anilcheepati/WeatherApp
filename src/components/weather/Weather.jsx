import React, { useEffect, useState } from 'react'
import Search from '../search/Search'




const Weather = ({setBgColor}) => {

    // Initial loading state and a function to update the loading page state
    const [loading, setLoading] = useState(false)

    const [weatherData, setWeatherData] = useState(null)

    const [error, setError] = useState(null);  // New state for error handling
    

    async function fetchWeatherData(cityName) {
        setLoading(true)
        setError(null)
        setBgColor("")

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=6d0e5ebe4b61921985f9a26bd8a758ce`);



            const data = await response.json();

            console.log(data, "data")

            if (data.cod === "404") {
                setError("City Not Found");  // Set error message if city is not found
                setBgColor("warning-bg");  // Change background color to warning
                setWeatherData(null);  // Clear weather data if there is an error
            } else {
                setWeatherData(data);  // Set weather data if response is valid

            }

        }


        catch (e) {
            console.log(e);
            setError("An error occurred");  // Set error message if there is an exception
            setBgColor("warning-bg");  // Change background color to warning
        }

        finally {
            setLoading(false)
        }
    }

    async function handleSearch(cityName) {
        fetchWeatherData(cityName)



    }

    //Getting the weekend , month , date with year
    function getCurrentData() {
        return new Date().toLocaleDateString('en-us', {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        })
    }

    //Initialy whenever the app is re-loading "kadapa" city data will be displayed
    useEffect(() => {
        fetchWeatherData("Kadapa")
    }, [])

    console.log(weatherData)

    return (
        <div className="weather">
            <Search
                handleSearch={handleSearch}
            />

            {
                loading ? <div>Loading...</div>
                    : (
                        <div>
                            {error ? (
                                <div className="error-message">{error}</div>  // Display error message if present
                            ) : (
                                <>
                                    <div className="city-name">
                                        <h2>{weatherData?.name}, <span>{weatherData?.sys?.country}</span></h2>

                                    </div>

                                    <div className="date">
                                        <span>{getCurrentData()}</span>
                                    </div>

                                    <div className='temp'>{weatherData?.main?.temp}</div>

                                    <p className="description">
                                        {weatherData && weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].description : ""}
                                    </p>

                                    <div className="weather-info">
                                        <div className='speed-humidity'>

                                            <div>

                                                <p className="wind">{weatherData?.wind?.speed}</p>
                                                <p>Wind Speed</p>

                                            </div>

                                        </div>

                                        <div className='speed-humidity'>

                                            <div>

                                                <p className="humidity">{weatherData?.main?.humidity}</p>
                                                <p>Humidity</p>

                                            </div>

                                        </div>
                                    </div>

                                </>
                            )}

                        </div>

                    )




            }

        </div>
    )
}

export default Weather