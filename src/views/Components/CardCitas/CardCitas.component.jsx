import React from 'react';

import {Tooltip, makeStyles, Icon} from '@material-ui/core';
import styles from "../../../assets/jss/material-kit-react/tooltipsStyle.js";
import './CardCitas.style.scss';
import Button from "components/CustomButtons/Button.js";
import { Check, Close } from '@material-ui/icons';

const useStyles = makeStyles(styles);

const CardCitas = (props) => {

const {nombre, toolTipsText,tipo}= props;
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
            id={tipo}
            className="cardCitas"            
        >

        Preparación {nombre}<br/>

        {tipo!=="deshabilitado"?
            tipo==="warning"?(<span id="alerta">¡Cita próxima sin confirmación!</span>)
        :(<></>):(<></>)}

        {/*tipo!=="deshabilitado"?
            (<div className="check"><button><Check/></button>
            <button><Close/></button></div>)
    :(<></>)*/}
        

        </Button>
        </Tooltip>
        </>
    );
}

export default CardCitas