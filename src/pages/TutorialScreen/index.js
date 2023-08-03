import { useMediaQuery } from 'react-responsive';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Heading,
  Icon,
  Input,
  Link,
  Pressable,
  Select,
  Text,
  VStack,
} from 'native-base';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import TutorialMobile from './TutorialMobile';
import TutorialWeb from './TutorialWeb';
import LayoutWeb from '../../components/LayoutWeb';

export default function TutorialScreen() {
  const [training, setTraining] = useState(false);
  const { height, width } = useWindowDimensions();

  const [focus, setFocus] = useState('');
  const [userLevel, setUserLevel] = useState('');
  const [userWeigth, setUserWeigth] = useState('');
  const [userHeight, setUserHeight] = useState('');

  const isTabletOrMobileDevice = useMediaQuery({
    maxDeviceWidth: 1224,
  });

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

              <VStack space={3} mt="5">
                <FormControl>
                  <FormControl.Label _text={{ color: 'black' }}>Altura</FormControl.Label>
                  <Input
                    size={'lg'}
                    bgColor={'coolGray.100'}
                    value={userHeight}
                    onChangeText={(text) => setUserHeight(text)}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label _text={{ color: 'black' }}>Peso</FormControl.Label>
                  <Input
                    size={'lg'}
                    bgColor={'coolGray.100'}
                    value={userWeigth}
                    onChangeText={(text) => setUserWeigth(text)}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label _text={{ color: 'black' }}>Nível do Usuário</FormControl.Label>
                  <Select
                    minWidth="200"
                    accessibilityLabel="Escolher nível"
                    value={userLevel}
                    size={'lg'}
                    bgColor={'coolGray.100'}
                    onChangeText={(text) => setUserLevel(text)}
                    mt="1">
                    <Select.Item label="Iniciante" value="starter" />
                    <Select.Item label="Intermediário" value="medium" />
                    <Select.Item label="Avançado" value="advanced" />
                  </Select>
                </FormControl>
                <FormControl>
                  <FormControl.Label _text={{ color: 'black' }}>Foco do Treino</FormControl.Label>
                  <Input
                    size={'lg'}
                    bgColor={'coolGray.100'}
                    value={focus}
                    onChangeText={(text) => setFocus(text)}
                  />
                </FormControl>
                <Button mt="2" colorScheme={'coolGray'} onPress={() => setTraining(true)}>
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

                <VStack space={3} mt="5">
                  <FormControl>
                    <FormControl.Label _text={{ color: 'black' }}>Altura</FormControl.Label>
                    <Input
                      size={'lg'}
                      bgColor={'coolGray.100'}
                      value={userHeight}
                      onChangeText={(text) => setUserHeight(text)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormControl.Label _text={{ color: 'black' }}>Peso</FormControl.Label>
                    <Input
                      size={'lg'}
                      bgColor={'coolGray.100'}
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
                      value={userLevel}
                      size={'lg'}
                      bgColor={'coolGray.100'}
                      onChangeText={(text) => setUserLevel(text)}
                      mt="1">
                      <Select.Item label="Iniciante" value="starter" />
                      <Select.Item label="Intermediário" value="medium" />
                      <Select.Item label="Avançado" value="advanced" />
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormControl.Label _text={{ color: 'black' }}>Foco do Treino</FormControl.Label>
                    <Input
                      size={'lg'}
                      bgColor={'coolGray.100'}
                      value={focus}
                      onChangeText={(text) => setFocus(text)}
                    />
                  </FormControl>
                  <Button mt="2" colorScheme={'coolGray'} onPress={() => setTraining(true)}>
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
    return <TutorialMobile />;
  }

  return (
    <LayoutWeb>
      <TutorialWeb />
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
