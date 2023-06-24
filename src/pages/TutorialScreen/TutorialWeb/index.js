import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../../components/Card';

const TutorialWeb = (props) => {
  const { height, width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: Math.round(width * 0.04), ...styles.textTitle }}>Seu treino</Text>
        <Text style={{ fontSize: Math.round(width * 0.02), ...styles.subTextTitle }}>
          Siga os passos a seguir e aumente seu nível dentro e fora da plataforma
        </Text>
      </View>
      <View style={{ ...styles.steps, height: Math.round(height * 0.5) }}>
        {[1, 2, 3, 4].map((number) => (
          <Card key={number} />
        ))}
      </View>
      <TouchableOpacity style={styles.nextButton} underlayColor="white">
        <Ionicons
          onPress={() => console.log('oi')}
          name="checkmark-circle-outline"
          size={52}
          color="#6DAC4E"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
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

export default TutorialWeb;
