import { Avatar, Box, Flex, Progress } from 'native-base';
import React, { useContext } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import AuthContext from '../contexts/auth';

const Header = ({ navigation, route, options }) => {
  const { user } = useContext(AuthContext);
  const experienceToNextLevel = Math.pow((user.level + 1) * 4, 2);

  return (
    <Flex
      w="full"
      h={100}
      bg="#AA58F4"
      direction="row"
      alignItems={'center'}
      justifyContent={'space-between'}
      px="4">
      <TouchableOpacity onPress={navigation.openDrawer}>
        <Avatar
          bg="lightBlue.400"
          size="lg"
          source={{
            uri: `http://192.168.1.106:3001/${user.picture}`,
          }}>
          {user.name.charAt(0)}
        </Avatar>
      </TouchableOpacity>

      <Box w="50%" maxW="400">
        <Progress
          value={(user.currentExperience / experienceToNextLevel) * 100 || 0}
          colorScheme="light"
        />
      </Box>
      <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'Quicksand_700Bold' }}>
        Nível {user.level || 0}
      </Text>
    </Flex>
  );
};

export default Header;
