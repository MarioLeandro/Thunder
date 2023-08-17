import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../../components/Card';
import AppIntroSlider from 'react-native-app-intro-slider';
import { LevelUpModal } from '../../../components/LevelUpModal';
import { Center, Spinner, useToast } from 'native-base';
import AuthContext from '../../../contexts/auth';
import api from '../../../services/api';
import CustomToast from '../../../components/CustomToast';
const imgOne = require('../../../../assets/tutorial-screen/imgOne.jpg');
const imgTwo = require('../../../../assets/tutorial-screen/imgTwo.jpg');
const imgThree = require('../../../../assets/tutorial-screen/imgThree.jpg');
const imgFour = require('../../../../assets/tutorial-screen/imgFour.png');

const TutorialMobile = (props) => {
  const toast = useToast();

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
  console.log(isLevelUpModalOpen);

  return !isLevelIncreasing ? (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        padding: 48,
      }}>
      <Text style={{ fontSize: Math.round(width * 0.06), ...styles.textTitle }}>Seu treino</Text>
      <Text style={{ fontSize: Math.round(width * 0.04), marginBottom: 0, ...styles.subTextTitle }}>
        Siga os passos a seguir e aumente seu nível dentro e fora da plataforma
      </Text>
      <AppIntroSlider
        onDone={() => completeChallenge()}
        renderDoneButton={() => (
          <Ionicons name="checkmark-circle-outline" size={52} color="#6DAC4E" />
        )}
        renderNextButton={() => (
          <Ionicons name="arrow-forward-circle-outline" size={52} color="#434343" />
        )}
        renderPrevButton={() => (
          <Ionicons name="arrow-back-circle-outline" size={52} color="#434343" />
        )}
        renderItem={({ item, index }) => (
          <View style={{ height: Math.round(height * 0.55) }}>
            <Card
              key={index}
              item={item}
              number={index + 1}
              title={props.data?.passos[index].exercicio || ''}
              description={props.data?.passos[index].descricao || ''}
            />
          </View>
        )}
        data={[imgOne, imgTwo, imgThree, imgFour]}
        activeDotStyle={{
          backgroundColor: '#009cff',
          width: 30,
        }}
        showPrevButton={true}
      />
      <LevelUpModal
        isLevelUpModalOpen={isLevelUpModalOpen}
        setIsLevelUpModalOpen={setIsLevelUpModalOpen}
        clear={props.clear}
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
