import * as React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import AnimatedScroll, {
  AnimatedHeaderBackground,
  AnimatedHeaderForeground,
} from 'react-native-animated-scroll';

const styles = StyleSheet.create({
  safeAreaContainer: { flex: 1 },
});

export default function App() {
  const list = [...Array(150).keys()];
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <AnimatedScroll
        backgroundHeader={(props) => (
          <AnimatedHeaderBackground
            image={{
              uri:
                'https://unsplash.com/photos/wE7iXvGMPhI/download?force=true&w=2400',
            }}
            {...props}
          />
        )}
        foregroundHeader={(props) => (
          <AnimatedHeaderForeground title={'Animated Scroll'} {...props} />
        )}
      >
        {list.map((each) => {
          return <Text>{each}</Text>;
        })}
      </AnimatedScroll>
    </SafeAreaView>
  );
}
