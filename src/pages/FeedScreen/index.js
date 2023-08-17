import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, StyleSheet, useWindowDimensions, TouchableOpacity, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Flex,
  Text,
  Image,
  TextArea,
  Button,
  Divider,
  FlatList,
  Fab,
  Modal,
  useToast,
  Box,
  Actionsheet,
  useDisclose,
  ScrollView,
  Avatar,
} from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import { useMediaQuery } from 'react-responsive';
import api from '../../services/api';
import { useDropzone } from 'react-dropzone';
import CustomToast from '../../components/CustomToast';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import LayoutWeb from '../../components/LayoutWeb';
import AuthContext from '../../contexts/auth';

const FeedScreen = (props) => {
  const toast = useToast();
  const { user, logout, levelUp } = useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclose();

  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [postText, setPostText] = useState(null);
  const [commentText, setCommentText] = useState(null);
  const [posts, setPosts] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  const { height, width } = useWindowDimensions();

  async function getData() {
    try {
      const { data } = await api.get('/post/');
      setPosts(data);
      setSelectedPost(selectedPost ? data.find((post) => post._id === selectedPost._id) : null);
      //setLoading(false);
    } catch (error) {
      console.log(error);
      toast.show({
        placement: 'bottom',
        render: () => {
          return (
            <CustomToast
              description={'Erro ao listar posts'}
              title={'Erro'}
              variant={'solid'}
              duration={1000}
              status={'error'}
            />
          );
        },
      });
    }
  }

  useEffect(() => {
    getData();
  }, [levelUp]);

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
    const file = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(file);
    setImage({ uri: fileUrl, file });
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

  const handleSavePost = async () => {
    //setIsSaving(true);

    if (!postText) {
      toast.show({
        placement: 'bottom',
        render: () => {
          return (
            <CustomToast
              description={'Escreva algo para postar'}
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
    post.append('text', postText);
    post.append('image', Platform.OS === 'web' ? image?.file : image);
    console.log(image);

    try {
      const { data } = await api.post('/post/', post, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!data) {
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
        return;
      }

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
      getData();
      setShowModal(false);
      setPostText('');
      setImage(null);
    } catch (error) {
      console.log(error.name, error.code, error.config, error.request);
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
      //setIsSaving(false)
    }
  };

  const handleSaveComment = async () => {
    //setIsSaving(true);

    try {
      const { data } = await api.post('/post/' + selectedPost._id, {
        text: commentText,
      });

      getData();
      setCommentText('');
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
      //setIsSaving(false)
    }
  };

  const isTabletOrMobileDevice = useMediaQuery({
    maxDeviceWidth: 1224,
  });

  if (isTabletOrMobileDevice) {
    return (
      <View style={{ ...styles.container }}>
        <FlatList
          py={10}
          px={width * 0.05}
          showsVerticalScrollIndicator={false}
          data={posts}
          ItemSeparatorComponent={() => <View style={{ height: 40 }} />}
          onEndReached={() => console.log('carregando...')}
          renderItem={({ item }) => (
            <Flex
              w="full"
              h={'auto'}
              //maxH={500}
              direction="column"
              rounded={'lg'}
              style={
                Platform.OS === 'web'
                  ? {
                      shadowColor: '#171717',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.25,
                      shadowRadius: 50,
                      elevation: 3,
                    }
                  : { borderWidth: 1, borderColor: '#AA58F4' }
              }
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
                  <Avatar
                    bg="lightBlue.400"
                    size="md"
                    source={{
                      uri: `http://192.168.1.106:3001/${item.user.picture}`,
                    }}>
                    {item.user.name.charAt(0)}
                  </Avatar>
                  <Flex>
                    <Text fontFamily={'Quicksand_700Bold'} fontSize={20}>
                      {item.user?.name}
                    </Text>
                    <Text color={'gray.400'}>
                      {formatDistanceToNow(new Date(item.createdAt), {
                        locale: ptBR,
                        addSuffix: true,
                      })}
                    </Text>
                  </Flex>
                </View>
              </Flex>
              <Divider />
              <Flex gap={4}>
                {/* <TextArea
            w={isTabletOrMobileDevice ? '100%' : '90%'}
            h={140}
            overflowY={'scroll'}
            borderRadius={'lg'}
            variant="unstyled"
            size="xl"
            value={item.text}
            isReadOnly
            p="4"
          /> */}
                <ScrollView w={isTabletOrMobileDevice ? '100%' : '90%'} h={140} p="4">
                  <Text fontSize={16}>{item.text}</Text>
                </ScrollView>
                {item.image && (
                  <Image
                    alt="post"
                    bgColor={'black'}
                    source={{ uri: `http://192.168.1.106:3001/${item.image}` }}
                    style={{
                      width: '100%',
                      height: isTabletOrMobileDevice ? 200 : 500,
                      borderRadius: 20,
                    }}
                    resizeMode={'contain'}
                  />
                )}
              </Flex>
              <Flex direction="row" justifyContent={'flex-end'} w="100%">
                <Flex direction="row" alignItems={'center'}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedPost(item);
                      onOpen();
                    }}>
                    <MaterialCommunityIcons name="comment-outline" size={22} />
                  </TouchableOpacity>
                </Flex>
              </Flex>
            </Flex>
          )}
          keyExtractor={(item, index) => item._id}
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
              <View
                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Avatar
                  bg="lightBlue.400"
                  size="md"
                  source={{
                    uri: `http://192.168.1.106:3001/${user.picture}`,
                  }}>
                  {user.name.charAt(0)}
                </Avatar>
                <Text fontFamily={'Quicksand_700Bold'} fontSize={20}>
                  {user.name}
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
                      style={{
                        width: '100%',
                        height: isTabletOrMobileDevice ? 200 : 500,
                        borderRadius: 20,
                      }}
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
                      borderRadius: 20,
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
                      <Box cursor={'pointer'}>
                        <Ionicons name="image-outline" size={22} />
                      </Box>
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
        <Actionsheet
          isOpen={isOpen}
          onClose={() => {
            setSelectedPost(null);
            onClose();
          }}>
          <Actionsheet.Content>
            <Box w="100%" h={60} px={4} justifyContent="center">
              <Text fontFamily={'Quicksand_700Bold'} fontSize={20}>
                Comentários
              </Text>
            </Box>
            <Divider />
            <FlatList
              showsVerticalScrollIndicator={true}
              data={selectedPost?.comments.slice(0, 3)}
              width={'full'}
              ItemSeparatorComponent={() => <Divider />}
              onEndReached={() => console.log('carregando...')}
              renderItem={({ item }) => (
                <Flex
                  w="full"
                  h={'auto'}
                  direction="column"
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
                      <Avatar
                        bg="lightBlue.400"
                        size="md"
                        source={{
                          uri: `http://192.168.1.106:3001/${item.user.picture}`,
                        }}>
                        {item.user.name.charAt(0)}
                      </Avatar>
                      <Text fontFamily={'Quicksand_700Bold'} fontSize={16}>
                        {item.user.name}
                      </Text>
                      <Text color={'gray.400'}>
                        {formatDistanceToNow(new Date(item.createdAt), {
                          locale: ptBR,
                          addSuffix: true,
                        })}
                      </Text>
                    </View>
                  </Flex>
                  <Flex gap={4}>
                    <ScrollView w={isTabletOrMobileDevice ? '100%' : '90%'} h={140} p="4">
                      <Text fontSize={16}>{item.text}</Text>
                    </ScrollView>
                  </Flex>
                </Flex>
              )}
              keyExtractor={(item, index) => item._id}
            />

            <Divider />
            <Flex direction="row" justifyContent={'space-between'} w="full" p="4">
              <TextArea
                w={'70%'}
                h={60}
                //ref={commentText}
                value={commentText}
                onChange={(e) => setCommentText(e.currentTarget.value)}
                onChangeText={(text) => setCommentText(text)}
                borderRadius={'lg'}
                variant="unstyled"
                placeholder="Deixe seu comentário"
                size="lg"
                p="4"
                backgroundColor="gray.200"
              />

              <Button
                colorScheme={'violet'}
                minW={100}
                onPress={() => handleSaveComment()}
                w={'10%'}>
                <Text color={'white'}>Comentar</Text>
              </Button>
            </Flex>
          </Actionsheet.Content>
        </Actionsheet>
      </View>
    );
  }

  return (
    <LayoutWeb>
      <View style={{ ...styles.container }}>
        <FlatList
          py={10}
          px={width * 0.05}
          showsVerticalScrollIndicator={false}
          data={posts}
          ItemSeparatorComponent={() => <View style={{ height: 40 }} />}
          onEndReached={() => console.log('carregando...')}
          renderItem={({ item }) => (
            <Flex
              w="full"
              h={'auto'}
              //maxH={500}
              direction="column"
              rounded={'lg'}
              style={
                Platform.OS === 'web'
                  ? {
                      shadowColor: '#171717',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.25,
                      shadowRadius: 50,
                      elevation: 3,
                    }
                  : { borderWidth: 1, borderColor: '#AA58F4' }
              }
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
                  <Avatar
                    bg="lightBlue.400"
                    size="md"
                    source={{
                      uri: `http://192.168.1.106:3001/${item.user.picture}`,
                    }}>
                    {item.user.name.charAt(0)}
                  </Avatar>
                  <Flex>
                    <Text fontFamily={'Quicksand_700Bold'} fontSize={20}>
                      {item.user?.name}
                    </Text>
                    <Text color={'gray.400'}>
                      {formatDistanceToNow(new Date(item.createdAt), {
                        locale: ptBR,
                        addSuffix: true,
                      })}
                    </Text>
                  </Flex>
                </View>
              </Flex>
              <Divider />
              <Flex gap={4}>
                {/* <TextArea
                w={isTabletOrMobileDevice ? '100%' : '90%'}
                h={140}
                overflowY={'scroll'}
                borderRadius={'lg'}
                variant="unstyled"
                size="xl"
                value={item.text}
                isReadOnly
                p="4"
              /> */}
                <ScrollView w={isTabletOrMobileDevice ? '100%' : '90%'} h={140} p="4">
                  <Text fontSize={16}>{item.text}</Text>
                </ScrollView>
                {item.image && (
                  <Image
                    alt="post"
                    bgColor={'black'}
                    source={{ uri: `http://192.168.1.106:3001/${item.image}` }}
                    style={{
                      width: '100%',
                      height: isTabletOrMobileDevice ? 200 : 500,
                      borderRadius: 20,
                    }}
                    resizeMode={'contain'}
                  />
                )}
              </Flex>
              <Flex direction="row" justifyContent={'flex-end'} w="100%">
                <Flex direction="row" alignItems={'center'}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedPost(item);
                      onOpen();
                    }}>
                    <MaterialCommunityIcons name="comment-outline" size={22} />
                  </TouchableOpacity>
                </Flex>
              </Flex>
            </Flex>
          )}
          keyExtractor={(item, index) => item._id}
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
              <View
                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Avatar
                  bg="lightBlue.400"
                  size="md"
                  source={{
                    uri: `http://192.168.1.106:3001/${user.picture}`,
                  }}>
                  {user.name.charAt(0)}
                </Avatar>
                <Text fontFamily={'Quicksand_700Bold'} fontSize={20}>
                  {user.name}
                </Text>
              </View>
            </Modal.Header>
            <Modal.Body>
              <Flex gap={4}>
                <TextArea
                  w={'100%'}
                  h={140}
                  //ref={postText}
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
                      style={{
                        width: '100%',
                        height: isTabletOrMobileDevice ? 200 : 500,
                        borderRadius: 20,
                      }}
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
                      borderRadius: 20,
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
                      <Box cursor={'pointer'}>
                        <Ionicons name="image-outline" size={22} />
                      </Box>
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
        <Actionsheet
          isOpen={isOpen}
          onClose={() => {
            setSelectedPost(null);
            onClose();
          }}>
          <Actionsheet.Content>
            <Box w="100%" h={60} px={4} justifyContent="center">
              <Text fontFamily={'Quicksand_700Bold'} fontSize={20}>
                Comentários
              </Text>
            </Box>
            <Divider />
            <FlatList
              showsVerticalScrollIndicator={true}
              data={selectedPost?.comments.slice(0, 3)}
              width={'full'}
              ItemSeparatorComponent={() => <Divider />}
              onEndReached={() => console.log('carregando...')}
              renderItem={({ item }) => (
                <Flex
                  w="full"
                  h={'auto'}
                  direction="column"
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
                      <Avatar
                        bg="lightBlue.400"
                        size="md"
                        source={{
                          uri: `http://192.168.1.106:3001/${item.user.picture}`,
                        }}>
                        {item.user.name.charAt(0)}
                      </Avatar>
                      <Text fontFamily={'Quicksand_700Bold'} fontSize={16}>
                        {item.user.name}
                      </Text>
                      <Text color={'gray.400'}>
                        {formatDistanceToNow(new Date(item.createdAt), {
                          locale: ptBR,
                          addSuffix: true,
                        })}
                      </Text>
                    </View>
                  </Flex>
                  <Flex gap={4}>
                    <ScrollView w={isTabletOrMobileDevice ? '100%' : '90%'} h={140} p="4">
                      <Text fontSize={16}>{item.text}</Text>
                    </ScrollView>
                  </Flex>
                </Flex>
              )}
              keyExtractor={(item, index) => item._id}
            />

            <Divider />
            <Flex direction="row" justifyContent={'space-between'} w="full" p="4">
              <TextArea
                w={'70%'}
                h={60}
                //ref={commentText}
                value={commentText}
                onChange={(e) => setCommentText(e.currentTarget.value)}
                onChangeText={(text) => setCommentText(text)}
                borderRadius={'lg'}
                variant="unstyled"
                placeholder="Deixe seu comentário"
                size="lg"
                p="4"
                backgroundColor="gray.200"
              />

              <Button
                colorScheme={'violet'}
                minW={100}
                onPress={() => handleSaveComment()}
                w={'10%'}>
                <Text color={'white'}>Comentar</Text>
              </Button>
            </Flex>
          </Actionsheet.Content>
        </Actionsheet>
      </View>
    </LayoutWeb>
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

export default FeedScreen;
