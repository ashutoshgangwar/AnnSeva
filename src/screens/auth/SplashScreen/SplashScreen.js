import React, {useEffect, useRef} from 'react';
import {Animated, Text, View} from 'react-native';
import ScreenContainer from '../../../components/ScreenContainer';
import styles from './SplashScreen.styles';

const SplashScreen = ({navigation}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 1200);

    return () => clearTimeout(timer);
  }, [navigation, opacity, scale]);

  return (
    <ScreenContainer contentStyle={styles.screen}>
      <View style={styles.container}>
        <Animated.View style={[styles.logo, {opacity, transform: [{scale}]}]}>
          <Text style={styles.logoText}>A</Text>
        </Animated.View>
        <Text style={styles.title}>AnnSeva</Text>
        <Text style={styles.subtitle}>Connecting seva organizers with trusted halwai</Text>
      </View>
    </ScreenContainer>
  );
};

export default SplashScreen;
