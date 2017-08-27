import React, { Component } from 'react';
import {
  View,
 } from 'react-native';
import FeedView from './src/view/FeedView';

export default class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <FeedView />
    );
  }
}
