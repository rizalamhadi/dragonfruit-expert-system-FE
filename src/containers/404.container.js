import React, {Component} from 'react';
import Header from '../components/header/header.component';
import {Link} from 'react-router-dom';

class NoMatch extends Component {
  render() {
    return (
      <div id="wrapper">
        <Header />
        <div id="page-wrapper">
          <div className="container-fluid">
            <div className="row bg-title">
              <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                <h4 className="page-title">Halaman tidak ditemukan</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 text-center">
                <div className="white-box">
                  <img src="images/404.gif" width={1100}/>
                  <blockquote>Kembali ke <Link to="/">Halaman Utama</Link></blockquote>
                </div>
              </div>
            </div>
          </div>
          <footer className="footer text-center"> 2019 © by Atta Solution </footer>
        </div>
      </div>
    );
  }
};

export default NoMatch;