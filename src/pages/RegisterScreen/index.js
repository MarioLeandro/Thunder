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
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import { Image, Platform, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const RegisterScreen = (props) => {
  const { height, width } = useWindowDimensions();
  const [showPass, setShowPass] = React.useState(false);

  return (
    <LinearGradient colors={['rgba(170,88,244,1)', 'rgba(94,23,235,1)']} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Center flex={0.3} width={width}>
          <Image
            source={require('../../../assets/logo.png')}
            style={{
              width: 150,
              height: 100,
              resizeMode: 'contain',
            }}
          />
        </Center>
        <Center /* bg="white" */ width={width} flex={1}>
          <Box w="90%" maxW="290" maxH={'90%'}>
            <Heading
              size="lg"
              fontWeight="600"
              color="coolGray.100"
              textAlign={'center'}
              fontFamily={'Quicksand_700Bold'}>
              Criar conta
            </Heading>
            <Heading
              mt="1"
              color="coolGray.100"
              fontWeight="medium"
              size="xs"
              textAlign={'center'}
              fontFamily={'Quicksand_400Regular'}>
              Registre-se para continuar!
            </Heading>

            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label _text={{ color: 'coolGray.100' }}>Usuário</FormControl.Label>
                <Input
                  size={'lg'}
                  bgColor={'coolGray.100'}
                  InputLeftElement={
                    <Icon as={<Ionicons name="person" />} size={5} ml="2" color="black" />
                  }
                />
              </FormControl>
              <FormControl>
                <FormControl.Label _text={{ color: 'coolGray.100' }}>E-mail</FormControl.Label>
                <Input
                  size={'lg'}
                  bgColor={'coolGray.100'}
                  InputLeftElement={
                    <Icon as={<Ionicons name="mail" />} size={5} ml="2" color="black" />
                  }
                />
              </FormControl>
              <FormControl>
                <FormControl.Label _text={{ color: 'coolGray.100' }}>Senha</FormControl.Label>
                <Input
                  type={showPass ? 'text' : 'password'}
                  size={'lg'}
                  bgColor={'coolGray.100'}
                  InputRightElement={
                    <Pressable onPress={() => setShowPass(!showPass)}>
                      <Icon
                        as={<Ionicons name={showPass ? 'eye' : 'eye-off'} />}
                        size={5}
                        mr="2"
                        color="black"
                      />
                    </Pressable>
                  }
                />
                {/* <Link
                  _text={{
                    fontSize: 'xs',
                    fontWeight: '500',
                    color: 'indigo.500',
                  }}
                  alignSelf="flex-end"
                  mt="1">
                  Esqueceu a Senha?
                </Link> */}
              </FormControl>
              <FormControl>
                <FormControl.Label _text={{ color: 'coolGray.100' }}>
                  Confirmar Senha
                </FormControl.Label>
                <Input
                  type={showPass ? 'text' : 'password'}
                  size={'lg'}
                  bgColor={'coolGray.100'}
                  InputRightElement={
                    <Pressable onPress={() => setShowPass(!showPass)}>
                      <Icon
                        as={<Ionicons name={showPass ? 'eye' : 'eye-off'} />}
                        size={5}
                        mr="2"
                        color="black"
                      />
                    </Pressable>
                  }
                />
              </FormControl>
              <Button
                mt="2"
                variant={'outline'}
                borderColor={'violet.800'}
                borderWidth={'2'}
                _text={{ color: 'coolGray.100' }}
                colorScheme={'white'}>
                Registrar-se
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text fontSize="sm" color="coolGray.100">
                  Já possuo conta.{' '}
                </Text>
                <Link
                  _text={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 'sm',
                  }}
                  href="#">
                  Entrar
                </Link>
              </HStack>
            </VStack>
          </Box>
        </Center>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default RegisterScreen;
