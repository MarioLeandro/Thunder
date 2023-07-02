import { useMediaQuery } from 'react-responsive';
import TutorialMobile from './TutorialMobile';
import TutorialWeb from './TutorialWeb';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../../components/CustomDrawer';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import LayoutWeb from '../../components/LayoutWeb';

const Drawer = createDrawerNavigator();

export default function TutorialScreen() {
  const isTabletOrMobileDevice = useMediaQuery({
    maxDeviceWidth: 1224,
  });

  if (isTabletOrMobileDevice) {
    return (
      <>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawer {...props} />}
          screenOptions={{
            //headerShown: false,
            header: Header,
            drawerActiveBackgroundColor: '#AA58F4',
            drawerActiveTintColor: '#fff',
            drawerInactiveTintColor: '#333',
            drawerLabelStyle: { marginLeft: -25, fontSize: 15 },
          }}>
          <Drawer.Screen
            name="Início"
            component={TutorialMobile}
            options={{
              drawerIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />,
            }}
          />
          <Drawer.Screen
            name="Fon"
            component={TutorialMobile}
            options={{
              drawerIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />,
            }}
          />
        </Drawer.Navigator>
      </>
    );
  }

  return (
    <LayoutWeb>
      <TutorialWeb />
    </LayoutWeb>
  );
}
