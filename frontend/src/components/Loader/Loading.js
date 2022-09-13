import React, { Component } from 'react'
import spinner from './spinner.gif'

export class Loading extends Component {
    render() {
        return (
            <div className="my-3">
                <img src={spinner} alt="loading" />
            </div>
        )
    }
}

export default Loading
