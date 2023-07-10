import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TutorialScreen from '../pages/TutorialScreen';
import { useMediaQuery } from 'react-responsive';
import LayoutWeb from '../components/LayoutWeb';
import CustomDrawer from '../components/CustomDrawer';
import Header from '../components/Header';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { createDrawerNavigator } from '@react-navigation/drawer';
import FeedScreen from '../pages/FeedScreen';

const Drawer = createDrawerNavigator();

const AppStack = createNativeStackNavigator();

const AppRoutes = () => {
  const isTabletOrMobileDevice = useMediaQuery({
    maxDeviceWidth: 1224,
  });

  if (isTabletOrMobileDevice) {
    return (
      <>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <CustomDrawer {...props} />}
          screenOptions={{
            header: Header,
            drawerActiveBackgroundColor: '#AA58F4',
            drawerActiveTintColor: '#fff',
            drawerInactiveTintColor: '#333',
            drawerLabelStyle: { marginLeft: -25, fontSize: 15 },
          }}>
          <Drawer.Screen
            name="Home"
            component={FeedScreen}
            options={{
              drawerIcon: ({ color }) => <Ionicons name="home" size={22} color={color} />,
              drawerLabel: 'Início',
            }}
          />
          <Drawer.Screen
            name="Training"
            component={TutorialScreen}
            options={{
              drawerIcon: ({ color }) => (
                <MaterialCommunityIcons name="dumbbell" size={22} color={color} />
              ),
              drawerLabel: 'Treino',
            }}
          />
          <Drawer.Screen
            name="Food"
            component={TutorialScreen}
            options={{
              drawerIcon: ({ color }) => (
                <MaterialCommunityIcons name="silverware-fork-knife" size={22} color={color} />
              ),
              drawerLabel: 'Dieta',
            }}
          />
        </Drawer.Navigator>
      </>
    );
  }

  return (
    <AppStack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Home" component={FeedScreen} />
      <AppStack.Screen name="Training" component={TutorialScreen} />
      <AppStack.Screen name="Food" component={TutorialScreen} />
    </AppStack.Navigator>
  );
};

export default AppRoutes;
