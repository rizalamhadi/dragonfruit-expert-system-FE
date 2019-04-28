import React, {Component} from 'react'
import './pancake.preloader.css';

class PancakePreloader extends Component {
  render() {
    return (
      <div className="main">
        <h1>Cooking in progress..</h1>
        <div id="cooking">
          <div className="bubble" />
          <div className="bubble" />
          <div className="bubble" />
          <div className="bubble" />
          <div className="bubble" />
          <div id="area">
            <div id="sides">
              <div id="pan" />
              <div id="handle" />
            </div>
            <div id="pancake">
              <div id="pastry" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PancakePreloader