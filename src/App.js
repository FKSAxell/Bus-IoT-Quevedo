
import React, { Component } from 'react';
import { Layout } from 'antd';
import logo from './img/logo_uteq.png';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { db } from "../src/services/firebase";
import './App.css';
const { Sider } = Layout;



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,  // Hides or shows the InfoWindow
      activeMarker: {},          // Shows the active marker upon click
      selectedPlace: {},          // Shows the InfoWindow to the selected place upon a marker
      latCen: 0,
      lngCen: 0
    };
  }

  componentDidMount() {
    this.dbVal()
  }

  dbVal() {
    db.ref('testAxell').on('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      console.log(data.lat)
      this.setState({
        latCen: data.lat,
        lngCen: data.lng,
        showingInfoWindow: false,
        activeMarker: null
      })
    });

  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });


  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };




  render() {



    return (
      <Layout>

        <Sider className="menu" breakpoint="lg" collapsedWidth="0" width="300">

          <div className="logo" >
            <img src={logo} alt="Logo" width="40%" height="auto" />
          </div>
          <h1 className="titulos">PROYECTO INTEGRADOR</h1>

        </Sider>

        <Layout>

          <div style={{ height: '100vh', width: '100%' }}>
            <Map
              google={this.props.google}
              zoom={18}
              style={this.mapStyles}
              center={
                {
                  lat: this.state.latCen,
                  lng: this.state.lngCen
                }
              }
              mapTypeControl={false}
              fullscreenControl={false}
              streetViewControl={false}
            >
              <Marker
                onClick={this.onMarkerClick}
                name={
                  <div>
                    <p>{'Latitud: ' + this.state.latCen}</p>
                    <p>{"Longitud: " + this.state.lngCen}</p>
                  </div>
                }
                position={
                  {
                    lat: this.state.latCen,
                    lng: this.state.lngCen
                  }

                }
                icon={{
                  url: "https://image.flaticon.com/icons/png/512/171/171255.png",
                  scaledSize: new this.props.google.maps.Size(42, 42), // size
                }}

              />
              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onClose}
              >
                <div>
                  <h4>{this.state.selectedPlace.name}</h4>
                </div>
              </InfoWindow>
            </Map>
          </div>

        </Layout>

      </Layout>
    );

  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBjtK_qMODLxmV-64vddXB0zX5b0o7MLHg',
})(App);
//-2.1552202,-79.8948806
//AIzaSyBjtK_qMODLxmV-64vddXB0zX5b0o7MLHg
//AIzaSyBRcgW6vPEOiSoqq18ZBgL_AXSfxArqIHU