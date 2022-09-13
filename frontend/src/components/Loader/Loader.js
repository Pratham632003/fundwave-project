import React, { Component } from 'react'
import spinner from './spinner.gif';
import './Loader.css';

export class Loader extends Component {
    render() {
        return (
            <div className="loader">
                <img src={spinner} alt="Loader" />
            </div>
        )
    }
}

export default Loader
