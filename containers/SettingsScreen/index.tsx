import * as React from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import {enableScreens} from 'react-native-screens';

enableScreens(true);
const SettingsScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text>Content SettingScreen</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
