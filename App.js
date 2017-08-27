import React, { Component } from 'react';
import {
  View,
 } from 'react-native';
import FeedView from './src/view/FeedView';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  async componentWillMount() {
  }

  render() {
    return (
      <FeedView />
    );
  }
}
