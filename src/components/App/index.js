import React from 'react';
import './styles/style.css';
import Nav from '../Nav/index.js'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: null,
      location: null
    }
  }

  componentDidMount() {
    this.HandleLocation();
  }
  HandleCoords() {
    navigator.geolocation.getCurrentPosition(
      position => {
        const coords={lat: position.coords.latitude, lon: position.coords.longitude};
        this.setState({coords})
      },
      error => {
        alert(error.message);
      }
    );
  }
  HandleLocation() {
    
  }

  render() {
    return (
      <div className="App">
        <Nav location={this.state.location}/>
      </div>
    );
  }
}