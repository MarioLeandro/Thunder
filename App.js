import 'react-native-gesture-handler';

import '@expo/match-media';
import { useFonts, Quicksand_700Bold, Quicksand_400Regular } from '@expo-google-fonts/quicksand';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { AuthProvider } from './src/contexts/auth';

export default function App() {
  let [fontsLoaded] = useFonts({
    Quicksand_700Bold,
    Quicksand_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const state = {
    screens: {
      /*      home: 'home',
      profile: 'profile',
      questionlist: 'question/list',
      questionview: 'question/view', */
      Home: 'home',
      Training: 'training',
      Food: 'food',
      Login: 'auth/signin',
      Register: 'auth/signup',
    },
  };

  const linking = {
    prefixes: [],
    config: state,
  };

  return (
    <NativeBaseProvider>
      <NavigationContainer linking={linking}>
        <AuthProvider>
          <StatusBar style="light" translucent={false} />
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
