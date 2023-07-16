import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Flex, HStack } from 'native-base';
import AuthContext from '../contexts/auth';
import { useNavigation } from '@react-navigation/native';

const CustomDrawer = (props) => {
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleSignOut = async () => {
    await logout();
    navigation.navigate('Login');
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView contentContainerStyle={{ backgroundColor: '#AA58F4' }}>
        <View style={{ padding: 20 }}>
          <Image
            source={{ uri: 'https://avatars.githubusercontent.com/u/63363561?v=4' }}
            style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
          />
          <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'Quicksand_700Bold' }}>
            {user.name}
          </Text>
          <HStack space={'1.5'} alignItems={'center'}>
            <Text style={{ color: '#fff', fontFamily: 'Quicksand_400Regular' }}>
              Nível {user.level || 0}
            </Text>
            <MaterialCommunityIcons name="lightning-bolt" size={14} color="white" />
          </HStack>
        </View>
        <Flex bg="white" pt="5">
          <DrawerItemList {...props} />
        </Flex>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
        <TouchableOpacity onPress={() => handleSignOut()}>
          <Flex direction="row" alignItems={'center'}>
            <Ionicons name="log-out-outline" size={22} />
            <Text style={{ fontSize: 15, fontFamily: 'Quicksand_700Bold', marginLeft: 5 }}>
              Sair
            </Text>
          </Flex>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
