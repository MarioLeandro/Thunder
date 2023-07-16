import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../../components/Card';
import { LevelUpModal } from '../../../components/LevelUpModal';
import AuthContext from '../../../contexts/auth';
import { Center, Spinner } from 'native-base';
import api from '../../../services/api';

const TutorialWeb = (props) => {
  const { user, setLevelUp } = useContext(AuthContext);

  const { height, width } = useWindowDimensions();
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const [isLevelIncreasing, setIsLevelIncreasing] = useState(false);
  const experienceToNextLevel = Math.pow((user.level + 1) * 4, 2);

  async function completeChallenge() {
    setIsLevelIncreasing(true);

    let finalExperience = user.currentExperience + 12;

    let finalLevel = user.level;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      finalLevel++;
    }

    try {
      await api.post('/user/levelUp', {
        finalExperience,
        finalLevel,
      });
    } catch (error) {
      console.error(error);
      toast.show({
        placement: 'bottom',
        render: () => {
          return (
            <CustomToast
              description={'Ocorreu um erro'}
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
      if (finalLevel > user.level) {
        setIsLevelUpModalOpen(true);
      }
      setIsLevelIncreasing(false);
    }
  }

  return !isLevelIncreasing ? (
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
          onPress={() => completeChallenge()}
          name="checkmark-circle-outline"
          size={52}
          color="#6DAC4E"
        />
      </TouchableOpacity>
      <LevelUpModal
        isLevelUpModalOpen={isLevelUpModalOpen}
        setIsLevelUpModalOpen={setIsLevelUpModalOpen}
      />
    </View>
  ) : (
    <Center height={'full'} width={'full'}>
      <Spinner />
    </Center>
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
