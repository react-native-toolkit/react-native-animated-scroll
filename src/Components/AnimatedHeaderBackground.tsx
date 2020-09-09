import React from 'react';
import {
  Animated,
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
} from 'react-native';

const { createAnimatedComponent } = Animated;

const AnimatedView = createAnimatedComponent(View);

export interface AnimatedHeaderBackgroundProps {
  animatedValue: Animated.Value;
  interpolationRange: [number, number];
  headerHeight: number;
  headerWidth: number;
  image: ImageSourcePropType;
}

const AnimatedHeaderBackground = ({
  animatedValue,
  headerHeight,
  headerWidth,
  interpolationRange,
  image,
}: AnimatedHeaderBackgroundProps) => {
  const animatedHeaderHeight = animatedValue.interpolate({
    inputRange: interpolationRange,
    outputRange: [headerHeight, 0],
    extrapolate: 'clamp',
  });

  return (
    <AnimatedView
      style={[{ height: animatedHeaderHeight, width: headerWidth }]}
    >
      <Image source={image} style={{ ...StyleSheet.absoluteFillObject }} />
    </AnimatedView>
  );
};

export default AnimatedHeaderBackground;
