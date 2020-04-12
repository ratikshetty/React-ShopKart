import React from 'react'
import './backdrop.css'



function Backdrop(props) {

    return (<div className='backdropDiv'
        onClick={props.onClick}></div>)
}

export default Backdrop;