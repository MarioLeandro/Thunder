import { Box, Flex, Progress } from 'native-base';
import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';

const Header = ({ navigation, route, options }) => {
  return (
    <Flex
      w="full"
      h={100}
      bg="#AA58F4"
      direction="row"
      alignItems={'center'}
      justifyContent={'space-between'}
      px="4">
      {navigation ? (
        <TouchableOpacity onPress={navigation.openDrawer}>
          <Image
            source={'https://avatars.githubusercontent.com/u/63363561?v=4'}
            style={{ height: 50, width: 50, borderRadius: 40, marginBottom: 10 }}
          />
        </TouchableOpacity>
      ) : (
        <Image
          source={'https://avatars.githubusercontent.com/u/63363561?v=4'}
          style={{ height: 50, width: 50, borderRadius: 40, marginBottom: 10 }}
        />
      )}
      <Box w="50%" maxW="400">
        <Progress value={45} colorScheme="light" />
      </Box>
      <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'Quicksand_700Bold' }}>
        Nível 200
      </Text>
    </Flex>
  );
};

export default Header;
