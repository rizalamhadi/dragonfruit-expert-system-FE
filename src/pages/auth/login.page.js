import React, {Component} from 'react';
import Input from '../../components/input/Input.component';
import {Redirect, withRouter, Link} from 'react-router-dom';
import {connect} from "react-redux";
import * as ActionMenu from "../../actions/auth.action";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

class LoginPage extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    const { cookies } = props;
    this.changeValue = this.changeValue.bind(this)
    this.submit = this.submit.bind(this)
    
    this.state = {
      email: '',
      password: '',
      formErrors: {email: false, password: false},
      emailValid: false,
      passwordValid: false,
      formValid: false,
      isSubmit: false,
      isLoading: false,
      token: "",
      show: false
    };
  }
  changeValue(name, value) {
    var data = [];
    data[name] = value;
    this.setState(data)

    if (name === 'isSubmit' && value === true) {
      if (!this.state.emailValid) {
        let com = document.getElementById('input-email');
        com.className += " has-error";
      }
      if (!this.state.passwordValid) {
        let com = document.getElementById('input-password');
        com.className += " has-error";
      }
    }
  }
  componentDidUpdate() {
    const { cookies } = this.props;

    if (this.state.isLoading && this.props.loginRes && this.state.token === "") {  
      if (this.props.loginRes.code === 201) {
        cookies.set('token', this.props.loginRes.data.token);
        localStorage.setItem('token', this.props.loginRes.data.token)
        this.setState({
          token: this.props.loginRes.data.token
        })  
      } else if (this.props.loginRes.msg && !this.state.show) {
        this.setState({
          show: true
        })
      }
      this.changeValue("isLoading", false);
    }

    if (this.state.isSubmit && this.state.emailValid && this.state.passwordValid) {
      this.props.doLogin(this.state.email, this.state.password);
      this.changeValue("isSubmit", false);
      this.changeValue("isLoading", true);
    }
  }
  submit() {
    this.changeValue("isSubmit", true);
  }
  render() {
    let token = localStorage.getItem('token')

    if (token && token !== "") {
      return <Redirect to="/" />;
    }

    return (
      <form className="form-horizontal form-material" id="loginform">
        <SweetAlert
          show={this.state.show}
          title="Oops.."
          text={this.props.loginRes && this.props.loginRes.msg ? this.props.loginRes.msg : ""}
          onConfirm={() => this.setState({ show: false })}
        />
        <br />
        <br />
        <span className="hidden-xs" style={{textAlign: "center", display: "block", paddingTop: "10px", fontSize: "20px"}}><strong>Sistem Pakar</strong> Identifikasi Buah Naga</span>
        <div className="form-group m-t-40" id="input-email">
          <div className="col-xs-12">
            <Input className="form-control" type="email" required placeholder="Email" name="email" valid="required"  changeValue={this.changeValue} isSubmit={this.state.isSubmit} /> 
          </div>
        </div>
        <div className="form-group" id="input-password">
          <div className="col-xs-12">
            <Input className="form-control" type="password" required placeholder="Password" name="password" valid="required"  changeValue={this.changeValue} isSubmit={this.state.isSubmit} /> 
          </div>
        </div>
        <div className="form-group text-center m-t-20">
          <div className="col-xs-12">
            <button className="btn btn-success btn-lg btn-block text-uppercase waves-effect waves-light" type="button" onClick={this.submit}>{this.state.isLoading ? "Loading.." : "Log In"}</button>
          </div>
        </div>
      </form>
    );
  }
};

const mapStateToProps=(state)=>{
  return state
};

export default withCookies(withRouter(connect(mapStateToProps, ActionMenu)(LoginPage)));
