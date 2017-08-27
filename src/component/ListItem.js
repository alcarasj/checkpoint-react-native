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
import styles from '../config/Styles';
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

export default class ListItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      extendAnim: new Animated.Value(LISTITEM_MIN_HEIGHT),
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
    const opacity = this.state.opacityAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableHighlight
        onPress={this._onPress.bind(this)} ref='item'>
        <Animated.View style={[styles.container, { height: this.state.extendAnim }]}>
          <Animated.Image
            source={{uri: this.props.data.thumb}}
            style={[styles.thumbnail, {opacity: opacity}]}>
          </Animated.Image>
          <Animated.View style={[styles.rightContainer, {opacity: opacity}]}>
            <Text numberOfLines={2} style={styles.title}>{this.props.data.title}</Text>
            <View style={styles.articleMeta}>
              <View style={styles.publishedContainer}><Text style={styles.published}>{this.props.data.mask_author ? "Club Admin" : "Author Name"}</Text></View>
              <View style={styles.viewCountContainer}><Text style={styles.viewCount}>{this.props.data.view_count} views</Text></View>
            </View>
          </Animated.View>
        </Animated.View>
      </TouchableHighlight>
    );
  }
}
