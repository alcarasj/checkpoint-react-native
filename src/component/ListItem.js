'use strict';

import React, { Component } from 'react';
import {
  Image,
  ListView,
  FlatList,
  ScrollView,
  Platform,
  RefreshControl,
  StatusBar,
  Button,
  Easing,
  Animated,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Animatable from 'react-native-animatable';
import styles from '../config/Styles';
import * as Constants from '../config/Constants';

export default class ListItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      extendAnim: new Animated.Value(Constants.LISTITEM_MIN_HEIGHT),
      opacityAnim: new Animated.Value(0),
    };
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  _onPress = () =>  {
    this.props.onPressItem(this.props.data.id)
  }

  render() {
    return (
        <Animated.View style={styles.container}>
          <Image
          source={{uri: this.props.data.thumb}}
          style={[styles.thumbnail]}>>
          </Image>
          <Animated.View style={styles.rightContainer}>
            <Text style={styles.content}>{this.props.data.message}</Text>
          </Animated.View>
        </Animated.View>
    );
  }
}
