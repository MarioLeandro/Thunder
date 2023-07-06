import React, { useState } from 'react';
import { View, StyleSheet, useWindowDimensions, Touchable, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Flex, Text, Image, TextArea, Button, Divider, FlatList, Fab, Modal } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import { useMediaQuery } from 'react-responsive';

const FeedWeb = (props) => {
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { height, width } = useWindowDimensions();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
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
            maxH={500}
            direction="column"
            alignItems={'center'}
            borderRadius={'lg'}
            shadow={'5'}
            justifyContent={'space-between'}
            gap={4}
            px="10"
            py="4">
            <Flex
              direction="row"
              justifyContent={'space-between'}
              alignItems={'flex-start'}
              w="100%">
              {!isTabletOrMobileDevice && (
                <View>
                  <Image
                    source={{ uri: 'https://avatars.githubusercontent.com/u/63363561?v=4' }}
                    style={{ height: 50, width: 50, borderRadius: 40 }}
                  />
                </View>
              )}

              <TextArea
                w={isTabletOrMobileDevice ? '100%' : '90%'}
                h={140}
                borderRadius={'lg'}
                variant="unstyled"
                placeholder="O que você está pensando?"
                size="xl"
                p="4"
                backgroundColor="gray.100"
              />
            </Flex>
            <Divider />
            <Flex direction="row-reverse" justifyContent={'space-between'} w="100%">
              <Button colorScheme={'violet'} minW={100}>
                <Text color={'white'}>Postar</Text>
              </Button>
              <Flex direction="row" alignItems={'center'}>
                {isTabletOrMobileDevice && (
                  <>
                    <View>
                      <Image
                        source={{ uri: 'https://avatars.githubusercontent.com/u/63363561?v=4' }}
                        style={{ height: 50, width: 50, borderRadius: 40 }}
                      />
                    </View>
                    <Divider orientation="vertical" mx="3" />
                  </>
                )}
                <TouchableOpacity>
                  <Ionicons name="image-outline" size={22} />
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
                borderRadius={'lg'}
                variant="unstyled"
                placeholder="O que você está pensando?"
                size="xl"
                p="4"
                backgroundColor="gray.100"
              />
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: '100%', height: isTabletOrMobileDevice ? 200 : 550 }}
                  resizeMode={'contain'}
                />
              )}
            </Flex>
          </Modal.Body>
          <Modal.Footer>
            <Flex direction="row-reverse" justifyContent={'space-between'} w="100%">
              <Button colorScheme={'violet'} minW={100}>
                <Text color={'white'}>Postar</Text>
              </Button>
              <Flex direction="row" alignItems={'center'}>
                <TouchableOpacity onPress={pickImage}>
                  <Ionicons name="image-outline" size={22} />
                </TouchableOpacity>
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
