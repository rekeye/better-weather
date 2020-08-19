import React from 'react';
import Axios from 'axios';
import './styles/style.css';
//components
import Nav from '../Nav/index.js';
import Current from '../Current/index.js';
import Hbh from '../Hbh/index.js';
import Dbd from '../Dbd/index.js'; 
//constant
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
    return navigator.geolocation.getCurrentPosition( //get the position of user
      position => {
        this.setState({
          coordinates: {lat: position.coords.latitude, lon: position.coords.longitude} //pass the coords to a state
        });
        this.getLocation(); //run the api call after coords have been passed
      },
      error => {
        console.log(`Position call failed: ${error.message}`);
      }
    );
  }
  getLocation() { //get location data - city and country for display in navbar
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
        location: {city: address.city, country: address.country} //pass the data to a state
      });
    })
    .catch(error => {
      console.log(`Location call failed: ${error.message}`);
    })
  }
  handleSearch(event) { //get the position of user based on searched value
    event.preventDefault(); //prevents the search form from reloading the page
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
      const result = response.data[0];
      this.setState({ //passing the data to a state
        coordinates: {lat: result.lat, lon: result.lon},
        location: {city: result.address.city, country: result.address.country}
      })
    })
    .catch(error => {
      console.log(`Location call failed: ${error.message}`);
    })
  }

  render() {
    const type = this.state.mainType; //pick the type of main that is being rendered, its changed by the navbar
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