import React from 'react';
import './styles/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = () => (
    <form className='search'>
        <input placeholder='Search... '/>
        <button type='submit'><FontAwesomeIcon icon={faSearch}/></button>
    </form>
);

export default Search;