import React, {Component} from 'react';

class Preloader extends Component {
    render() {
      return (
        <div className="preloader">
          <div className="cssload-speeding-wheel" />
        </div>
      );
    }
}

export default Preloader;