import React from 'react';
import Axios from 'axios';
import './styles/style.css';
import Nav from '../Nav/index.js';
import Current from '../Current/index.js';
import Hbh from '../Hbh/index.js';
import Dbd from '../Dbd/index.js';

import API from '../../assets/const/API.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: {},
      location: {},
      mainType: 'current'
    }

    this.getCoords = this.getCoords.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.getCoords(); 
  }
  getCoords() {
    return navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          coordinates: {lat: position.coords.latitude, lon: position.coords.longitude}
        });
        this.getLocation(); //run the api call after coords have been passed
      },
      error => {
        alert(error.message);
      }
    );
  }
  getLocation() {
    Axios({
      method: 'get',
      url: API.locationUrl,
      params: {
          key: API.key,
          lat: this.state.coordinates.lat,
          lon: this.state.coordinates.lon,
          normalizecity: 1,
          format: 'JSON'
      }
    })
    .then(response => {
      const address = response.data.address;
      this.setState({
        location: {city: address.city, country: address.country}
      });
    })
    .catch(error => {
      console.log('Location call failed: ' + error.message);
    })
  }
  handleSearch(event) {
    event.preventDefault();
    Axios({
      method: 'get',
      url: API.searchUrl,
      params: {
          key: API.key,
          q: event.target.query.value,
          addressdetails: 1,
          normalizecity: 1,
          format: 'JSON'
      }
    })
    .then(response => {
      console.log(response);
      const result = response.data[0];
      this.setState({
        coordinates: {lat: result.lat, lon: result.lon},
        location: {city: result.address.city, country: result.address.country}
      })
    })
    .catch(error => {
      alert(error.message);
    })
  }

  render() {
    const type = this.state.mainType; //pick the type that is being rendered
    return (
      <div className='App'>
        <Nav location={this.state.location} searchHandler={this.handleSearch}/>
        {/*  will add props later */}
        {type==='current' && <Current/>} 
        {type==='hbh' && <Hbh/>}
        {type==='dbd' && <Dbd/>}
      </div>
    );
  }
}