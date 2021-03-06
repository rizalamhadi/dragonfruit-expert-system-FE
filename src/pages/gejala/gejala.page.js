import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import * as ActionMenu from "../../actions/question.action";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { throws } from 'assert';

class GejalaPage extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    this.props.getGejala()
  }
  getData() {
    if (this.props.daftar_gejala && this.props.daftar_gejala.data) {
      let temp = []
      this.props.daftar_gejala.data.forEach((v,k) => {
        temp.push(
          <tr>
            <td>{k + 1}</td>
            <td>{v.id_gejala}</td>
            <td>{v.id_jenis_gejala}</td>
            <td>{v.gejala}</td>
          </tr>
        )
      });
      return temp
    }
  }
  render() {
    let token = localStorage.getItem('token')
    if (token === null || token === "") {
      return <Redirect to="/" />;
    }

    return (
      <div className="container-fluid">
        <div className="row bg-title">
          <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
            <h4 className="page-title">Daftar Gejala</h4> </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="white-box dataTables_wrapper no-footer mt-5 shadow-box mb-5">
              <table className="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Kode Gejala</th>
                    <th>Jenis Gejala</th>
                    <th>Gejala</th>
                  </tr>
                </thead>
                <tbody>
                  {this.getData()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps=(state)=>{
    return state
  };
  
  export default withCookies(withRouter(connect(mapStateToProps, ActionMenu)(GejalaPage)));
  