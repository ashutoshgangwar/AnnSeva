import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import ScreenContainer from '../../../components/ScreenContainer';
import SectionHeader from '../../../components/SectionHeader';
import styles from './CustomerHome.styles';

const CustomerHome = ({navigation}) => {
  const options = [
    {
      title: 'Create Bhandara',
      subtitle: 'Plan your event and menu',
      screen: 'CreateBhandara',
    },
    {
      title: 'Nearby Halwai',
      subtitle: 'Find trusted vendors nearby',
      screen: 'NearbyHalwai',
    },
    {
      title: 'My Orders',
      subtitle: 'Track your requests',
      screen: 'MyOrders',
    },
  ];

  return (
    <ScreenContainer>
      <SectionHeader
        title="Welcome to AnnSeva"
        subtitle="Start planning your next Bhandara or Langar"
      />
      <View style={styles.grid}>
        {options.map(option => (
          <TouchableOpacity
            key={option.title}
            style={styles.card}
            onPress={() => navigation.navigate(option.screen)}>
            <Text style={styles.title}>{option.title}</Text>
            <Text style={styles.subtitle}>{option.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScreenContainer>
  );
};

export default CustomerHome;
