import React from 'react';
import PropTypes from 'prop-types';
import './styles/style.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Current extends React.Component {
    render() {
        const weather = this.props.weather;
        console.log(weather)
        
        return (
            weather !== undefined ? (
                <div className='container container--parent'>
                    <section className='data data--main'>
                        <div className='data__img-container'>
                            <img className='data__img' src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`${weather.weather[0].main}`}/>
                            <div>{weather.weather[0].description}</div>
                        </div>
                        <div>
                            <div className='data__temp'>{`${Math.round(weather.temp)}°C` || ''}</div>
                            <div>{`Feels like: ${Math.round(weather.feels_like)}°C`}</div>
                        </div>
                        <div>
                            <p>{`Humidity: ${weather.humidity}%`}</p>
                            <p>{`Pressure: ${weather.pressure}hPa`}</p>
                            <p>{`Wind: ${weather.wind_speed}km/h`}</p>
                        </div>
                    </section>
                    <div className='container container--additional'>
                        <section className='data data--additional'></section>
                        <section className='data data--additional'></section>
                    </div>
                </div>
            ) : (
                <div></div>
            )
        );
    }
}

// const Current = (props) => (
//     <div className='container container--parent'>
//         <section className='data data--main'>
//             <div>
//                 <div></div>
//                 <div>{`${props.weather.feels_like}°C` || ''}</div>
//             </div>
//             <div></div>
//         </section>
//         <div className='container container--additional'>
//             <section className='data data--additional'></section>
//             <section className='data data--additional'></section>
//         </div>
//     </div>
// )

Current.propTypes = {
    weather: PropTypes.object,
}

export default Current;