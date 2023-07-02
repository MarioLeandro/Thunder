import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../../components/Card';
import AppIntroSlider from 'react-native-app-intro-slider';

const TutorialMobile = (props) => {
  const { height, width } = useWindowDimensions();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        padding: 48,
      }}>
      <Text style={{ fontSize: Math.round(width * 0.06), ...styles.textTitle }}>Seu treino</Text>
      <Text
        style={{ fontSize: Math.round(width * 0.04), marginBottom: 64, ...styles.subTextTitle }}>
        Siga os passos a seguir e aumente seu nível dentro e fora da plataforma
      </Text>
      <AppIntroSlider
        renderDoneButton={() => (
          <Ionicons name="checkmark-circle-outline" size={52} color="#6DAC4E" />
        )}
        renderNextButton={() => (
          <Ionicons name="arrow-forward-circle-outline" size={52} color="#434343" />
        )}
        renderPrevButton={() => (
          <Ionicons name="arrow-back-circle-outline" size={52} color="#434343" />
        )}
        renderItem={() => (
          <View style={{ height: Math.round(height * 0.55) }}>
            <Card />
          </View>
        )}
        data={[1, 2, 3, 4]}
        activeDotStyle={{
          backgroundColor: '#009cff',
          width: 30,
        }}
        showPrevButton={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 48,
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
  steps: {
    flexDirection: 'row',
  },
  nextButton: {
    alignItems: 'flex-end',
    width: '100%',
  },
});

export default TutorialMobile;
