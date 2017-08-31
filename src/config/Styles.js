import {
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import {
  STATUS_BAR_HEIGHT,
  HEADER_MAX_HEIGHT,
  HEADER_MIN_HEIGHT,
  HEADER_OFFSET,
  LISTITEM_MIN_HEIGHT,
  LISTITEM_MAX_HEIGHT,
  LISTITEM_BORDER_WIDTH,
  OPACITY_ANIMATION_DURATION,
  TRANSLATE_ANIMATION_DURATION,
  HEADER_SCROLL_DISTANCE,
 } from './Constants';

 export default StyleSheet.create({
   header: {
     backgroundColor: '#4783CD',
     top: 0,
     left: 0,
     right: 0,
     position: 'absolute',
     overflow: 'hidden',
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
   },
   bar: {
     backgroundColor: 'transparent',
     marginTop: Platform.OS === 'ios' ? 28 : 38,
     height: 32,
     alignItems: 'center',
     justifyContent: 'center',
     position: 'absolute',
     top: 0,
     left: 0,
     right: 0,
   },
   headerText: {
     color: '#fff',
     fontSize: 24,
   },
   headerSecondaryText: {
     fontSize: 10,
   },
   crest: {
     width: 35,
     height: 35,
     borderRadius: 5,
   },
   leftItem: {
     flex: 1,
     alignItems: 'flex-start',
     marginLeft: 10,
     flexDirection: 'column',
   },
   leftSubItem: {
     flex: 1,
     flexDirection: 'column',
     paddingTop: HEADER_MAX_HEIGHT/4,
   },
   rightSubItem: {
     flex: 1,
     alignItems: 'flex-start',
     marginRight: 10,
     marginBottom: 5,
   },
   outerScroll: {
     flex: 1,
     flexDirection: 'column'
   },
   centerItem: {
     flex: 2,
     alignItems: 'center',
   },
   rightItem: {
     flex: 1,
     alignItems: 'flex-end',
     marginRight: 10,
   },
   content: {
     flex: 1,
     flexDirection: 'column',
     justifyContent: 'center',
     backgroundColor: '#ddd',
   },
   listView: {
     paddingTop: HEADER_MAX_HEIGHT,
     backgroundColor: '#ddd',
   },
   container: {
     flex: 1,
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
     borderBottomWidth: 2.5,
     borderBottomColor: '#ddd',
     backgroundColor: '#fff',
     // padding: 4,
   },
   rightContainer: {
     flex: 1,
     paddingLeft: 10,
     paddingRight: 10,
     // paddingTop: 5,
   },
   title: {
     fontSize: 14,
     marginBottom: 8,
     textAlign: 'left',
   },
   articleMeta: {
     flexDirection: 'row',
   },
   itemContent: {
     width: Dimensions.get('window').width,
     height: Dimensions.get('window').height,
     position: 'absolute',
     justifyContent: 'space-between',
     backgroundColor: '#fff',
     alignItems: 'center',
   },
   publishedContainer: {
     flex: 1,
     alignItems: 'flex-start',
   },
   viewCountContainer: {
     flex: 1,
     alignItems: 'flex-end',
     paddingRight: 16,
   },
   published: {
     fontSize: 11,
   },
   viewCount: {
     fontSize: 11,
   },
   thumbnail: {
     width: 80,
     height: LISTITEM_MIN_HEIGHT - LISTITEM_BORDER_WIDTH,
   },
 });
