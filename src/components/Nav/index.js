import React from 'react';
import PropTypes from 'prop-types';
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
            <div onClick={props.linkHandler} data-type='current'>Current <FontAwesomeIcon icon={faChevronRight}/></div>
            <div onClick={props.linkHandler} data-type='hbh'>Hour by hour <FontAwesomeIcon icon={faChevronRight}/></div>
            <div onClick={props.linkHandler} data-type='dbd'>Day by day <FontAwesomeIcon icon={faChevronRight}/></div>
        </div>
        
        <footer>@rekeye, 2020</footer>
    </nav>
);

Nav.propTypes = {
    location: PropTypes.object,
    searchHandler: PropTypes.func,
    linkHandler: PropTypes.func,
}

export default Nav;