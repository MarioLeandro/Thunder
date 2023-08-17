import { useMediaQuery } from 'react-responsive';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  Select,
  Spinner,
  VStack,
  useToast,
} from 'native-base';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import TutorialMobile from './TutorialMobile';
import TutorialWeb from './TutorialWeb';
import LayoutWeb from '../../components/LayoutWeb';
import api from '../../services/api';
import CustomToast from '../../components/CustomToast';

export default function TutorialScreen() {
  const toast = useToast();
  const { height, width } = useWindowDimensions();
  const isTabletOrMobileDevice = useMediaQuery({
    maxDeviceWidth: 1224,
  });

  const [loading, setLoading] = useState(false);
  const [trainingData, setTrainingData] = useState(null);
  const [training, setTraining] = useState(false);
  const [focus, setFocus] = useState('');
  const [userLevel, setUserLevel] = useState('');
  const [userWeigth, setUserWeigth] = useState('');
  const [userHeight, setUserHeight] = useState('');

  const handleGetTraining = async () => {
    if (!focus || !userLevel || !userWeigth || !userHeight) {
      return toast.show({
        placement: 'bottom',
        render: () => {
          return (
            <CustomToast
              description={'Preencha todos os campos'}
              title={'Erro'}
              variant={'solid'}
              duration={1000}
              status={'error'}
            />
          );
        },
      });
    }
    setLoading(true);
    try {
      const { data } = await api.post('/training', {
        focus,
        level: userLevel,
        height: userHeight,
        weight: userWeigth,
      });

      setTrainingData(data);
      setTraining(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const clear = async () => {
    setTrainingData(null);
    setTraining(false);
    setFocus('');
    setUserLevel('');
    setUserWeigth('');
    setUserHeight('');
  };

  if (loading) {
    if (isTabletOrMobileDevice) {
      return (
        <Center height={'full'} width={'full'}>
          <Spinner />
        </Center>
      );
    } else {
      return (
        <LayoutWeb>
          <Center height={'full'} width={'full'}>
            <Spinner />
          </Center>
        </LayoutWeb>
      );
    }
  }

  console.log(userLevel);

  if (!training) {
    if (isTabletOrMobileDevice) {
      return (
        <View style={styles.container}>
          <Center /* bg="white" */ width={width} flex={1}>
            <Box w="90%" maxW="290" maxH={'90%'}>
              <Heading
                size="lg"
                fontWeight="600"
                color="black"
                textAlign={'center'}
                fontFamily={'Quicksand_700Bold'}>
                Olá
              </Heading>
              <Heading
                mt="1"
                color="black"
                fontWeight="medium"
                size="xs"
                textAlign={'center'}
                fontFamily={'Quicksand_400Regular'}>
                Preencha as informações abaixo para um treino mais preciso e especifico!
              </Heading>
              <Center>
                <Heading
                  mt="4"
                  color="red.700"
                  fontWeight="medium"
                  size="xs"
                  textAlign={'center'}
                  fontFamily={'Quicksand_400Regular'}>
                  Lembrando que Inteligência Artificial não substitui um profissional
                </Heading>
                <Ionicons name="warning" size={24} color="red" />
              </Center>
              <VStack space={3}>
                <FormControl>
                  <FormControl.Label _text={{ color: 'black' }}>Altura</FormControl.Label>
                  <Input
                    size={'lg'}
                    bgColor={'coolGray.100'}
                    placeholder="Ex: 1.72m"
                    value={userHeight}
                    onChangeText={(text) => setUserHeight(text)}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label _text={{ color: 'black' }}>Peso</FormControl.Label>
                  <Input
                    size={'lg'}
                    bgColor={'coolGray.100'}
                    placeholder="Ex: 60kg"
                    value={userWeigth}
                    onChangeText={(text) => setUserWeigth(text)}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label _text={{ color: 'black' }}>Nível do Usuário</FormControl.Label>
                  <Select
                    minWidth="200"
                    accessibilityLabel="Escolher nível"
                    placeholder="Escolher nível"
                    value={userLevel}
                    size={'lg'}
                    bgColor={'coolGray.100'}
                    onValueChange={(text) => setUserLevel(text)}
                    mt="1">
                    <Select.Item label="Iniciante" value="Iniciante" />
                    <Select.Item label="Intermediário" value="Intermediário" />
                    <Select.Item label="Avançado" value="Avançado" />
                  </Select>
                </FormControl>
                <FormControl>
                  <FormControl.Label _text={{ color: 'black' }}>Foco do Treino</FormControl.Label>
                  <Input
                    size={'lg'}
                    bgColor={'coolGray.100'}
                    placeholder="Ex: Peito e Braço"
                    value={focus}
                    onChangeText={(text) => setFocus(text)}
                  />
                </FormControl>
                <Button mt="2" colorScheme={'coolGray'} onPress={() => handleGetTraining()}>
                  Gerar treino
                </Button>
              </VStack>
            </Box>
          </Center>
        </View>
      );
    } else {
      return (
        <LayoutWeb>
          <View style={styles.container}>
            <Center /* bg="white" */ width={width} flex={1}>
              <Box w="90%" maxW="290" maxH={'90%'}>
                <Heading
                  size="lg"
                  fontWeight="600"
                  color="black"
                  textAlign={'center'}
                  fontFamily={'Quicksand_700Bold'}>
                  Olá
                </Heading>
                <Heading
                  mt="1"
                  color="black"
                  fontWeight="medium"
                  size="xs"
                  textAlign={'center'}
                  fontFamily={'Quicksand_400Regular'}>
                  Preencha as informações abaixo para um treino mais preciso e especifico!
                </Heading>
                <Center>
                  <Heading
                    mt="4"
                    color="red.700"
                    fontWeight="medium"
                    size="xs"
                    textAlign={'center'}
                    fontFamily={'Quicksand_400Regular'}>
                    Lembrando que Inteligência Artificial não substitui um profissional
                  </Heading>
                  <Ionicons name="warning" size={24} color="red" />
                </Center>
                <VStack space={3}>
                  <FormControl>
                    <FormControl.Label _text={{ color: 'black' }}>Altura</FormControl.Label>
                    <Input
                      size={'lg'}
                      bgColor={'coolGray.100'}
                      placeholder="Ex: 1.72m"
                      value={userHeight}
                      onChangeText={(text) => setUserHeight(text)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormControl.Label _text={{ color: 'black' }}>Peso</FormControl.Label>
                    <Input
                      size={'lg'}
                      bgColor={'coolGray.100'}
                      placeholder="Ex: 60kg"
                      value={userWeigth}
                      onChangeText={(text) => setUserWeigth(text)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormControl.Label _text={{ color: 'black' }}>
                      Nível do Usuário
                    </FormControl.Label>
                    <Select
                      minWidth="200"
                      accessibilityLabel="Escolher nível"
                      placeholder="Escolher nível"
                      value={userLevel}
                      size={'lg'}
                      bgColor={'coolGray.100'}
                      onValueChange={(text) => setUserLevel(text)}
                      mt="1">
                      <Select.Item label="Iniciante" value="Iniciante" />
                      <Select.Item label="Intermediário" value="Intermediário" />
                      <Select.Item label="Avançado" value="Avançado" />
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormControl.Label _text={{ color: 'black' }}>Foco do Treino</FormControl.Label>
                    <Input
                      size={'lg'}
                      bgColor={'coolGray.100'}
                      placeholder="Ex: Peito e Braço"
                      value={focus}
                      onChangeText={(text) => setFocus(text)}
                    />
                  </FormControl>
                  <Button mt="2" colorScheme={'coolGray'} onPress={() => handleGetTraining()}>
                    Gerar treino
                  </Button>
                </VStack>
              </Box>
            </Center>
          </View>
        </LayoutWeb>
      );
    }
  }

  if (isTabletOrMobileDevice) {
    return <TutorialMobile data={trainingData} clear={clear} />;
  }

  return (
    <LayoutWeb>
      <TutorialWeb data={trainingData} clear={clear} />
    </LayoutWeb>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
