import React from 'react';
import PropTypes from 'prop-types'; 
import './styles/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = (props) => (
    <form className='search' onSubmit={event => props.searchHandler(event)}>
        <input placeholder='Search... ' name='query'/>
        <button type='submit'><FontAwesomeIcon icon={faSearch}/></button>
    </form>
);

Search.propTypes = {
    searchHandler: PropTypes.func,
}

export default Search;