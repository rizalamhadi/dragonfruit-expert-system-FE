import React, { Component } from 'react';
import './App.css';
import Routes from './routes/route';
import {createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import { Provider } from 'react-redux';
import reducers from "./reducers";

let store = createStore(reducers, applyMiddleware(thunk))

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

export default App;
