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
import Header from '../component/Header';
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
    this.state = {
      refreshing: true,
      posts: undefined,
      selectedID: -1,
      headerState: 0,
      scrollY: new Animated.Value(0),
      itemViewOpacity: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.setState({
      refreshing: false,
    });
    this._getPosts();
  }

  _getPosts() {
    fetch('https://graph.facebook.com/274943915939004/posts?access_token=486914711673894|OYDXPanpQFl5qAwrQcBXIIZcPIE', {
      method: 'GET',
      headers: {
        'Accept': 'application/json;version=2',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((responseJSON) => {
      console.log(responseJSON);
      this.setState({posts: responseJSON.data});
    });
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
      selected={item.id === this.state.selectedID}
    />
  );

  _onPressItem = (id) => {
  };

  render() {
    return (
      <View style={{backgroundColor: 'white',}}>
      <StatusBar
      style={styles.bar}
      backgroundColor="#4783CD"
      barStyle="dark-content"
      />
      <AnimatedFlatList
      contentContainerStyle={[styles.listView]}
      ref={(ref) => {this.listRef = ref}}
      scrollEventThrottle={16}
      data={this.state.posts}
      extraData={this.state.posts}
      onScroll={
        Animated.event([{
          nativeEvent: { contentOffset: { y: this.state.scrollY }}}],
          {useNativeDriver: true, listener: null},
        )}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        refreshControl={
          <RefreshControl
          progressViewOffset={Constants.HEADER_MAX_HEIGHT + Constants.HEADER_SCROLL_DISTANCE}
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh.bind(this)}/>}
          >
      </AnimatedFlatList>
      <Header scrollValue={this.state.scrollY}/>
          </View>
        );
      }
    }
