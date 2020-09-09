import React, { ReactNode, ComponentProps, useRef } from 'react';
import { View, ScrollView, Animated, StyleSheet, Platform } from 'react-native';
import AnimatedHeaderBackground from './Components/AnimatedHeaderBackground';
import AnimatedHeaderForeground from './Components/AnimatedHeaderForeground';
import {
  DEFAULT_HEADER_HEIGHT,
  DEFAULT_HEADER_WIDTH,
} from './Components/constants';

const { createAnimatedComponent, event, Value } = Animated;

const AnimatedScrollView = createAnimatedComponent(ScrollView);

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  headerBackground: {
    position: 'absolute',
  },
  headerForeground: {
    position: 'absolute',
  },
});

type ScrollProps = Omit<
  ComponentProps<typeof AnimatedScrollView>,
  'contentInset' | 'contentOffset' | 'key' | 'onScroll'
>;

export interface HeaderProps {
  animatedValue: Animated.Value;
  headerHeight: number;
  headerWidth: number;
  interpolationRange: [number, number];
}

export interface AnimatedScroll extends ScrollProps {
  children?: ReactNode;
  headerHeight?: number;
  headerWidth?: number;
  backgroundHeader: (props: HeaderProps) => JSX.Element;
  foregroundHeader: (props: HeaderProps) => JSX.Element;
}

const AnimatedScroll = ({
  children,
  headerHeight = DEFAULT_HEADER_HEIGHT,
  headerWidth = DEFAULT_HEADER_WIDTH,
  backgroundHeader,
  foregroundHeader,
  ...otherProps
}: AnimatedScroll) => {
  const animatedScrollPosition = useRef(
    new Value(Platform.OS !== 'ios' ? 0 : -headerHeight)
  ).current;

  const animationRange: [number, number] =
    Platform.OS !== 'ios' ? [0, headerHeight] : [-headerHeight, 0];

  return (
    <View style={[styles.viewContainer]}>
      <View style={[styles.headerBackground]}>
        {backgroundHeader({
          headerHeight,
          headerWidth,
          animatedValue: animatedScrollPosition,
          interpolationRange: animationRange,
        })}
      </View>
      <AnimatedScrollView
        contentContainerStyle={{
          marginTop: Platform.OS !== 'ios' ? headerHeight : undefined,
        }}
        onScroll={event([
          {
            nativeEvent: {
              contentOffset: {
                y: animatedScrollPosition,
              },
            },
          },
        ])}
        contentOffset={{ y: -headerHeight }}
        contentInset={{ top: headerHeight }}
        {...otherProps}
      >
        {children}
        {Platform.OS !== 'ios' ? (
          <View style={{ height: headerHeight }} />
        ) : null}
      </AnimatedScrollView>
      <View style={[styles.headerForeground]}>
        {foregroundHeader({
          headerHeight,
          headerWidth,
          animatedValue: animatedScrollPosition,
          interpolationRange: animationRange,
        })}
      </View>
    </View>
  );
};

export default AnimatedScroll;
export {
  AnimatedHeaderBackground,
  AnimatedHeaderForeground,
  DEFAULT_HEADER_HEIGHT,
  DEFAULT_HEADER_WIDTH,
};
