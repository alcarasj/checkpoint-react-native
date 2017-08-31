import {
  Platform,
} from 'react-native';

export const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 16 : 16;
export const HEADER_MAX_HEIGHT = Platform.OS === 'ios' ? 90 + STATUS_BAR_HEIGHT : 90 + STATUS_BAR_HEIGHT;
export const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 59 : 59;
export const HEADER_OFFSET = 100;
export const LISTITEM_MAX_HEIGHT = 800;
export const LISTITEM_MIN_HEIGHT = 80;
export const LISTITEM_BORDER_WIDTH = 2.5;
export const HEADER_ICON_SIZE = 40;
export const OPACITY_ANIMATION_DURATION = 120;
export const TRANSLATE_ANIMATION_DURATION = 200;
export const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
