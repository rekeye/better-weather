import React from 'react';
import PropTypes from 'prop-types';
import './styles/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../../assets/const/icons.js'

class Current extends React.Component {
    render() {
        const weather = this.props.weather;
        const airly = this.props.airly;
        const timezone = this.props.timezone;

        if(airly===undefined || weather===undefined) return(<main className='main'>Loading...</main>);
            
        const airPollutantsList = airly.standards.map((obj) => 
            <div key={obj.pollutant} className='smaller'>{obj.pollutant}: {Math.round(obj.percent)}%</div>
        )
        
        const sunrise = new Date(weather.sunrise * 1000);
        const sunset = new Date(weather.sunset * 1000);
        
        return (
                <main className='main'>
                    <section className='panel panel--main'>
                        <h4 className='panel__title'>Weather</h4>
                        <section className='panel__content'>
                            <div className='panel__division panel__division--left'>
                                <FontAwesomeIcon className='icon' icon={icons[weather.weather[0].icon]}/>
                                <div>{weather.weather[0].description}</div>
                            </div>
                            <div className='panel__division'>
                                <div className="info-container">
                                    <div className='big'>{Math.round(weather.temp * 10) / 10}°C</div>
                                    <div className='small'> Realfeel: {Math.round(weather.feels_like * 10) / 10}°C</div>
                                </div>
                                <div className="info-container small">
                                    <div> Humidity: {weather.humidity}%</div>
                                    <div> Pressure: {weather.pressure}hPa</div>
                                    <div> Wind: {Math.round(weather.wind_speed * 10) / 10}km/h</div>
                                </div>
                            </div>
                        </section>
                    </section>
                    <div className='main__bottom'>
                        <section className='panel panel--additional'>
                            <h4 className='panel__title'>Sunrise and sunset</h4>
                            <section className='panel__content--times small'>
                                {/* placeholder */}
                                <div className='padding'>Sunrise: {sunrise.toLocaleTimeString('en-US', {timeZone: timezone, hour: '2-digit', minute:'2-digit',})}</div>
                                <div className='padding'>Sunset: {sunset.toLocaleTimeString('en-US', {timeZone: timezone, hour: '2-digit', minute:'2-digit',})}</div>
                            </section>
                        </section>
                        <section className='panel panel--additional'>
                            <h4 className='panel__title'>Air quality</h4>
                            <section className='panel__content'>
                                <div className='pollution__circle'>
                                    <div className='big'>{Math.round(airly.indexes[0].value)}</div>
                                    <div className='smaller'>CAQI</div>
                                </div>
                                <div className='pollution__content'>
                                    <div className='small'>{airly.indexes[0].description}</div>
                                    <div className='pollution__list'>
                                        {airPollutantsList}
                                    </div>
                                </div>
                            </section>
                        </section>
                    </div>
                </main>
        );
    }
}

Current.propTypes = {
    weather: PropTypes.object,
    airly: PropTypes.object,
    timezone: PropTypes.string,
}

export default Current;