import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import * as ActionMenu from "../../actions/question.action";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

class HomePage extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props)

    this.state = {
      is_loading: true,
      answer: undefined,
      data: {
        open_node: "",
        close_nodes: [],
        rules: [],
        jawab: false
      }
    }
  }
  componentWillMount() {
    let param = {
      open_node: this.state.data.open_node,
      close_nodes: this.state.data.close_nodes,
      rules: this.state.data.rules,
      jawab: this.state.data.jawab,
    };
    this.props.getQuestion(param);
  }
  componentDidUpdate() {
    if (this.state.is_loading && this.props.answer !== this.state.answer) {
      this.setState({
        answer: this.props.answer,
        is_loading: false
      })
    }
  }
  getNewQuestion(jawab) {
    this.setState({
      is_loading: true
    })

    let param = {
      open_node: this.state.answer.data.open_node,
      close_nodes: this.state.answer.data.close_nodes,
      rules: this.state.answer.data.rules,
      jawab: jawab
    };
    this.props.getQuestion(param);
  }
  resetState() {
    this.setState({
      is_loading: true
    })
    
    let param = {
      open_node: this.state.data.open_node,
      close_nodes: this.state.data.close_nodes,
      rules: this.state.data.rules,
      jawab: this.state.data.jawab,
    };
    this.props.getQuestion(param);
  }
  render() {
    const { cookies } = this.props;
    let token = cookies.get('token')

    console.log(this.state)
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-8 offset-sm-2">
            <div className="white-box dataTables_wrapper no-footer mt-5 shadow-box mb-5">
              {/* {token && token !== "" ? null :
                <h4 className="page-title font-weight-bold text-center mb-5">Identifikasi Penyakit Pada Pohon Buah Naga</h4> } */}

              { this.state.is_loading ? <div>Loading...</div> :
                ( this.state.answer.data && this.state.answer.data.pertanyaan ?
                  <div className="text-center">
                    <h3>{"[" + this.state.answer.data.open_node + "] "}</h3>
                    <h3>{this.state.answer.data.pertanyaan}</h3>
                    <button className="btn btn-lg btn-success" onClick={this.getNewQuestion.bind(this, true)}>Ya</button>&nbsp;&nbsp;&nbsp;
                    <button className="btn btn-lg btn-warning" onClick={this.getNewQuestion.bind(this, false)}>Tidak</button>
                  </div> : 
                  <div>
                    { this.state.answer.data ? 
                    <React.Fragment>
                      <h3 className="font-weight-bold">Rules</h3>
                      <h3>{this.state.answer.data.rules.toString()}</h3>
                    </React.Fragment> : null }
                    <h3 className="font-weight-bold">Penyakit</h3>
                    <h3 className="">{ this.state.answer.data.penyakit && typeof this.state.answer.data.penyakit !== "string" ? "[" + this.state.answer.data.penyakit.id_penyakit + "] " + this.state.answer.data.penyakit.nama_penyakit : this.state.answer.data.penyakit}</h3>
                    { this.state.answer.data.penyakit && typeof this.state.answer.data.penyakit !== "string"  ?
                    <div>
                      <h3 className="font-weight-bold">Solusi</h3>
                      <h4>{this.state.answer.data.penyakit.solusi_penyakit}</h4>
                    </div> : null }
                    { this.state.answer.data ?
                      <div className="text-center">
                        <button className="btn btn-link" onClick={this.resetState.bind(this)}>Ulangi Identifikasi</button>
                      </div> : null}
                  </div>
                )
              }
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
  
  export default withCookies(withRouter(connect(mapStateToProps, ActionMenu)(HomePage)));
  