import React from 'react';
import PropTypes from 'prop-types';
import './styles/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../../assets/const/icons.js'

class Hbh extends React.Component {
    render() {
        const hour = this.props.hour;

        const weather = this.props.weather[hour];
        const airly = this.props.airly[hour];

        const time = new Date(weather.dt * 1000);
        const timezone = this.props.timezone;

        if(airly===undefined || weather===undefined) return(<main className='main'>Loading...</main>);
            
        const airPollutantsList = airly.standards.map((obj) => 
            <div key={obj.pollutant} className='smaller'>{obj.pollutant}: {Math.round(obj.percent)}%</div>
        )
        
        return (
            <main className='main'>
                <div className="slider">
                    <input type="range" min="0" max="23" value={hour} className="slider__range" onChange={this.props.sliderHandler}/>
                    <span className="slider__value small">{time.toLocaleTimeString('en-US', {timeZone: timezone, hour: '2-digit', minute:'2-digit',})}</span>
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
                                <span className='big'>{Math.round(weather.temp * 10) / 10}°C</span>
                                <span className='small'> Realfeel: {Math.round(weather.feels_like * 10) / 10}°C</span>
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
        )
        
    }
}

Hbh.propTypes = {
    weather: PropTypes.array,
    airly: PropTypes.array,
    timezone: PropTypes.string,
    hour: PropTypes.number,
    sliderHandler: PropTypes.func,
}

export default Hbh;