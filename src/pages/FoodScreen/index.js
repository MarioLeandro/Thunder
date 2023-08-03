import { useMediaQuery } from 'react-responsive';
import { StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  HStack,
  Heading,
  Icon,
  Input,
  Link,
  Pressable,
  ScrollView,
  Select,
  Switch,
  Text,
  VStack,
} from 'native-base';
import React, { useState } from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const day = require('../../../assets/food-screen/day.jpg');
const evening = require('../../../assets/food-screen/evening.jpg');
const night = require('../../../assets/food-screen/night.jpg');

import { Parallax, ParallaxLayer } from '@react-spring/parallax';

import LayoutWeb from '../../components/LayoutWeb';
import { LinearGradient } from 'expo-linear-gradient';

export default function FoodScreen() {
  const [fooding, setFooding] = useState(false);
  const { height, width } = useWindowDimensions();

  const [isUserVegan, setIsUserVegan] = useState(false);
  const [userWeigth, setUserWeigth] = useState('');
  const [userHeight, setUserHeight] = useState('');

  const isTabletOrMobileDevice = useMediaQuery({
    maxDeviceWidth: 1224,
  });

  if (!fooding) {
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
                Preencha as informações abaixo para uma dieta mais preciso e especifico!
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
                  <FormControl.Label _text={{ color: 'black' }}>Usuário Vegano ?</FormControl.Label>
                  <Switch colorScheme="primary" value={isUserVegan} />
                </FormControl>

                <Button mt="2" colorScheme={'coolGray'} onPress={() => setFooding(true)}>
                  Gerar dieta
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
                  Preencha as informações abaixo para uma dieta mais preciso e especifico!
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
                      Usuário Vegano ?
                    </FormControl.Label>
                    <Switch colorScheme="primary" value={isUserVegan} />
                  </FormControl>

                  <Button mt="2" colorScheme={'coolGray'} onPress={() => setFooding(true)}>
                    Gerar dieta
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
    return (
      <ScrollView style={{ flex: 1 }}>
        <LinearGradient colors={['#FFE749', '#FC9305', '#002C91']} style={{ padding: 10 }}>
          <Flex
            justifyContent="center"
            alignItems="center"
            bgColor={'white'}
            opacity={0.8}
            p={10}
            borderRadius={'lg'}>
            <Ionicons name="sunny" size={52} color="yellow" />
            <Heading
              size="xl"
              fontWeight="600"
              color="black"
              textAlign={'center'}
              mb={4}
              fontFamily={'Quicksand_700Bold'}>
              Café da Manhã
            </Heading>
            <Flex gap={4}>
              {[
                {
                  alimento: '🍳 Omelete de claras com espinafre e tomate ',
                  quantidade: '3 claras de ovo',
                  horario: '08:00',
                },
                {
                  alimento: '🥣 Aveia com frutas',
                  quantidade: '1/2 xícara de aveia',
                  horario: '08:00',
                },
                {
                  alimento: '🍊 Suco de laranja natural',
                  quantidade: '1 copo',
                  horario: '08:00',
                },
                {
                  alimento: '🍯 Iogurte grego com amêndoas e mel',
                  quantidade: '200g de iogurte grego',
                  horario: '08:00',
                },
              ].map((food, index) => (
                <Flex
                  key={index}
                  borderWidth={'1'}
                  p={4}
                  borderRadius={'sm'}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <Heading
                    size="md"
                    fontWeight="600"
                    color="black"
                    textAlign={'center'}
                    fontFamily={'Quicksand_700Bold'}>
                    {food.alimento}
                  </Heading>
                  <Text
                    fontWeight="600"
                    color="black"
                    textAlign={'center'}
                    fontFamily={'Quicksand_400Regular'}>
                    Horário: {food.horario}
                  </Text>
                  <Text
                    fontWeight="600"
                    color="black"
                    textAlign={'center'}
                    fontFamily={'Quicksand_400Regular'}>
                    Quantidade: {food.quantidade}
                  </Text>
                  <TouchableOpacity style={{ marginTop: 8 }}>
                    <Box bgColor={'white'} borderRadius={'full'}>
                      <MaterialCommunityIcons name="restart" size={24} color="black" />
                    </Box>
                  </TouchableOpacity>
                </Flex>
              ))}
            </Flex>
          </Flex>
          <Flex
            justifyContent="center"
            alignItems="center"
            bgColor={'white'}
            opacity={0.8}
            borderRadius={'lg'}
            mt={10}
            p={10}>
            <MaterialCommunityIcons name="weather-sunset" size={52} color="orange" />{' '}
            <Heading
              size="xl"
              fontWeight="600"
              color="black"
              textAlign={'center'}
              mb={4}
              fontFamily={'Quicksand_700Bold'}>
              Almoço
            </Heading>
            <Flex gap={4}>
              {[
                {
                  alimento: '🍳 Omelete de claras com espinafre e tomate ',
                  quantidade: '3 claras de ovo',
                  horario: '08:00',
                },
                {
                  alimento: '🥣 Aveia com frutas',
                  quantidade: '1/2 xícara de aveia',
                  horario: '08:00',
                },
                {
                  alimento: '🍊 Suco de laranja natural',
                  quantidade: '1 copo',
                  horario: '08:00',
                },
                {
                  alimento: '🍯 Iogurte grego com amêndoas e mel',
                  quantidade: '200g de iogurte grego',
                  horario: '08:00',
                },
              ].map((food, index) => (
                <Flex
                  key={index}
                  borderWidth={'1'}
                  p={4}
                  borderRadius={'sm'}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <Heading
                    size="md"
                    fontWeight="600"
                    color="black"
                    textAlign={'center'}
                    fontFamily={'Quicksand_700Bold'}>
                    {food.alimento}
                  </Heading>
                  <Text
                    fontWeight="600"
                    color="black"
                    textAlign={'center'}
                    fontFamily={'Quicksand_400Regular'}>
                    Horário: {food.horario}
                  </Text>
                  <Text
                    fontWeight="600"
                    color="black"
                    textAlign={'center'}
                    fontFamily={'Quicksand_400Regular'}>
                    Quantidade: {food.quantidade}
                  </Text>
                  <TouchableOpacity style={{ marginTop: 8 }}>
                    <Box bgColor={'white'} borderRadius={'full'}>
                      <MaterialCommunityIcons name="restart" size={24} color="black" />
                    </Box>
                  </TouchableOpacity>
                </Flex>
              ))}
            </Flex>
          </Flex>
          <Flex
            justifyContent="center"
            alignItems="center"
            bgColor={'white'}
            opacity={0.8}
            borderRadius={'lg'}
            mt={10}
            p={10}>
            <MaterialCommunityIcons name="moon-waning-crescent" size={52} color="darkblue" />{' '}
            <Heading
              size="xl"
              fontWeight="600"
              color="black"
              textAlign={'center'}
              mb={4}
              fontFamily={'Quicksand_700Bold'}>
              Janta
            </Heading>
            <Flex gap={4}>
              {[
                {
                  alimento: '🍳 Omelete de claras com espinafre e tomate ',
                  quantidade: '3 claras de ovo',
                  horario: '08:00',
                },
                {
                  alimento: '🥣 Aveia com frutas',
                  quantidade: '1/2 xícara de aveia',
                  horario: '08:00',
                },
                {
                  alimento: '🍊 Suco de laranja natural',
                  quantidade: '1 copo',
                  horario: '08:00',
                },
                {
                  alimento: '🍯 Iogurte grego com amêndoas e mel',
                  quantidade: '200g de iogurte grego',
                  horario: '08:00',
                },
              ].map((food, index) => (
                <Flex
                  key={index}
                  borderWidth={'1'}
                  p={4}
                  borderRadius={'sm'}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <Heading
                    size="md"
                    fontWeight="600"
                    color="black"
                    textAlign={'center'}
                    fontFamily={'Quicksand_700Bold'}>
                    {food.alimento}
                  </Heading>
                  <Text
                    fontWeight="600"
                    color="black"
                    textAlign={'center'}
                    fontFamily={'Quicksand_400Regular'}>
                    Horário: {food.horario}
                  </Text>
                  <Text
                    fontWeight="600"
                    color="black"
                    textAlign={'center'}
                    fontFamily={'Quicksand_400Regular'}>
                    Quantidade: {food.quantidade}
                  </Text>
                  <TouchableOpacity style={{ marginTop: 8 }}>
                    <Box bgColor={'white'} borderRadius={'full'}>
                      <MaterialCommunityIcons name="restart" size={24} color="black" />
                    </Box>
                  </TouchableOpacity>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </LinearGradient>
      </ScrollView>
    );
  }

  return (
    <LayoutWeb>
      <ScrollView style={{ flex: 1 }}>
        <LinearGradient colors={['#FFE749', '#FC9305', '#002C91']} style={{ padding: 10 }}>
          <Flex
            justifyContent="center"
            alignItems="center"
            bgColor={'white'}
            opacity={0.8}
            p={10}
            borderRadius={'lg'}>
            <Ionicons name="sunny" size={52} color="yellow" />
            <Heading
              size="xl"
              fontWeight="600"
              color="black"
              textAlign={'center'}
              mb={4}
              fontFamily={'Quicksand_700Bold'}>
              Café da Manhã
            </Heading>
            <Flex gap={4}>
              {[
                {
                  alimento: '🍳 Omelete de claras com espinafre e tomate ',
                  quantidade: '3 claras de ovo',
                  horario: '08:00',
                },
                {
                  alimento: '🥣 Aveia com frutas',
                  quantidade: '1/2 xícara de aveia',
                  horario: '08:00',
                },
                {
                  alimento: '🍊 Suco de laranja natural',
                  quantidade: '1 copo',
                  horario: '08:00',
                },
                {
                  alimento: '🍯 Iogurte grego com amêndoas e mel',
                  quantidade: '200g de iogurte grego',
                  horario: '08:00',
                },
              ].map((food, index) => (
                <Flex
                  key={index}
                  borderWidth={'1'}
                  p={4}
                  borderRadius={'sm'}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <Heading
                    size="md"
                    fontWeight="600"
                    color="black"
                    textAlign={'center'}
                    fontFamily={'Quicksand_700Bold'}>
                    {food.alimento}
                  </Heading>
                  <Text
                    fontWeight="600"
                    color="black"
                    textAlign={'center'}
                    fontFamily={'Quicksand_400Regular'}>
                    Horário: {food.horario}
                  </Text>
                  <Text
                    fontWeight="600"
                    color="black"
                    textAlign={'center'}
                    fontFamily={'Quicksand_400Regular'}>
                    Quantidade: {food.quantidade}
                  </Text>
                  <TouchableOpacity style={{ marginTop: 8 }}>
                    <Box bgColor={'white'} borderRadius={'full'}>
                      <MaterialCommunityIcons name="restart" size={24} color="black" />
                    </Box>
                  </TouchableOpacity>
                </Flex>
              ))}
            </Flex>
          </Flex>
          <Flex
            justifyContent="center"
            alignItems="center"
            bgColor={'white'}
            opacity={0.8}
            borderRadius={'lg'}
            mt={10}
            p={10}>
            <MaterialCommunityIcons name="weather-sunset" size={52} color="orange" />{' '}
            <Heading
              size="xl"
              fontWeight="600"
              color="black"
              textAlign={'center'}
              mb={4}
              fontFamily={'Quicksand_700Bold'}>
              Almoço
            </Heading>
            <Flex gap={4}>
              {[
                {
                  alimento: '🍳 Omelete de claras com espinafre e tomate ',
                  quantidade: '3 claras de ovo',
                  horario: '08:00',
                },
                {
                  alimento: '🥣 Aveia com frutas',
                  quantidade: '1/2 xícara de aveia',
                  horario: '08:00',
                },
                {
                  alimento: '🍊 Suco de laranja natural',
                  quantidade: '1 copo',
                  horario: '08:00',
                },
                {
                  alimento: '🍯 Iogurte grego com amêndoas e mel',
                  quantidade: '200g de iogurte grego',
                  horario: '08:00',
                },
              ].map((food, index) => (
                <Flex
                  key={index}
                  borderWidth={'1'}
                  p={4}
                  borderRadius={'sm'}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <Heading
                    size="md"
                    fontWeight="600"
                    color="black"
                    textAlign={'center'}
                    fontFamily={'Quicksand_700Bold'}>
                    {food.alimento}
                  </Heading>
                  <Text
                    fontWeight="600"
                    color="black"
                    textAlign={'center'}
                    fontFamily={'Quicksand_400Regular'}>
                    Horário: {food.horario}
                  </Text>
                  <Text
                    fontWeight="600"
                    color="black"
                    textAlign={'center'}
                    fontFamily={'Quicksand_400Regular'}>
                    Quantidade: {food.quantidade}
                  </Text>
                  <TouchableOpacity style={{ marginTop: 8 }}>
                    <Box bgColor={'white'} borderRadius={'full'}>
                      <MaterialCommunityIcons name="restart" size={24} color="black" />
                    </Box>
                  </TouchableOpacity>
                </Flex>
              ))}
            </Flex>
          </Flex>
          <Flex
            justifyContent="center"
            alignItems="center"
            bgColor={'white'}
            opacity={0.8}
            borderRadius={'lg'}
            mt={10}
            p={10}>
            <MaterialCommunityIcons name="moon-waning-crescent" size={52} color="darkblue" />{' '}
            <Heading
              size="xl"
              fontWeight="600"
              color="black"
              textAlign={'center'}
              mb={4}
              fontFamily={'Quicksand_700Bold'}>
              Janta
            </Heading>
            <Flex gap={4}>
              {[
                {
                  alimento: '🍳 Omelete de claras com espinafre e tomate ',
                  quantidade: '3 claras de ovo',
                  horario: '08:00',
                },
                {
                  alimento: '🥣 Aveia com frutas',
                  quantidade: '1/2 xícara de aveia',
                  horario: '08:00',
                },
                {
                  alimento: '🍊 Suco de laranja natural',
                  quantidade: '1 copo',
                  horario: '08:00',
                },
                {
                  alimento: '🍯 Iogurte grego com amêndoas e mel',
                  quantidade: '200g de iogurte grego',
                  horario: '08:00',
                },
              ].map((food, index) => (
                <Flex
                  key={index}
                  borderWidth={'1'}
                  p={4}
                  borderRadius={'sm'}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <Heading
                    size="md"
                    fontWeight="600"
                    color="black"
                    textAlign={'center'}
                    fontFamily={'Quicksand_700Bold'}>
                    {food.alimento}
                  </Heading>
                  <Text
                    fontWeight="600"
                    color="black"
                    textAlign={'center'}
                    fontFamily={'Quicksand_400Regular'}>
                    Horário: {food.horario}
                  </Text>
                  <Text
                    fontWeight="600"
                    color="black"
                    textAlign={'center'}
                    fontFamily={'Quicksand_400Regular'}>
                    Quantidade: {food.quantidade}
                  </Text>
                  <TouchableOpacity style={{ marginTop: 8 }}>
                    <Box bgColor={'white'} borderRadius={'full'}>
                      <MaterialCommunityIcons name="restart" size={24} color="black" />
                    </Box>
                  </TouchableOpacity>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </LinearGradient>
      </ScrollView>
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
