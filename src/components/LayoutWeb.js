import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import {
  VStack,
  Pressable,
  Flex,
  HStack,
  Box,
  Progress,
  Button,
  Modal,
  Icon,
  Avatar,
  useToast,
} from 'native-base';

import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import api from '../services/api';
import { useDropzone } from 'react-dropzone';
import AuthContext from '../contexts/auth';
import CustomToast from './CustomToast';

const LayoutWeb = ({ children }) => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const toast = useToast();

  const pickImage = async () => {
    const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: false,
      aspect: [4, 4],
      quality: 1,
    });

    if (!canceled) {
      setImage({ uri: assets[0].uri, name: assets[0].fileName, type: assets[0].type });
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    console.log('dpzone');
    const file = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(file);
    setImage({ uri: fileUrl, file });
    console.log(file);
  }, []);

  let dpZone = null;

  if (Platform.OS === 'web' && !dpZone) {
    dpZone = useDropzone({
      accept: {
        'image/jpeg': ['.jpeg', '.png'],
      },
      maxFiles: 1,
      onDrop,
      noDrag: true,
    });
  }

  const { logout, user, setLevelUp } = useContext(AuthContext);
  const experienceToNextLevel = Math.pow((user.level + 1) * 4, 2);

  const [isChangePicModalOpen, setIsChangePicModalOpen] = useState(false);

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
  }, [navigation]);

  const route = useRoute();
  const currentPath = route.name;

  const handleSaveProfilePic = async () => {
    if (!image) {
      toast.show({
        placement: 'bottom',
        render: () => {
          return (
            <CustomToast
              description={'Envie uma imagem'}
              title={'Erro'}
              variant={'solid'}
              duration={1000}
              status={'error'}
            />
          );
        },
      });

      return;
    }

    const post = new FormData();
    post.append('image', Platform.OS === 'web' ? image?.file : image);

    try {
      await api.post('/user/profile_pic', post, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.show({
        placement: 'bottom',
        render: () => {
          return (
            <CustomToast
              description={'Concluído'}
              title={'Sucesso'}
              variant={'solid'}
              duration={1000}
              status={'success'}
            />
          );
        },
      });
      setIsChangePicModalOpen(false);
      setImage(null);
    } catch (error) {
      console.error(error);
      toast.show({
        placement: 'bottom',
        render: () => {
          return (
            <CustomToast
              description={'Erro ao postar'}
              title={'Erro'}
              variant={'solid'}
              duration={1000}
              status={'error'}
            />
          );
        },
      });
    } finally {
      setLevelUp(true);
    }
  };

  console.log(user);

  return (
    <View style={styles.container}>
      <View style={styles.sideBar}>
        <View style={{ padding: 20, backgroundColor: '#AA58F4' }}>
          <TouchableOpacity
            onPress={() => setIsChangePicModalOpen(true)}
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
          <Box w="50%" maxW="400" mt="4">
            <Progress
              value={(user.currentExperience / experienceToNextLevel) * 100 || 0}
              colorScheme="light"
            />
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
      <Modal
        isOpen={isChangePicModalOpen}
        onClose={() => {
          setIsChangePicModalOpen(false);
          setImage(null);
        }}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Body>
            <Flex justifyContent={'center'} alignItems={'center'} gap={4}>
              {!image && (
                <Avatar
                  bg="lightBlue.400"
                  size="2xl"
                  source={{
                    uri: `http://192.168.1.106:3001/${user.picture}`,
                  }}>
                  {user.name.charAt(0)}
                </Avatar>
              )}
              {image && Platform.OS !== 'web' && (
                <Avatar
                  bg="lightBlue.400"
                  size="2xl"
                  source={{
                    uri: image?.uri,
                  }}>
                  {user.name.charAt(0)}
                </Avatar>
              )}
              {Platform.OS === 'web' && image && (
                <Avatar
                  bg="lightBlue.400"
                  size="2xl"
                  source={{
                    uri: image?.uri,
                  }}>
                  {user.name.charAt(0)}
                </Avatar>
              )}
              <Flex direction="row" alignItems={'center'}>
                {Platform.OS === 'web' && (
                  <div {...dpZone.getRootProps()}>
                    <input id="inputImage" {...dpZone.getInputProps()} />
                    <Flex flexDirection={'row'} gap={4}>
                      <Box cursor="pointer">
                        <Button
                          pointerEvents="none"
                          leftIcon={<Icon as={Feather} name="edit" size={22} color={'white'} />}
                          colorScheme={'violet'}>
                          <Text style={{ color: 'white' }}>Editar</Text>
                        </Button>
                      </Box>
                      <Button bgColor={'green.600'} onPress={() => handleSaveProfilePic()}>
                        <Text style={{ color: 'white' }}>Salvar</Text>
                      </Button>
                    </Flex>
                  </div>
                )}
                {Platform.OS !== 'web' && (
                  <Flex flexDirection={'row'} gap={4}>
                    <Button
                      onPress={pickImage}
                      leftIcon={<Icon as={Feather} name="edit" size={22} color={'white'} />}
                      colorScheme={'violet'}>
                      <Text style={{ color: 'white' }}>Editar</Text>
                    </Button>
                    <Button bgColor={'green.600'} onPress={() => handleSaveProfilePic()}>
                      <Text style={{ color: 'white' }}>Salvar</Text>
                    </Button>
                  </Flex>
                )}
              </Flex>
            </Flex>
          </Modal.Body>
        </Modal.Content>
      </Modal>
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
