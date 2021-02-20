
import React, { Component } from 'react';
import { Layout, Divider } from 'antd';
import logo from './img/logo_uteq.png';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { db } from "../src/services/firebase";
import HaversineGeolocation from 'haversine-geolocation';
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
      lngCen: 0,
      lat_p: 0,
      lng_p: 0
    };
  }

  componentDidMount() {
    this.dbVal()
  }

  dbVal() {
    db.ref('FirebaseIOT').on('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      console.log(data.lat)

      let distancia = HaversineGeolocation.getDistanceBetween(
        {
          latitude: data.lat,
          longitude: data.lng
        },
        {
          latitude: data.lat_p,
          longitude: data.lng_p
        }

      )
      console.log(distancia)

      this.setState({
        latCen: data.lat,
        lngCen: data.lng,
        lat_p: data.lat_p,
        lng_p: data.lng_p,
        conteoentra: data.conteoentra,
        conteosale: data.conteosale,
        conteototal: data.conteototal,
        humedad: data.humedad,
        temperatura: data.temperatura,
        velocidad:data.velocidad,
        distancia: distancia,
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
          <div className="contenedor">
          <div className="logo" >
            <img src={logo} alt="Logo" width="40%" height="auto" />
          </div>
          <h1 className="titulos">SISTEMA IOT PARA SERVICIO DE AUTOBÚS PÚBLICO URBANO EN LA CIUDAD DE QUEVEDO</h1>
          <Divider className="divisor" >Acerca de</Divider>
          <p className="texto">
            Visualización en tiempo real de información sobre buses urbanos de la ciudad de Quevedo. Presionando en el icono del bus se podrán observar datos como:
          </p>
          <p className="texto">
            -Temperatura
          </p>
          <p className="texto">
            -Humedad
          </p>
          <p className="texto">
            -Total de personas
          </p>
          <p className="texto">
            -Tiempo estimado de llegada
          </p>
          </div>



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
                    <p>{'Personas que subieron: ' + this.state.conteoentra}</p>
                    <p>{"Personas que bajaron: " + this.state.conteosale}</p>
                    <p>{"Personas dentro del bus: " + this.state.conteototal}</p>
                    <p>{'Humedad: ' + this.state.humedad}</p>
                    <p>{"Temperatura: " + this.state.temperatura}</p>
                    <p>{"Distancia: " + this.state.distancia + " Km"}</p>
                    <p>{"Tiempo Estimado de llegada: " + Math.round((this.state.distancia / this.state.velocidad) * 60) + " minutos"}</p>
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
  apiKey: 'AIzaSyAT8VZmA6Z8JNBAKPl1uKexoRK4ZrtfdHo',
})(App);
//-2.1552202,-79.8948806
