import React, {Component} from 'react'
import CardOrderChild from './card-order.child.component';
import {withRouter, Link} from 'react-router-dom';
import {connect} from "react-redux";
import lang from '../../languages/id';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import * as ActionMenu from "../../actions/order.web.action";

class CardOrderList extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);

    this.state = {
      [this.props.status + "Loading"]: false,
      orderList: undefined,
      limit: 100,
      offset: 0
    }

    this.loadMore = this.loadMore.bind(this)
  }
  componentWillMount() {
    const { cookies } = this.props;
    let token = cookies.get('token')

    this.props.getOrderList(token, this.props.status, this.state.limit, this.state.offset)
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.orderListRes && prevProps.orderListRes[this.props.status] !== this.props.orderListRes[this.props.status] && this.state[this.props.status + "Loading"]) {
      this.setState({
        [this.props.status + "Loading"]: false
      })
    }
  }
  getData() {
    if (this.props.orderListRes && this.props.orderListRes[this.props.status]) {
      let data = []
      const {forwardedRef} = this.props;
      this.props.orderListRes[this.props.status].data.order_id_list.forEach((v, k) => {
        data.push(<CardOrderChild id_order={v.id_order} date={v.date} ref={forwardedRef} key={k} />)
      });
      return data
    } else {
      return <div>Loading..</div>
    }
  }
  loadMore() {
    const { cookies } = this.props;
    let token = cookies.get('token')
    
    this.props.getOrderList(token, this.props.status, this.state.limit, this.state.offset + 100)
    this.setState(prevState => ({
      offset: prevState.offset + 100,
      [this.props.status + "Loading"]: true
    }))
  }
  getBtLoadMore() {
    if (this.props.orderListRes && this.props.orderListRes[this.props.status]) {
      if (this.props.orderListRes[this.props.status].meta.count > this.props.orderListRes[this.props.status].data.order_id_list.length) {
        return (
          <div className="text-center mt-3">
            <button className="btn btn-default btn-rounded" onClick={this.loadMore}>{this.state[this.props.status + "Loading"] ? "Loading.." : "Load More"}</button>
          </div>
        )
      }
    }
  }
  render() {
    return (
      <ol className="dd-list">
        {this.getData()}
        {this.getBtLoadMore()}
      </ol>
    )
  }
}

const mapStateToProps=(state)=>{
  return state
};

export default withCookies(withRouter(connect(mapStateToProps, ActionMenu)(CardOrderList)));
