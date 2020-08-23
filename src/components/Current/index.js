import React from 'react';
import PropTypes from 'prop-types';
import './styles/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../../assets/const/icons.js'

class Current extends React.Component {
    render() {
        const weather = this.props.weather;
        
        return (
            weather !== undefined ? (
                <main>
                    <section className='panel'></section>
                    <div>
                        <section className='panel'></section>
                        <section className='panel'></section>
                    </div>
                </main>
            ) : (
                <main></main>
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