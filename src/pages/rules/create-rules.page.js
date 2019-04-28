import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import * as ActionMenu from "../../actions/question.action";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import Input from '../../components/input/Input.component';

const _ = require('lodash')

class CreateRulesPage extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props)

    this.state = {
      id_penyakit: "",
      id_rules: "",
      id_gejala: [],
      formErrors: {email: false},
      emailValid: false,
      formValid: false,
      isSubmit: false,
      isLoading: false,
    }

    this.changeValue = this.changeValue.bind(this)
  }
  componentWillMount() {
    this.props.getPenyakit()
    this.props.getGejala()
  }
  componentDidUpdate() {
    if (this.state.isSubmit && this.props.create_rules_res) {
      this.setState({isSubmit: false})
      if (this.props.create_rules_res.code === 201) {
        window.location.href = "/rules"
      }
    }
  }
  changeValue(state_name, e) {
    this.setState({
      [state_name]: e.target && e.target.value ? e.target.value : e
    })
  }
  getPenyakit() {
    if (this.props.daftar_penyakit && this.props.daftar_penyakit.data) {
      let temp = []
      this.props.daftar_penyakit.data.forEach((v,k) => {
        temp.push(
          <option value={v.id_penyakit} key={k}>{"[" + v.id_penyakit + "] " + v.nama_penyakit}</option>
        )
      });
      return temp
    }
  }
  addGejala(newValue, e) {
    let checked = e.target.checked
    let {id_gejala} = this.state

    if (!checked) {
      let remove = _.remove(checked, (v) => {
        return v === newValue.id_gejala
      })
      this.setState({
        id_gejala: remove
      })
    } else {
      id_gejala.push(newValue.id_gejala)
      this.setState({
        id_gejala: id_gejala
      })
    }
  }
  getGejala() {
    if (this.props.daftar_gejala && this.props.daftar_gejala.data) {
      let temp = []
      this.props.daftar_gejala.data.forEach((v,k) => {
        temp.push(
          <div className="checkbox checkbox-success" key={k}>
            <input id="checkbox2" type="checkbox" name="id_gejala[]" onClick={this.addGejala.bind(this, v)} />
            <label htmlFor="checkbox2"> [{v.id_gejala}] {v.gejala} </label>
          </div>
        )
      });
      return temp
    }
  }
  submit() {
    this.setState({
      isSubmit: true
    })
    let param = {
      id_rules: this.state.id_rules,
      id_penyakit: this.state.id_penyakit,
      id_gejala: this.state.id_gejala
    }

    this.props.createRules(param)
  }
  render() {
    let token = localStorage.getItem('token')
    if (token === null || token === "") {
      return <Redirect to="/" />;
    }

    console.log(this.props.create_rules_res, this.state.isSubmit)

    return (
      <div className="container-fluid">
        <div className="row bg-title">
          <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
            <h4 className="page-title">Tambah Rules</h4> </div>
          <div className="col-lg-9 col-sm-8 col-md-8 col-xs-12">
            <a href="/rules" className="btn btn-danger pull-right m-l-20 btn-rounded btn-outline hidden-xs hidden-sm waves-effect waves-light">Kembali</a>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="white-box dataTables_wrapper no-footer mt-5 shadow-box mb-5">
              <form className="form-horizontal">
                { !this.state.isSubmit && this.props.create_rules_res ? <p className="alert alert-warning">{this.props.create_rules_res.message}</p> : null }
                <div className="form-group">
                  <label className="col-md-12">Kode Rules</label>
                  <div className="col-md-12">
                    <Input className="form-control" type="text" required placeholder="Kode Rules" name="id_rules" valid="required" changeValue={this.changeValue} isSubmit={this.state.isSubmit} /> 
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-12">Penyakit</label>
                  <div className="col-md-12">
                    <select className="form-control" defaultValue={this.state.id_penyakit} onChange={this.changeValue.bind(this, "id_penyakit")}>
                      <option value="">Pilih</option>
                      {this.getPenyakit()}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-12">Gejala</label>
                  <div className="col-md-12">
                    {this.getGejala()}
                  </div>
                </div>
                <button type="button" className="btn btn-success waves-effect waves-light m-r-10" onClick={this.submit.bind(this)}>Simpan</button>
              </form>
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
  
  export default withCookies(withRouter(connect(mapStateToProps, ActionMenu)(CreateRulesPage)));
  