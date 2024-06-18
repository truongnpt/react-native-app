import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from '../TabNavigator';
import LoginScreen from '../../containers/LoginScreen';
import theme from '../../themes/theme';
import ProfileScreen from '../../containers/ProfileScreen';
import ViewDocumentScreen from '../../containers/ViewDocumentScreen';
import ScannerScreen from '../../containers/ScannerScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primaryBlue,
        },
        headerTintColor: theme.colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: 'Login'}}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          headerBackTitle: 'Back',
        }}>
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{
            title: 'Main',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{title: 'Profile'}}
        />
        <Stack.Screen
          name="Scanner"
          component={ScannerScreen}
          options={{title: 'Scanner'}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigator;
