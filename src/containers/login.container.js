import React, {Component} from 'react';
import LoginPage from '../pages/auth/login.page';

class Login extends Component {
  render() {
    return (
      <section id="wrapper" className="login-register">
        <div className="login-box login-sidebar">
          <div className="white-box">
            <LoginPage />
          </div>
        </div>
      </section>
    );
  }
};

export default Login;
