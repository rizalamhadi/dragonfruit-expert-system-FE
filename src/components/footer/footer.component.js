import React, {Component} from 'react'

class Footer extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <footer className={"footer text-center " + (this.props.className ? this.props.className : null)}> 2019 © Sistem Pakar </footer>
    );
  }
}

export default Footer