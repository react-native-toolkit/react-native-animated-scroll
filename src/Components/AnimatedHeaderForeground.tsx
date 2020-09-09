import React from 'react';
import { View, Animated, Text, StyleSheet } from 'react-native';

const { createAnimatedComponent } = Animated;

const AnimatedView = createAnimatedComponent(View);
const AnimatedText = createAnimatedComponent(Text);

export interface AnimatedHeaderForegroundProps {
  animatedValue: Animated.Value;
  interpolationRange: [number, number];
  headerHeight: number;
  headerWidth: number;
  title: string;
}

const styles = StyleSheet.create({
  header: {
    height: 48,
    backgroundColor: 'black',
    position: 'absolute',
    top: 0,
  },
  text: {
    position: 'absolute',
    left: 24,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

const AnimatedHeaderForeground = ({
  headerWidth,
  headerHeight,
  interpolationRange,
  animatedValue,
  title,
}: AnimatedHeaderForegroundProps) => {
  const top = animatedValue.interpolate({
    inputRange: [interpolationRange[0], interpolationRange[1] - 36],
    outputRange: [headerHeight - 48, 8],
    extrapolate: 'clamp',
  });

  const opacity = animatedValue.interpolate({
    inputRange: interpolationRange,
    outputRange: [0, 1],
  });

  return (
    <>
      <AnimatedView
        style={[
          {
            width: headerWidth,
            opacity,
          },
          styles.header,
        ]}
      />
      <AnimatedText
        style={[
          {
            top,
          },
          styles.text,
        ]}
      >
        {title}
      </AnimatedText>
    </>
  );
};

export default AnimatedHeaderForeground;
