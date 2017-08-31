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
import MockData from '../MockData';
import ListItem from '../component/ListItem';
import FBSDK from 'react-native-fbsdk';
const {
  GraphRequest,
  GraphRequestManager,
} = FBSDK;
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
var AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

export default class FeedView extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: true,
      posts: MockData,
      selectedID: -1,
      headerState: 0,
      scrollY: new Animated.Value(0),
      itemViewOpacity: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.setState({
      refreshing: false,
      //posts: this._getPosts(),
    });
  }

  _getPosts() {
    const getRequestConfig = {
      httpMethod: 'GET',
      version: 'v2.10',
      parameters: null,
      accessToken: null
    }

    const infoRequest = new GraphRequest(
      '/274943915939004/posts',
      getRequestConfig,
      this._responseInfoCallback,
    );

    const requestManager = new GraphRequestManager();
    requestManager.addRequest(infoRequest);
    requestManager.start();
    console.log(requestManager)
  }

  _responseInfoCallback(error: ?Object, result: ?Object) {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      alert('Success fetching data: ' + result.toString());
      console.log(result.toString());
    }
  }

  _onRefresh() {
    this.setState({refreshing: true});
    //this._getPosts();
    this.setState({refreshing: false});
  }

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({item, index}) => (
    <ListItem
    onPressItem={this._onPressItem}
    data={item}
    selected={item.id == this.state.selectedID}
    />
  );

  _onPressItem = (id) => {
  };

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
      <View style={{backgroundColor: 'white',}}>
      <StatusBar
      style={styles.bar}
      backgroundColor="#4783CD"
      barStyle="dark-content"
      />
      <AnimatedFlatList
      contentContainerStyle={[styles.listView]}
      bounces={false}
      bouncesZoom={false}
      alwaysBounceVertical={false}
      ref={(ref) => {this.listRef = ref}}
      getItemLayout={(data, index) => (
        {length: 80 + 5, offset: (80 + 5) * index, index}
      )}
      scrollEventThrottle={16}
      data={this.state.posts}
      extraData={this.state}
      onScroll={
        Animated.event([{
          nativeEvent: { contentOffset: { y: this.state.scrollY }}}],
          {listener: null},
        )}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        refreshControl={
          <RefreshControl
          progressViewOffset={HEADER_MAX_HEIGHT + HEADER_SCROLL_DISTANCE}
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh.bind(this)}/>}
          >
          </AnimatedFlatList>
          <Animated.View style={[styles.header, this.props.style, { height: headerTranslate } ]}>
          <Animated.View style={[styles.leftItem, { opacity : headerOpacity }]}>
          <TouchableOpacity onPress={() => alert('Menu')}>
          <Icon name="logo-facebook" size={HEADER_ICON_SIZE} color="#fff" />
          </TouchableOpacity>
          </Animated.View>
          <View
          accessible={true}
          accessibilityTraits="header"
          style={styles.centerItem}>
          <Animated.Text style={[styles.headerText, { opacity: headerOpacity }]}>Checkpoint</Animated.Text>
          </View>
          <Animated.View style={[styles.rightItem, { opacity: headerOpacity }]}>
          <TouchableOpacity onPress={() => alert('Add a post')}>
          <Icon name="ios-settings" size={HEADER_ICON_SIZE} color="#fff" />
          </TouchableOpacity>
          </Animated.View>
          </Animated.View>
          </View>
        );
      }
    }
