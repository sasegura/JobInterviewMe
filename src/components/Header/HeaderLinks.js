/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import './HeaderLink.styles.scss';
import { linkpreparador } from "configuracion/constantes";
import { linklogout } from "configuracion/constantes";
import * as authAction from "../../store/actions/authAction"
import { connect } from "react-redux";

const useStyles = makeStyles(styles);

 function HeaderLinks(props) {

  const classes = useStyles();



  return (
    <List id="header" className={classes.list}>

      <ListItem className={classes.listItem}>
        <Link to={linkpreparador}>
          <Button
            color="transparent"
            className={classes.navLink}>
            Ser Preparador
          </Button>
        </Link>
      </ListItem>

      <ListItem className={classes.listItem}>
        <Link to={linkpreparador}>
            <Button
              color="transparent"
              className={classes.navLink}>
            Inscribirse
          </Button>
        </Link>
      </ListItem>

      <ListItem className={classes.listItem}>
        <Link to='/3'>
          <Button
            color="transparent"
            target="_self"
            className={classes.navLink}
          >
            Área personal
        </Button>
        </Link>
      </ListItem>

      <ListItem className={classes.listItem}>
        <Link to={linkpreparador}>
          <Button
            color="transparent"
            target="_self"
            className={classes.navLink}
          >
            Ayuda
          </Button>
        </Link>
      </ListItem>

      <ListItem className={classes.listItem}>

        <Tooltip
          id="instagram-twitter"
          title="Síguenos en Twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://twitter.com/CreativeTim?ref=creativetim"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Síguenos en Facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/CreativeTim?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Síguenos en Instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem>
      {props.global.loginGoogle?
      <ListItem className={classes.listItem}>
        <Link to={linklogout}>
          <Button
            color="transparent"
            target="_self"
            className={classes.navLink}
          >
            Cerrar Sesión
          </Button>
        </Link>
      </ListItem>:null}
    </List>
  );
}


const mapStateToProps = (rootReducer) => {
  return { global: rootReducer.auth };
};

export default connect(mapStateToProps, authAction)(HeaderLinks);