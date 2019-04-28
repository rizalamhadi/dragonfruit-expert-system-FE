import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import * as ActionMenu from "../../actions/auth.action";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import Sidebar from '../../components/sidebar/sidebar.component';
import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';
import HomePage from '../../pages/home/home.page';

class Home extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  render() {
    const { cookies } = this.props;
    let token = cookies.get('token')

    return (
      <div id="wrapper">
        <Header />
        { token && token !== "" ? <Sidebar /> : null }
        <div id={"page-wrapper" + (token && token !== "" ? "" : " simple-wrapper")}>
          <div className={"container-fluid"+ (token && token !== "" ? "" : " bg-not-login")}>
            {token && token !== "" ?
              <div className="row bg-title">
                  <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                  <h4 className="page-title">Identifikasi</h4> </div>
              </div> :
              <div className="row">
                <div className="col-sm-12">
                  <h1 className="text-center font-weight-bold title-color mt-15">Sistem Pakar Identifikasi Penyakit</h1>
                  <h1 className="text-center font-weight-bold mb-15 title-color">Pada Pohon Buah Naga</h1>
                </div>
              </div> }
          </div>
          <HomePage />
          <Footer className="no-left mt-5"/>
        </div>
      </div>
    );
  }
};


const mapStateToProps=(state)=>{
  return state
};

export default withCookies(withRouter(connect(mapStateToProps, ActionMenu)(Home)));
