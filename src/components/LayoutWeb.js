import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Center, VStack, Pressable, Flex, HStack, Box, Progress } from 'native-base';

import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import AuthContext from '../contexts/auth';

const LayoutWeb = ({ children }) => {
  const navigation = useNavigation();
  const { signed, logout } = useContext(AuthContext);

  const handleSignOut = async () => {
    await logout();
    navigation.navigate('Login');
  };

  const getCurrentRoute = () => {
    const navigationState = navigation.getState();
    const currentRoute = navigationState.routes[navigationState.index];
    return currentRoute.name;
  };

  useEffect(() => {
    getCurrentRoute();
    console.log('aki');
  }, [navigation]);

  const route = useRoute();
  const currentPath = route.name;

  console.log(currentPath);

  return (
    <View style={styles.container}>
      <View style={styles.sideBar}>
        <View style={{ padding: 20, backgroundColor: '#AA58F4' }}>
          <Image
            source={'https://avatars.githubusercontent.com/u/63363561?v=4'}
            style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
          />
          <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'Quicksand_700Bold' }}>
            Mario Leandro
          </Text>
          <HStack space={'1.5'} alignItems={'center'}>
            <Text style={{ color: '#fff', fontFamily: 'Quicksand_400Regular' }}>Nível 200</Text>
            <MaterialCommunityIcons name="lightning-bolt" size={14} color="white" />
          </HStack>
          <Box w="50%" maxW="400" mt="4">
            <Progress value={45} colorScheme="light" />
          </Box>
        </View>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <VStack alignItems="center" pt="5" p="8" space={4}>
            <Pressable w="full" onPress={() => navigation.navigate('Home')}>
              {({ isHovered, isFocused, isPressed }) => {
                return (
                  <Flex
                    w="full"
                    h="16"
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'start'}
                    gap={4}
                    p={4}
                    borderRadius={'lg'}
                    bg={currentPath === 'Home' ? '#AA58F4' : 'inherit'}>
                    <Ionicons
                      name="home"
                      size={22}
                      color={currentPath === 'Home' ? 'white' : '#333'}
                    />
                    <Text
                      style={{
                        ...styles.subTextTitle,
                        color: currentPath === 'Home' ? 'white' : '#333',
                      }}
                      fontSize={'md'}>
                      Início
                    </Text>
                  </Flex>
                );
              }}
            </Pressable>
            <Pressable w="full" onPress={() => navigation.navigate('Training')}>
              {({ isHovered, isFocused, isPressed }) => {
                return (
                  <Flex
                    w="full"
                    h="16"
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'start'}
                    gap={4}
                    p={4}
                    borderRadius={'lg'}
                    bg={currentPath === 'Training' ? '#AA58F4' : 'inherit'}>
                    <MaterialCommunityIcons
                      name="dumbbell"
                      size={22}
                      color={currentPath === 'Training' ? 'white' : '#333'}
                    />
                    <Text
                      style={{
                        ...styles.subTextTitle,
                        color: currentPath === 'Training' ? 'white' : '#333',
                      }}
                      fontSize={'md'}>
                      Treino
                    </Text>
                  </Flex>
                );
              }}
            </Pressable>
            <Pressable w="full" onPress={() => navigation.navigate('Food')}>
              {({ isHovered, isFocused, isPressed }) => {
                return (
                  <Flex
                    w="full"
                    h="16"
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'start'}
                    gap={4}
                    p={4}
                    borderRadius={'lg'}
                    bg={currentPath === 'Food' ? '#AA58F4' : 'inherit'}>
                    <MaterialCommunityIcons
                      name="silverware-fork-knife"
                      size={22}
                      color={currentPath === 'Food' ? 'white' : '#333'}
                    />
                    <Text
                      style={{
                        ...styles.subTextTitle,
                        color: currentPath === 'Food' ? 'white' : '#333',
                      }}
                      fontSize={'md'}>
                      Dieta
                    </Text>
                  </Flex>
                );
              }}
            </Pressable>
          </VStack>
          <View
            style={{
              padding: 20,
              borderTopWidth: 1,
              borderTopColor: '#ccc',
            }}>
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
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  sideBar: {
    flex: 0.2,
    margin: 0,
    backgroundColor: 'white',
    borderRightWidth: 1,
    borderRightColor: '#773DAA',
    height: '100%',
  },
  content: {
    flex: 1,
  },
  textTitle: {
    fontFamily: 'Quicksand_700Bold',
    textAlign: 'center',
  },
  subTextTitle: {
    fontSize: 15,
    fontFamily: 'Quicksand_700Bold',
    textAlign: 'center',
  },
  steps: {
    flexDirection: 'row',
  },
  nextButton: {
    alignItems: 'flex-end',
    width: '100%',
  },
});

export default LayoutWeb;
