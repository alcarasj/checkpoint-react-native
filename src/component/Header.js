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
import styles from '../config/Styles';
import Interactable from 'react-native-interactable';
import Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import MockData from '../MockData';
import ListItem from '../component/ListItem';
const FBSDK = require('react-native-fbsdk');
const {
  GraphRequest,
  GraphRequestManager,
} = FBSDK;
import * as Constants from '../config/Constants';
var AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

export default class FeedView extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    let headerTranslate = this.props.scrollValue.interpolate({
      inputRange: [0, Constants.HEADER_SCROLL_DISTANCE],
      outputRange: [0, -Constants.HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });
    let headerOpacity = this.props.scrollValue.interpolate({
      inputRange: [0, Constants.HEADER_MIN_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
            <Animated.View style={[styles.header, this.props.style, { height: Constants.HEADER_MAX_HEIGHT, transform:  [{translateY: headerTranslate}] } ]}>
                <Animated.View style={[styles.leftItem, { opacity : headerOpacity }]}>
                  <TouchableOpacity onPress={this.props.leftItemAction}>
                    <Icon name="logo-facebook" size={Constants.HEADER_ICON_SIZE} color="#fff" />
                  </TouchableOpacity>
                </Animated.View>
              <View
                accessible={true}
                accessibilityTraits="header"
                style={styles.centerItem}>
                <Animated.Text style={[styles.headerText, styles.headerPrimaryText, { opacity: headerOpacity }]}>Checkpoint</Animated.Text>
              </View>
              <Animated.View style={[styles.rightItem, { opacity: headerOpacity }]}>
                <TouchableOpacity onPress={this.props.rightItemAction}>
                  <Icon name="ios-settings" size={Constants.HEADER_ICON_SIZE} color="#fff" />
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
        );
      }
    }
