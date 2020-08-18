import React from 'react';
import './styles/style.css';
import Search from './Search/index.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Nav = (props) => (
    <nav>
        <img className='logo' src={require('../../assets/images/logo.png')} alt='logo'/>
        <hr/>

        <div className='location'>
            <span>{props.location.city}, </span>
            <span>{props.location.country}</span>
        </div>

        <Search searchHandler={props.searchHandler}/>

        <div className='links'>
            <div>Current <FontAwesomeIcon icon={faChevronRight}/></div>
            <div>Hour by hour <FontAwesomeIcon icon={faChevronRight}/></div>
            <div>Day by day <FontAwesomeIcon icon={faChevronRight}/></div>
        </div>
        
        <hr/>
        <footer>@rekeye, 2020</footer>
    </nav>
);

export default Nav;