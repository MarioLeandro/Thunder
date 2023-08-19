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
import React, { useContext } from 'react';
import { Image, Platform, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useToast } from 'native-base';
import api from '../../services/api';
import AuthContext from '../../contexts/auth';

const LoginScreen = ({ navigation }) => {
  const { height, width } = useWindowDimensions();
  const { login } = useContext(AuthContext);

  const [showPass, setShowPass] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function handleSignIn() {
    try {
      await login(email, password);
      console.log('logado');
    } catch (error) {
      console.log(error);
    }
  }

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
              Bem vindo
            </Heading>
            <Heading
              mt="1"
              color="coolGray.100"
              fontWeight="medium"
              size="xs"
              textAlign={'center'}
              fontFamily={'Quicksand_400Regular'}>
              Faça login para continuar!
            </Heading>

            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label _text={{ color: 'coolGray.100' }}>E-mail</FormControl.Label>
                <Input
                  size={'lg'}
                  bgColor={'coolGray.100'}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  InputLeftElement={
                    <Icon as={<Ionicons name="person" />} size={5} ml="2" color="black" />
                  }
                />
              </FormControl>
              <FormControl>
                <FormControl.Label _text={{ color: 'coolGray.100' }}>Senha</FormControl.Label>
                <Input
                  type={showPass ? 'text' : 'password'}
                  size={'lg'}
                  bgColor={'coolGray.100'}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
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
                colorScheme={'white'}
                onPress={() => handleSignIn()}>
                Entrar
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text fontSize="sm" color="coolGray.100">
                  Sou novo aqui.{' '}
                </Text>
                <Link
                  onPress={() => navigation.navigate('Register')}
                  style={{ cursor: 'pointer' }}
                  _text={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 'sm',
                  }}>
                  Registrar-se
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

export default LoginScreen;
