import * as React from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import {enableScreens} from 'react-native-screens';

enableScreens(true);
const NotificationScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text>Content NotificationScreen</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationScreen;
