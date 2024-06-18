import * as React from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import {enableScreens} from 'react-native-screens';

enableScreens(true);
const HomeScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text>Content HomeScreen</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
