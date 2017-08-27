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
import Icon from 'react-native-vector-icons/Ionicons';
import {
  STATUS_BAR_HEIGHT,
  HEADER_MAX_HEIGHT,
  HEADER_MIN_HEIGHT,
  HEADER_OFFSET,
  HEADER_ICON_SIZE,
  LISTITEM_MIN_HEIGHT,
  LISTITEM_MAX_HEIGHT,
  OPACITY_ANIMATION_DURATION,
  TRANSLATE_ANIMATION_DURATION,
  HEADER_SCROLL_DISTANCE,
} from '../config/Constants';

export default class FeedView extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: true,
      posts: null,
      selectedID: -1,
      headerState: 0,
      scrollY: new Animated.Value(0),
      itemViewOpacity: new Animated.Value(0),
    };
  }

  render() {
    let headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });
    let headerOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MIN_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
        <Animated.View style={[styles.header, this.props.style, { height: headerTranslate } ]}>
            <Animated.View style={[styles.leftItem, { opacity : headerOpacity }]}>
              <TouchableOpacity onPress={() => alert('Menu')}>
                <Icon name="ios-options-outline" size={HEADER_ICON_SIZE} color="#fffc0b" />
              </TouchableOpacity>
            </Animated.View>
          <View
            accessible={true}
            accessibilityTraits="header"
            style={styles.centerItem}>
            <Animated.Text style={[styles.headerText, styles.headerPrimaryText, { opacity: headerOpacity }]}>Checkpoint</Animated.Text>
          </View>
          <Animated.View style={[styles.rightItem, { opacity: headerOpacity }]}>
            <TouchableOpacity onPress={() => alert('Add a post')}>
              <Icon name="ios-add" size={HEADER_ICON_SIZE+10} color="#fffc0b" />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
    );
  }
}
