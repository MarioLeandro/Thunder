import '@expo/match-media';
import { useFonts, Quicksand_700Bold, Quicksand_400Regular } from '@expo-google-fonts/quicksand';
import TutorialScreen from './src/pages/TutorialScreen';
import { NativeBaseProvider, Box } from 'native-base';
import LoginScreen from './src/pages/LoginScreen';
import RegisterScreen from './src/pages/RegisterScreen';
import FeedScreen from './src/pages/FeedScreen';

export default function App() {
  let [fontsLoaded] = useFonts({
    Quicksand_700Bold,
    Quicksand_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider>
      <FeedScreen />
      {/* <RegisterScreen /> */}
      {/* <TutorialScreen /> */}
      {/* <LoginScreen /> */}
    </NativeBaseProvider>
  );
}
