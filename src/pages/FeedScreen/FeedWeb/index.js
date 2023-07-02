import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Center, VStack, Pressable, Flex, Text } from 'native-base';

const FeedWeb = (props) => {
  const { height, width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <View style={styles.sideBar}>
        <VStack alignItems="center">
          <Pressable w="full">
            {({ isHovered, isFocused, isPressed }) => {
              return (
                <Flex
                  w="full"
                  h="20"
                  flexDirection={'row'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  gap={4}
                  bg={isHovered ? '#8846C3' : 'inherit'}
                  style={{ transition: '.3s ease' }}>
                  <Ionicons name="home" size={26} color={'white'} />
                  <Text style={styles.subTextTitle} fontSize={'md'}>
                    Início
                  </Text>
                </Flex>
              );
            }}
          </Pressable>
          <Pressable w="full">
            {({ isHovered, isFocused, isPressed }) => {
              return (
                <Flex
                  w="full"
                  h="20"
                  flexDirection={'row'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  gap={4}
                  bg={isHovered ? '#8846C3' : 'inherit'}
                  style={{ transition: '.3s ease' }}>
                  <Ionicons name="home" size={26} color={'white'} />
                  <Text style={styles.subTextTitle} fontSize={'md'}>
                    Home
                  </Text>
                </Flex>
              );
            }}
          </Pressable>
          <Pressable w="full">
            {({ isHovered, isFocused, isPressed }) => {
              return (
                <Flex
                  w="full"
                  h="20"
                  flexDirection={'row'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  gap={4}
                  bg={isHovered ? '#8846C3' : 'inherit'}
                  style={{ transition: '.3s ease' }}>
                  <MaterialCommunityIcons name="silverware-fork-knife" size={26} color={'white'} />
                  <Text style={styles.subTextTitle} fontSize={'md'}>
                    Dieta
                  </Text>
                </Flex>
              );
            }}
          </Pressable>
        </VStack>
      </View>
      <View style={styles.content}></View>
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
    backgroundColor: '#AA58F4',
    borderRightWidth: 1,
    borderRightColor: '#773DAA',
  },
  content: {
    flex: 1,
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
  steps: {
    flexDirection: 'row',
  },
  nextButton: {
    alignItems: 'flex-end',
    width: '100%',
  },
});

export default FeedWeb;
