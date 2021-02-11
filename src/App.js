
import React, { Component } from 'react';
import { Layout } from 'antd';
import logo from './img/logo_uteq.png';
import GoogleMapReact from 'google-map-react';
import './App.css';
const { Sider } = Layout;
const props = {
  center: {
    lat: 59.95,
    lng: 30.33
  },
  zoom: 11
};
class App extends Component {
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