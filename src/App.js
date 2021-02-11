
import React, { Component } from 'react';
import { Layout } from 'antd';
import logo from './img/logo_uteq.png';
import GoogleMapReact from 'google-map-react';
import { db } from "../src/services/firebase";
import './App.css';
const { Sider } = Layout;
const props = {
  center: {
    lat: -2.1552256,
    lng: -79.8948806
  },
  zoom: 15
};

const renderMarkers = (map, maps) => {
  let marker = new maps.Marker({
  position: { lat: -2.1552256, lng: -79.8948806 },
  map,
  title: 'Hello World!',
  icon:{
    url: "https://image.flaticon.com/icons/png/512/171/171255.png",
    scaledSize: new maps.Size(42, 42), // size
  },
  animation: maps.Animation.DROP
});

//animacion
marker.addListener("click", () =>{
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(maps.Animation.BOUNCE);
  }
});
  return marker;
 };
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }
  
  componentDidMount(){
    console.log("hola")
    db.ref('FirebaseIOT').on('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      console.log("hola2")
    });

  }
  
  render() {
    return (
      <Layout>
        <Sider className="menu"  breakpoint="lg" collapsedWidth="0" width="300">
          <div className="logo" >
            <img src={logo} alt="Logo" width="40%" height="auto" />
          </div>
          <h1 className="titulos">PROYECTO INTEGRADOR</h1>
        </Sider>
        <Layout>
          <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBjtK_qMODLxmV-64vddXB0zX5b0o7MLHg'}}
          defaultCenter={props.center}
          defaultZoom={props.zoom}
          onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
        >
           
         
        </GoogleMapReact>
      </div>

        </Layout>
      </Layout>
    );

  }
}

export default App;
//AIzaSyBjtK_qMODLxmV-64vddXB0zX5b0o7MLHg
//AIzaSyBRcgW6vPEOiSoqq18ZBgL_AXSfxArqIHU