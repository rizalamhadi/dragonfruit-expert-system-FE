import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

class Sidebar extends Component {
    render() {
      const location = this.props.location

      return (
        <div className="navbar-default sidebar" role="navigation">
            <div className="sidebar-nav navbar-collapse slimscrollsidebar">
              <ul className="nav" id="side-menu">
                <li className="sidebar-search hidden-sm hidden-md hidden-lg">
                  {/* input-group */}
                  <div className="input-group custom-search-form">
                    <input type="text" className="form-control" placeholder="Search..." /> <span className="input-group-btn">
                      <button className="btn btn-default" type="button"> <i className="fa fa-search" /> </button>
                    </span> </div>
                  {/* /input-group */}
                </li>
                <li> <Link to="/" className={"waves-effect" + (location.pathname === '/' ? ' active' : "")}><i className="ti-dashboard p-r-10" /> <span className="hide-menu">Halaman Utama</span></Link> </li>
                <li> <Link to="/penyakit" className={"waves-effect" + (location.pathname === '/penyakit' ? ' active' : "")}><i className="ti-dashboard p-r-10" /> <span className="hide-menu">Penyakit</span></Link> </li>
                <li> <Link to="/gejala" className={"waves-effect" + (location.pathname === '/gejala' ? ' active' : "")}><i className="ti-dashboard p-r-10" /> <span className="hide-menu">Gejala</span></Link> </li>
                <li> <Link to="/rules" className={"waves-effect" + (location.pathname === '/rules' ? ' active' : "")}><i className="ti-dashboard p-r-10" /> <span className="hide-menu">Rules</span></Link> </li>
              </ul>
            </div>
        </div>
      );
    }
}

export default withRouter(Sidebar)