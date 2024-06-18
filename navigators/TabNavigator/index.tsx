import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../containers/HomeScreen';
import {Image, Pressable, StyleSheet} from 'react-native';
import theme from '../../themes/theme';
import {Logo} from '../../components/ImageWrapper';
import {
  ChatIcon,
  HomeIcon,
  NotificationIcon,
  ScannerIcon,
  SettingIcon,
  UserCircleIcon,
} from '../../components/IconWrapper';
import NotificationScreen from '../../containers/NotificationScreen';
import SettingScreen from '../../containers/SettingsScreen';
import ScannerScreen from '../../containers/ScannerScreen';
import FeedbackScreen from '../../containers/FeedbackScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primaryBlue,
        },
        headerTintColor: theme.colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarInactiveTintColor: theme.colors.primaryBlue,
        tabBarActiveTintColor: theme.colors.primaryYellow,
        // eslint-disable-next-line react/no-unstable-nested-components
        headerLeft: () => (
          <Image source={Logo} style={styles.logoImage} resizeMode="contain" />
        ),
        // eslint-disable-next-line react/no-unstable-nested-components
        headerRight: () => (
          <Pressable
            onPress={() => navigation.navigate('Profile')}
            style={styles.notification}>
            <UserCircleIcon width={30} fill={theme.colors.white} />
          </Pressable>
        ),
      }}>
      <Tab.Group>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: props => <HomeIcon width={20} fill={props.color} />,
          }}
        />

        <Tab.Screen
          name="Feedback"
          component={FeedbackScreen}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: props => <ChatIcon width={20} fill={props.color} />,
          }}
        />
        <Tab.Screen
          name="Scanning"
          component={ScannerScreen}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: () => (
              <ScannerIcon width={40} fill={theme.colors.primaryYellow} />
            ),
            tabBarLabelStyle: {
              display: 'none',
            },
          }}
          listeners={() => ({
            tabPress: e => {
              e.preventDefault();
              navigation.navigate('Scanner');
            },
          })}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: props => (
              <NotificationIcon width={20} fill={props.color} />
            ),
            tabBarBadge: 3,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingScreen}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: props => <SettingIcon width={20} fill={props.color} />,
          }}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  logoImage: {
    width: 80,
    marginHorizontal: 10,
  },
  notification: {
    marginHorizontal: 10,
  },
});
