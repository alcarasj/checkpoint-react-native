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
var AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

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

  componentDidMount() {
    this.setState({
      refreshing: false,
      articles: this._getPosts(),
    });
  }

  _getPosts() {
    fetch('https://www.facebook.com/274943915939004/posts', {
      method: 'GET',
      headers: {
        'Accept': 'application/json;version=2',
        'Content-Type': 'application/json',
        'X-Club-App-Application-Id': '12345678',
      },
    })
    .then((response) => response.json())
    .then((responseJSON) => {
      console.log(responseJSON);
      this.setState({posts: responseJSON});
    });
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this._getPosts();
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
        data={this.state.articles}
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
        </View>
    );
  }
}
