import React from 'react';
import PropTypes from 'prop-types';
import './styles/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../../assets/const/icons.js'

class Dbd extends React.Component {
    render() {
        const day = this.props.day;
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const timezone = this.props.timezone;

        const weather = this.props.weather[day];

        if(weather===undefined) return(<main className='main'>Loading...</main>);
            
        const sunrise = new Date(weather.sunrise * 1000);
        const sunset = new Date(weather.sunset * 1000);
        
        return (
            <main className='main'>
                <div className="slider">
                    <input type="range" min="0" max="6" value={day} className="slider__range" onChange={this.props.sliderHandler}/>
                    <span className="slider__value small">{weekdays[sunrise.getDay()]}</span>
                </div>
                <section className='panel--main'>
                    <h4 className='panel__title'>Weather</h4>
                    <section className='panel__content'>
                        <div className='panel__division panel__division--left'>
                            <FontAwesomeIcon className='icon' icon={icons[weather.weather[0].icon]}/>
                            <div>{weather.weather[0].description}</div>
                        </div>
                        <div className='panel__division'>
                            <div>
                                <span className='big'>{Math.round(weather.temp.day * 10) / 10}°C</span>
                                <span className='small'> Realfeel: {Math.round(weather.feels_like.day * 10) / 10}°C</span>
                            </div>
                            <div>
                                <span className='small'> Humidity: {weather.humidity}%</span>
                                <span className='small'> Pressure: {weather.pressure}hPa</span>
                                <span className='small'> Wind: {Math.round(weather.wind_speed * 10) / 10}km/h</span>
                            </div>
                        </div>
                    </section>
                </section>
                <div className='main__bottom'>
                    <section className='panel--main'>
                        <h4 className='panel__title'>Sunrise and sunset</h4>
                        <section className='panel__content--times small'>
                            {/* placeholder */}
                            <div className='padding'>Sunrise: {sunrise.toLocaleTimeString('en-US', {timeZone: timezone, hour: '2-digit', minute:'2-digit',})}</div>
                            <div className='padding'>Sunset: {sunset.toLocaleTimeString('en-US', {timeZone: timezone, hour: '2-digit', minute:'2-digit',})}</div>
                        </section>
                    </section>
                </div>
            </main>
        )
        
    }
}

Dbd.propTypes = {
    weather: PropTypes.array,
    airly: PropTypes.array,
    timezone: PropTypes.string,
    day: PropTypes.number,
    sliderHandler: PropTypes.func,
}


export default Dbd;