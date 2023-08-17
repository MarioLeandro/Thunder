import { useMediaQuery } from 'react-responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Heading,
  Input,
  ScrollView,
  Spinner,
  Switch,
  Text,
  VStack,
  useToast,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import LayoutWeb from '../../components/LayoutWeb';
import CustomToast from '../../components/CustomToast';
import api from '../../services/api';

export default function FoodScreen() {
  const toast = useToast();

  const [fooding, setFooding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dietData, setDietData] = useState(null);
  const { height, width } = useWindowDimensions();

  const [isUserVegan, setIsUserVegan] = useState(false);
  const [userWeigth, setUserWeigth] = useState('');
  const [userHeight, setUserHeight] = useState('');

  const isTabletOrMobileDevice = useMediaQuery({
    maxDeviceWidth: 1224,
  });

  useEffect(() => {
    const getDietStorage = async () => {
      const data = await AsyncStorage.getItem('@Thunder:diet');

      if (data) {
        setDietData(JSON.parse(data).diet);
        setFooding(true);
      }
    };
    getDietStorage();
  }, []);

  const handleGetDiet = async () => {
    if (!userWeigth || !userHeight) {
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
      const { data } = await api.post('/diet', {
        isVegan: isUserVegan,
        height: userHeight,
        weight: userWeigth,
      });

      setDietData(data);
      await AsyncStorage.setItem(
        '@Thunder:diet',
        JSON.stringify({ diet: data, isVegan: isUserVegan })
      );
      setFooding(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetChangeDiet = async (group, food) => {
    setLoading(true);
    try {
      const dietRes = await AsyncStorage.getItem('@Thunder:diet');

      const { data } = await api.post('/diet/change', {
        currentDiet: JSON.parse(dietRes).diet,
        isVegan: JSON.parse(dietRes).isVegan,
        group,
        food,
      });

      setDietData(data);
      await AsyncStorage.setItem(
        '@Thunder:diet',
        JSON.stringify({ diet: data, isVegan: JSON.parse(dietRes).isVegan })
      );
      setFooding(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const clear = async () => {
    await AsyncStorage.removeItem('@Thunder:diet');
    setDietData(null);
    setFooding(false);
    setIsUserVegan(false);
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
              <VStack space={3} mt="5">
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
                  <FormControl.Label _text={{ color: 'black' }}>Usuário Vegano ?</FormControl.Label>
                  <Switch colorScheme="primary" value={isUserVegan} />
                </FormControl>

                <Button mt="2" colorScheme={'coolGray'} onPress={() => handleGetDiet()}>
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
                <VStack space={3} mt="5">
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
                      Usuário Vegano ?
                    </FormControl.Label>
                    <Switch colorScheme="primary" value={isUserVegan} />
                  </FormControl>

                  <Button mt="2" colorScheme={'coolGray'} onPress={() => handleGetDiet()}>
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
        <Flex style={{ padding: 10 }}>
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
              {dietData?.cafe_da_manha?.map((food, index) => (
                <Flex
                  key={index}
                  borderWidth={'1'}
                  minW={'90%'}
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
                  <TouchableOpacity
                    style={{ marginTop: 8 }}
                    onPress={() => handleGetChangeDiet('cafe_da_manha', food.alimento)}>
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
              {dietData?.almoco?.map((food, index) => (
                <Flex
                  key={index}
                  borderWidth={'1'}
                  minW={'90%'}
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
              {dietData?.jantar?.map((food, index) => (
                <Flex
                  key={index}
                  borderWidth={'1'}
                  minW={'90%'}
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
        </Flex>
        <Button onPress={clear}>Alterar</Button>
      </ScrollView>
    );
  }

  return (
    <LayoutWeb>
      <ScrollView style={{ flex: 1 }}>
        <Flex style={{ padding: 10 }}>
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
              {dietData?.cafe_da_manha?.map((food, index) => (
                <Flex
                  key={index}
                  borderWidth={'1'}
                  minW={'90%'}
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
                  <TouchableOpacity
                    style={{ marginTop: 8 }}
                    onPress={() => handleGetChangeDiet('cafe_da_manha', food.alimento)}>
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
              {dietData?.almoco?.map((food, index) => (
                <Flex
                  key={index}
                  borderWidth={'1'}
                  minW={'90%'}
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
              {dietData?.jantar?.map((food, index) => (
                <Flex
                  key={index}
                  borderWidth={'1'}
                  minW={'90%'}
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
        </Flex>
        <Button onPress={clear}>Alterar</Button>
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
