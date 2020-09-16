import React from 'react';
import Axios from 'axios';
import './styles/style.css';
//components
import Nav from '../Nav/index.js';
import Current from '../Current/index.js';
import Hbh from '../Hbh/index.js';
import Dbd from '../Dbd/index.js'; 
//constants
import LOCATIONIQ from '../../assets/const/LOCATIONIQ.js'; 
import WEATHER from '../../assets/const/WEATHER.js'
import AIRLY from '../../assets/const/AIRLY.js'; 

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: {},
      location: {},
      weather: {},
      airly: {},
      language: 'en', //it'll be changeable in future patches
      mainType: 'current',
      hour: 0,
      day: 0,
    };

    this.getCoords = this.getCoords.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.getWeatherData = this.getWeatherData.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.handleSlider = this.handleSlider.bind(this);
  }

  async componentDidMount() {
    await this.getCoords(); 
  }
  getCoords() { //coords call
    return navigator.geolocation.getCurrentPosition( //get the position of user
      position => {
        this.setState({
          coordinates: {lat: position.coords.latitude, lon: position.coords.longitude} //pass the coords to a state
        });
        this.getLocation(); //run the api call after coords have been passed
        this.getAirlyData();
        this.getWeatherData();
      },
      error => {
        console.log(`Position call failed: ${error.message}`);
      }
    );
  }
  getLocation() { //get location data - city and country for display in navbar
    Axios({
      method: 'get',
      url: LOCATIONIQ.locationUrl,
      params: {
          key: LOCATIONIQ.key,
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
      url: LOCATIONIQ.searchUrl,
      params: {
          key: LOCATIONIQ.key,
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
      });
      this.getWeatherData();
      this.getAirlyData();
    })
    .catch(error => {
      console.log(`Location call failed: ${error.message}`);
    })
  }
  getWeatherData() { //api call for weather
    Axios({
      method: 'get',
      url: WEATHER.url,
      params: {
          appid: WEATHER.key,
          lat: this.state.coordinates.lat,
          lon: this.state.coordinates.lon,
          lang: this.state.language,
          units: 'metric',
          exclude: 'minutely'
      }
    })
    .then(response => {
      const weather = response.data;
      console.log(weather);
      sessionStorage.setItem('weather', weather);
      this.setState({ //passing the weather data to a state
        weather: weather
      })
    })
    .catch(error => {
      console.log(`Weather call failed: ${error.message}`);
    })
  }
  getAirlyData() { //api call for airly
    Axios({
      method: 'get',
      url: AIRLY.url,
      params: {
          lat: this.state.coordinates.lat,
          lng: this.state.coordinates.lon,
      },
      headers: {
        'Accept-Language': this.state.language,
        'apikey': AIRLY.key, 
      },
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      sessionStorage.setItem('airly', data);
      this.setState({ //passing the weather data to a state
        airly: data
      })
    })
    .catch(error => {
      console.log(`Airly call failed: ${error.message}`);
    })
  }

  handleLinkClick(event) {
    this.setState({
      mainType: event.target.dataset.type,
    })
  }
  handleSlider(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    const type = this.state.mainType; //pick the type of main that is being rendered, its changed by the navbar
    const weather = this.state.weather;
    const airly = this.state.airly;
    return (
        <div className='App'>
          <Nav location={this.state.location} searchHandler={this.handleSearch} linkHandler={this.handleLinkClick}/>
          {type==='current' && <Current timezone={weather.timezone} weather={weather.current} airly={airly.current}/>}
          {type==='hbh' && <Hbh timezone={weather.timezone} weather={weather.hourly} airly={airly.forecast} hour={this.state.hour} sliderHandler={this.handleSlider}/>}
          {type==='dbd' && <Dbd timezone={weather.timezone} weather={weather.daily} day={this.state.day} sliderHandler={this.handleSlider}/>}
        </div>
    );
  }
}