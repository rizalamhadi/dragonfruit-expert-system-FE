import React, {Component} from 'react'
let moment = require('moment');

class CardOrderChild extends Component {
  render() {
    return (
      <li className="dd-item" data-id="1">
        <div className="dd-handle">
          <p>{this.props.id_order}</p> 
          <p>{this.props.date ? moment(this.props.date, 'YYYY-MM-DD HH:mm:ss Z').format('YYYY-MM-DD HH:00') : "-"}</p> 
        </div>
      </li>
    )
  }
}

export default CardOrderChild