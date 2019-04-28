import React, {Component} from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import {withRouter, Link} from 'react-router-dom';
import {connect} from "react-redux";
import * as ActionMenu from "../../actions/auth.action";

class Header extends Component {
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
      super(props);

      this.logout = this.logout.bind(this)
    }
    logout() {
      const { cookies } = this.props;
      cookies.remove('token')
      window.location.href = "/"
      localStorage.removeItem('token')
    }
    render() {
      const { cookies } = this.props;
      let token = cookies.get('token');

      return (
        <nav className="navbar navbar-default navbar-static-top m-b-0">
          <div className="navbar-header"> <a className="navbar-toggle hidden-sm hidden-md hidden-lg " href="javascript:void(0)" data-toggle="collapse" data-target=".navbar-collapse"><i className="ti-menu" /></a>
          { token && token !== "" ?
          <div className="top-left-part pt-3 pl-2"><a className="logo" href="/"><span className="hidden-xs"><strong>Sistem</strong> Pakar</span></a></div>
          : null}
            { token && token !== "" ?
            <ul className="nav navbar-top-links navbar-right pull-right">
              <li className="dropdown">
                <a className="dropdown-toggle profile-pic" data-toggle="dropdown" href="#"> <img src="/images/user.png" alt="user-img" width={36} className="img-circle" /><b className="hidden-xs">Admin</b> </a>
                <ul className="dropdown-menu dropdown-user animated flipInY">
                  {/* <li><a href="javascript:void(0)"><i className="ti-user" />  My Profile</a></li>
                  <li><a href="javascript:void(0)"><i className="ti-email" />  Inbox</a></li>
                  <li><a href="javascript:void(0)"><i className="ti-settings" />  Account Setting</a></li> */}
                  <li><a href="javascript:;" onClick={this.logout}><i className="ti-close" />  Logout</a></li>
                </ul>
              </li>
            </ul>
            : <ul className="nav navbar-top-links navbar-right pull-right">
              <li>
                <Link to="/login" className="btn btn-login">Login</Link>
              </li>
            </ul> }
          </div>
        </nav>
      );
    }
}

const mapStateToProps=(state)=>{
  return state
};

export default withCookies(withRouter(connect(mapStateToProps, ActionMenu)(Header)));
