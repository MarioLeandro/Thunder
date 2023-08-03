import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Avatar, Flex, HStack } from 'native-base';
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
          <TouchableOpacity
            onPress={() => console.log('oi')}
            style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}>
            <Avatar
              bg="lightBlue.400"
              size="lg"
              source={{
                uri: `http://192.168.1.106:3001/${user.picture}`,
              }}>
              {user.name.charAt(0)}
            </Avatar>
          </TouchableOpacity>
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
