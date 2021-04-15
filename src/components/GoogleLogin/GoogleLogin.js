import React from 'react';
import GoogleLogin from 'react-google-login';

import * as authAction from "../../store/actions/authAction"
import { connect } from "react-redux";
import { Button } from 'antd';
import AxiosConexionConfig from 'conexion/AxiosConexionConfig';
import { linkperfilpor } from 'configuracion/constantes';
import { useHistory } from 'react-router';
import { linkAreaPersonalProfesional } from 'configuracion/constantes'




const GoogleLoginComponent = (props) => {
  //console.log(props)
  const responseGoogle = (response) => {
    //console.log(response.profileObj);
    let usuario = {
      nombre: response.profileObj.givenName,
      apellidos: response.profileObj.familyName,
      email: response.profileObj.email,
      loginGoogle: true
    }
    props.setUsuarioValues(usuario);
    Profesional(usuario);
  }
  const history = useHistory()
  async function Profesional(usuario) {

    const UsuarioURL = "/usuarios?filter[where][correo]=" + usuario.email;
    const ProfesionalURL = "/profesionals?filter[where][idusuario]=";

    try {
      AxiosConexionConfig.get(UsuarioURL).then((usser) => {
        if (usser.data.length === 0) {
          let valores = {
            nombre: usuario.nombre,
            apellidos: usuario.apellidos,
            correo: usuario.email
          }
          AxiosConexionConfig.post("/usuarios", JSON.stringify(valores));
        } else {
          AxiosConexionConfig.get(ProfesionalURL + usser.data[0].idusuario).then((prof) => {
            if (prof.data.length > 0) {
              props.setUsuario(prof.data[0]);
              history.push({ linkAreaPersonalProfesional })
            }
          })
        }

      }
      )
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <GoogleLogin
      clientId="549030926812-jbmfjsqpv4du9u2ns9gahsn7oi91qdo8.apps.googleusercontent.com"
      redirectUri="http://localhost:3000"
      buttonText="Login"
      render={renderProps => (
        <>
          <Button
            justIcon
            href="#pablo"
            target="_blank"
            type="primary"
            className="login-form-button"
            onClick={renderProps.onClick}
          >
            {props.texto}
          </Button>

        </>
      )}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
}

const mapStateToProps = (rootReducer) => {
  return { global: rootReducer.auth };
};

export default connect(mapStateToProps, authAction)(GoogleLoginComponent);
//export default GoogleLoginComponent;