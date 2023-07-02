import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from './Header';

const LayoutWeb = (props) => {
  return (
    <>
      <Header />
      <View style={styles.screen}>
        <View style={styles.sideBar}></View>
        {props.children}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideBar: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

export default LayoutWeb;
