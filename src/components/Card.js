import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { useMediaQuery } from 'react-responsive';

const img = require('../../assets/tutorial-screen/imgOne.png');

const Card = ({ title, description, image, number }) => {
  const { height, width } = useWindowDimensions();

  const isTabletOrMobileDevice = useMediaQuery({
    maxDeviceWidth: 1224,
  });

  if (isTabletOrMobileDevice) {
    return (
      <View style={styles.screen}>
        <Image
          source={img}
          style={{
            width: Math.round(width * 0.6),
            height: Math.round(height * 0.23),
            resizeMode: 'contain',
          }}
        />
        <Text
          style={{
            fontSize: Math.round(width * 0.045),
            paddingHorizontal: 10,
            ...styles.textTitle,
          }}>
          Titulo
        </Text>
        <Text
          style={{
            fontSize: Math.round(width * 0.027),
            paddingHorizontal: 10,
            ...styles.subTextTitle,
          }}>
          No seu board e de seus colegas, é possível visualizar os feedbacks recebidos, utilize este
          espaço para enviar comentarios a outros frequentadores
        </Text>
        <View
          style={{
            ...styles.cardNumber,
            width: Math.round(width * 0.08),
            height: Math.round(height * 0.06),
          }}>
          <Text
            style={{
              fontSize: Math.round(width * 0.035),
              fontFamily: 'Quicksand_700Bold',
              color: '#1890FF',
            }}>
            1
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Image
        source={img}
        style={{
          width: Math.round(width * 0.2),
          height: Math.round(height * 0.23),
          resizeMode: 'contain',
        }}
      />
      <Text
        style={{ fontSize: Math.round(width * 0.015), paddingHorizontal: 10, ...styles.textTitle }}>
        Titulo
      </Text>
      <Text
        style={{
          fontSize: Math.round(width * 0.01),
          paddingHorizontal: 10,
          ...styles.subTextTitle,
        }}>
        No seu board e de seus colegas, é possível visualizar os feedbacks recebidos, utilize este
        espaço para enviar comentarios a outros frequentadores
      </Text>
      <View
        style={{
          ...styles.cardNumber,
          width: Math.round(width * 0.04),
          height: Math.round(height * 0.07),
        }}>
        <Text
          style={{
            fontSize: Math.round(width * 0.018),
            fontFamily: 'Quicksand_700Bold',
            color: '#1890FF',
          }}>
          1
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 16,
    backgroundColor: 'white',
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 3,
  },
  textTitle: {
    fontFamily: 'Quicksand_700Bold',
    textAlign: 'center',
  },
  subTextTitle: {
    fontFamily: 'Quicksand_400Regular',
    color: '#8C8C8C',
    textAlign: 'center',
  },
  cardNumber: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BAE7FF',
    textAlign: 'center',
    alignSelf: 'flex-start',
  },
});

export default Card;
