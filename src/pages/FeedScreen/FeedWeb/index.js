import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Center, VStack, Pressable, Flex, Text } from 'native-base';

const FeedWeb = (props) => {
  const { height, width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>kd meu jogo joão ?</Text>
      </View>
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
