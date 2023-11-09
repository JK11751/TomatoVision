import * as React from 'react';
import { Text } from 'react-native';

export function MonoText({ style, ...restProps }) {
  return <Text {...restProps} style={[style, { fontFamily: 'spacemono' }]} />;
}
