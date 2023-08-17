import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';
import { Avatar, Box, Button, Flex, HStack, Icon, Modal, useToast } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import AuthContext from '../contexts/auth';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Platform } from 'react-native';
import { useDropzone } from 'react-dropzone';
import CustomToast from './CustomToast';
import api from '../services/api';

const CustomDrawer = (props) => {
  const navigation = useNavigation();

  const handleSignOut = async () => {
    await logout();
    navigation.navigate('Login');
  };

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
    console.log(assets[0]);
    const filename = assets[0].uri.substring(
      assets[0].uri.lastIndexOf('/') + 1,
      assets[0].uri.length
    );
    const extend = filename.split('.')[1];

    if (!canceled) {
      setImage({ uri: assets[0].uri, name: filename, type: 'image/' + extend });
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

  const [isChangePicModalOpen, setIsChangePicModalOpen] = useState(false);

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

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView contentContainerStyle={{ backgroundColor: '#AA58F4' }}>
        <View style={{ padding: 20 }}>
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

export default CustomDrawer;
