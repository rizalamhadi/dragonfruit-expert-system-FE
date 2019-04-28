import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import * as ActionMenu from "../../actions/question.action";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import Sidebar from '../../components/sidebar/sidebar.component';
import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';
import GejalaPage from '../../pages/gejala/gejala.page';

class Gejala extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  render() {
    const { cookies } = this.props;
    let token = cookies.get('token')

    return (
      <div id="wrapper">
        <Header />
        <Sidebar />
        <div id="page-wrapper" >
          <GejalaPage />
          <Footer className="no-left mt-5"/>
        </div>
      </div>
    );
  }
};


const mapStateToProps=(state)=>{
  return state
};

export default withCookies(withRouter(connect(mapStateToProps, ActionMenu)(Gejala)));
