import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Form } from 'react-bootstrap';
import clearIcon from "../assets/imgs/clear.png";
import cloudIcon from "../assets/imgs/cloud.png";
import drizzleIcon from "../assets/imgs/drizzle.png";
import humidityIcon from "../assets/imgs/humidity.png";
import rainIcon from "../assets/imgs/rain.png";
import snowIcon from "../assets/imgs/snow.png";
import searchIcon from "../assets/imgs/search.png";
import windIcon from "../assets/imgs/wind.png";
import '../Components/Meccanismo.css'
function Meccanismo() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [weatherIcon, setWeatherIcon] = useState(null);

    useEffect(() => {
        if (city !== '') {
            fetchWeatherData();
        }
    }, [city]);

    const fetchWeatherData = async () => {
        setLoading(true);
        try {
            const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5eaad9e0793b293a6f88ffd67d1b007b&units=metric`);
            if (!currentWeatherResponse.ok) {
                throw new Error('Errore nella chiamata API per i dati meteorologici correnti');
            }
            const currentWeatherData = await currentWeatherResponse.json();
            setWeatherData({
                temp: currentWeatherData.main.temp,
                conditions: currentWeatherData.weather[0].description
            });
            setWeatherIcon(getWeatherIcon(currentWeatherData.weather[0].description));

            const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=5eaad9e0793b293a6f88ffd67d1b007b&units=metric`);
            if (!forecastResponse.ok) {
                throw new Error('Errore nella chiamata API per i dati meteorologici di previsione');
            }
            const forecastData = await forecastResponse.json();

            const requiredDates = getRequiredDates();
            const filteredForecasts = forecastData.list.filter(forecast =>
                requiredDates.includes(new Date(forecast.dt * 1000).toLocaleDateString('it-IT'))
            );
            setForecastData(filteredForecasts);
            setError(null);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getWeatherIcon = (conditions) => {
        const lowerCaseConditions = conditions.toLowerCase();
        if (lowerCaseConditions.includes('rain')) {
            return rainIcon;
        } else if (lowerCaseConditions.includes('mist') || lowerCaseConditions.includes('fog')) {
            return drizzleIcon;
        } else if (lowerCaseConditions.includes('snow')) {
            return snowIcon;
        } else if (lowerCaseConditions.includes('cloud')) {
            return cloudIcon;
        } else if (lowerCaseConditions.includes('clear')) {
            return clearIcon;
        } else {
            return clearIcon;
        }
    };

    const translateWeatherConditions = (conditions) => {
        const lowerCaseConditions = conditions.toLowerCase();

        switch (lowerCaseConditions) {
            case 'clear sky':
                return 'Cielo Sereno';
            case 'few clouds':
                return 'Poche Nuvole';
            case 'scattered clouds':
                return 'Nuvole Sparse';
            case 'broken clouds':
                return 'Nuvolosità Irregolare';
            case 'shower rain':
                return 'Pioggia a Tratti';
            case 'rain':
                return 'Pioggia';
            case 'thunderstorm':
                return 'Temporale';
            case 'snow':
                return 'Neve';
            case 'mist':
                return 'Nebbia';
            default:
                return conditions; 
        }
    };

    const handleSearch = () => {
        setWeatherData(null);
        setForecastData(null);
        setError(null);
    };

    const getRequiredDates = () => {
        let dates = [];
        for (let i = 0; i < 5; i++) {
            let date = new Date();
            date.setDate(date.getDate() + i);
            dates.push(date.toLocaleDateString('it-IT'));
        }
        return dates;
    };

    return (
        <div className="Meccanismo-Background">
            <Container className="mt-5">
                <Row className=''>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Card>
                            <Card.Body>
                                <Card.Title className="bg-darkMeccanismo-Card-Title">Il Meteo, ora e nei prossimi 5 giorni.</Card.Title>
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        placeholder="Inserisci una città"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        className="Meccanismo-Form-Control"
                                    />
                                </Form.Group>
                               
                                {loading && <div className="Meccanismo-Loading-Message">Caricamento dati...</div>}
                                {error && <Alert variant="danger" className="Meccanismo-Error-Message">Errore: {error}</Alert>}
                                {weatherData && (
                                    <div className="Meccanismo-Weather-Data">
                                        <img src={weatherIcon} alt="Icona Meteo" />
                                        <p className="Meccanismo-Data-Item">Temperatura: {weatherData.temp.toFixed(2)}°C</p>
                                        <p className="Meccanismo-Data-Item">Condizioni: {translateWeatherConditions(weatherData.conditions)}</p>
                                    </div>
                                )}
                                {forecastData && (
                                    <div className="Meccanismo-Forecast">
                                        <h3>Previsioni per i prossimi giorni:</h3>
                                        <ul>
                                            {forecastData.map((forecast, index) => (
                                                <li key={index}>
                                                    Data: {new Date(forecast.dt * 1000).toLocaleDateString('it-IT')}, Temperatura: {forecast.main.temp.toFixed(2)}°C, Condizioni: {translateWeatherConditions(forecast.weather[0].description)}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Meccanismo;
