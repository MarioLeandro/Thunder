import React, { useState, useEffect } from 'react';
import { View, StyleSheet, useWindowDimensions, TouchableOpacity, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Flex, Text, Image, TextArea, Button, Divider, FlatList, Fab, Modal } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import { useMediaQuery } from 'react-responsive';
import api from '../../../services/api';
import { useDropzone } from 'react-dropzone';

const FeedWeb = (props) => {
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [postText, setPostText] = useState('');

  const { height, width } = useWindowDimensions();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
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

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(file);
    setImage({ uri: fileUrl, file });
    console.log(file);
  };

  let dpZone = null;

  if (Platform.OS === 'web') {
    dpZone = useDropzone({
      accept: {
        'image/jpeg': ['.jpeg', '.png'],
      },
      maxFiles: 1,
      onDrop,
    });
  }

  const handleSavePost = async () => {
    //setIsSaving(true);

    // if (!postText) {
    //   toast({
    //     title: `Preencha todos os campos`,
    //     position: 'top-right',
    //     status: 'error',
    //     isClosable: true,
    //   });

    //   return;
    // }

    console.log(postText, image);
    const post = new FormData();
    post.append('text', postText);
    post.append('image', Platform.OS === 'web' ? image.file : image);

    console.log(image);

    try {
      const { data } = await api.post('/post/', post, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // if (!data) {
      //   toast({
      //     title: `Erro ao cadastrar prato`,
      //     position: 'top-right',
      //     status: 'error',
      //     isClosable: true,
      //   });
      //   return;
      // }

      // toast({
      //   title: `Prato cadastrado com sucesso!`,
      //   position: 'top-right',
      //   status: 'success',
      //   isClosable: true,
      // });

      // setTimeout(() => {
      //   navigate('/cal/dish');
      // }, 1000);
      // handle successful response
    } catch (error) {
      console.error(error, 'edasdjsakdjask');
      // toast({
      //   title: `Erro ao cadastrar prato`,
      //   position: 'top-right',
      //   status: 'error',
      //   isClosable: true,
      // });
    } finally {
      //setIsSaving(false)
    }
  };
  const isTabletOrMobileDevice = useMediaQuery({
    maxDeviceWidth: 1224,
  });

  const data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      fullName: 'Aafreen Khan',
      timeStamp: '12:47 PM',
      recentText: 'Good Day!',
      avatarUrl:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      fullName: 'Sujitha Mathur',
      timeStamp: '11:11 PM',
      recentText: 'Cheer up, there!',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      fullName: 'Anci Barroco',
      timeStamp: '6:22 PM',
      recentText: 'Good Day!',
      avatarUrl: 'https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg',
    },
    {
      id: '68694a0f-3da1-431f-bd56-142371e29d72',
      fullName: 'Aniket Kumar',
      timeStamp: '8:56 PM',
      recentText: 'All the best',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU',
    },
    {
      id: '28694a0f-3da1-471f-bd96-142456e29d72',
      fullName: 'Kiara',
      timeStamp: '12:47 PM',
      recentText: 'I will call today.',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
    },
  ];

  return (
    <View style={{ ...styles.container }}>
      <FlatList
        py={10}
        px={width * 0.1}
        showsVerticalScrollIndicator={false}
        data={data}
        ItemSeparatorComponent={() => <View style={{ height: 40 }} />}
        onEndReached={() => console.log('carregando...')}
        renderItem={({ item }) => (
          <Flex
            w="full"
            h={'auto'}
            //maxH={500}
            direction="column"
            borderRadius={'lg'}
            shadow={'5'}
            justifyContent={'space-between'}
            gap={4}
            px="10"
            py="4">
            <Flex>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'flex-start',
                  gap: 10,
                }}>
                <Image
                  alt="post"
                  source={{ uri: 'https://avatars.githubusercontent.com/u/63363561?v=4' }}
                  style={{ height: 50, width: 50, borderRadius: 40 }}
                />
                <Text fontFamily={'Quicksand_700Bold'} fontSize={20}>
                  Mario Leandro
                </Text>
              </View>
            </Flex>
            <Divider />
            <Flex gap={4}>
              <TextArea
                w={isTabletOrMobileDevice ? '100%' : '90%'}
                h={140}
                borderRadius={'lg'}
                variant="unstyled"
                size="xl"
                value="Oi tudo bem ?"
                isReadOnly
                p="4"
              />
              {image && (
                <Image
                  alt="post"
                  source={{ uri: image?.uri }}
                  style={{ width: '100%', height: isTabletOrMobileDevice ? 200 : 500 }}
                  resizeMode={'contain'}
                />
              )}
            </Flex>
            <Flex direction="row" justifyContent={'flex-end'} w="100%">
              <Flex direction="row" alignItems={'center'}>
                <TouchableOpacity>
                  <MaterialCommunityIcons name="comment-outline" size={22} />
                </TouchableOpacity>
              </Flex>
            </Flex>
          </Flex>
        )}
        keyExtractor={(item, index) => item.id}
      />
      <Fab
        renderInPortal={false}
        shadow={2}
        colorScheme={'violet'}
        size="sm"
        onPress={() => setShowModal(true)}
        icon={<MaterialCommunityIcons name="plus" size={22} color="white" />}
      />
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxW={isTabletOrMobileDevice ? '100%' : '40%'}>
          <Modal.CloseButton />
          <Modal.Header>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Image
                alt="post"
                source={{ uri: 'https://avatars.githubusercontent.com/u/63363561?v=4' }}
                style={{ height: 50, width: 50, borderRadius: 40 }}
              />
              <Text fontFamily={'Quicksand_700Bold'} fontSize={20}>
                Mario Leandro
              </Text>
            </View>
          </Modal.Header>
          <Modal.Body>
            <Flex gap={4}>
              <TextArea
                w={'100%'}
                h={140}
                value={postText}
                onChange={(e) => setPostText(e.currentTarget.value)}
                onChangeText={(text) => setPostText(text)}
                borderRadius={'lg'}
                variant="unstyled"
                placeholder="O que você está pensando?"
                size="xl"
                p="4"
                backgroundColor="gray.100"
              />
              {image && Platform.OS !== 'web' && (
                <Flex position={'relative'}>
                  <TouchableOpacity
                    onPress={() => setImage(null)}
                    style={{ zIndex: 999, position: 'absolute', right: 7, top: 25 }}>
                    <Ionicons name="close-circle" size={22} color="gray" />
                  </TouchableOpacity>
                  <Image
                    alt="post"
                    source={{ uri: image?.uri }}
                    style={{ width: '100%', height: isTabletOrMobileDevice ? 200 : 500 }}
                    resizeMode={'stretch'}
                  />
                </Flex>
              )}
              {Platform.OS === 'web' && image && (
                <img
                  src={image?.uri}
                  alt="Uploaded"
                  style={{
                    width: '100%',
                    height: isTabletOrMobileDevice ? 200 : 500,
                    objectFit: 'fill',
                  }}
                />
              )}
            </Flex>
          </Modal.Body>
          <Modal.Footer>
            <Flex direction="row-reverse" justifyContent={'space-between'} w="100%">
              <Button colorScheme={'violet'} minW={100} onPress={() => handleSavePost()}>
                <Text color={'white'}>Postar</Text>
              </Button>
              <Flex direction="row" alignItems={'center'}>
                {Platform.OS === 'web' && (
                  <div {...dpZone.getRootProps()}>
                    <input id="inputImage" {...dpZone.getInputProps()} />
                    <label htmlFor="inputImage" style={{ cursor: 'pointer' }}>
                      <Ionicons name="image-outline" size={22} />
                    </label>
                  </div>
                )}
                {Platform.OS !== 'web' && (
                  <TouchableOpacity onPress={pickImage}>
                    <Ionicons name="image-outline" size={22} />
                  </TouchableOpacity>
                )}
              </Flex>
            </Flex>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    gap: 40,
    flexDirection: 'column',
  },
  textTitle: {
    fontFamily: 'Quicksand_700Bold',
    textAlign: 'center',
  },
  subTextTitle: {
    color: 'white',
    fontFamily: 'Sans',
    textAlign: 'center',
  },
});

export default FeedWeb;
