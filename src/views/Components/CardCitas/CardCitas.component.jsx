import React from 'react';

import {Tooltip, makeStyles} from '@material-ui/core';
import styles from "../../../assets/jss/material-kit-react/tooltipsStyle.js";
import './CardCitas.style.scss';
import Button from "components/CustomButtons/Button.js";

const useStyles = makeStyles(styles);

const CardCitas = (props) => {

const {nombre,color, toolTipsText,tipo}= props;
const classes = useStyles();

    return (
        <>
        <Tooltip
            id="MyToolTip"
            title={toolTipsText}
            interactive={true}
            
            placement={window.innerWidth > 959 ? "center" : "left"} 
            classes={{ tooltip: classes.tooltip }} 
        >
        <Button 
            onClick={e => e.preventDefault()}
            id="cardCitas"
            style={{
                color: `${color}`,
                border: `1px solid ${color}`        
            }}
        >
        Preparación {nombre}</Button>
        </Tooltip>
        </>
    );
}

export default CardCitas