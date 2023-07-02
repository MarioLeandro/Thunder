import 'react-native-gesture-handler';

import '@expo/match-media';
import { useFonts, Quicksand_700Bold, Quicksand_400Regular } from '@expo-google-fonts/quicksand';
import TutorialScreen from './src/pages/TutorialScreen';
import { NativeBaseProvider } from 'native-base';
import LoginScreen from './src/pages/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const Stack = createNativeStackNavigator();

  let [fontsLoaded] = useFonts({
    Quicksand_700Bold,
    Quicksand_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const linking = {
    prefixes: ['http://localhost:19006/'],
    config: {
      screens: {
        login: 'login',
        tutorial: 'tutorial',
      },
    },
  };

  return (
    <NativeBaseProvider>
      <NavigationContainer linking={linking}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Tutorial"
            component={TutorialScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
