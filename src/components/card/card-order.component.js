import React, { Component } from 'react'
import {withRouter, Link} from 'react-router-dom';
import {connect} from "react-redux";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import * as ActionMenu from "../../actions/order.web.action";
import CardOrderList from './card-order.list.component';

class CardOrder extends Component {
  render() {
    const ref = React.createRef();
    return (
      <div className="col-md-3 card-order">
        <div className="white-box font-weight-bold">
          <h3 className="ribbon ribbon-bookmark ribbon-default">{this.props.status.replace("_", " ").toUpperCase()}</h3>
          <span className="label label-danger float-right">{this.props.orderListRes && this.props.orderListRes[this.props.status] ? this.props.orderListRes[this.props.status].meta.count : ".."} orders</span>
          <div className="myadmin-dd dd mt-5" id="nestable">
            <CardOrderList {...this.props} forwardedRef={ref} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return state
};

export default withCookies(withRouter(connect(mapStateToProps, ActionMenu)(CardOrder)));
