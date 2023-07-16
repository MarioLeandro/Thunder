import { useContext } from 'react';
import AuthContext from '../contexts/auth';
import { Flex, Modal, View } from 'native-base';
import { useMediaQuery } from 'react-responsive';
import { Image, ImageBackground, Text } from 'react-native';

const imgBackground = require('../../assets/tutorial-screen/levelup.png');

export function LevelUpModal({ isLevelUpModalOpen, setIsLevelUpModalOpen }) {
  const { user } = useContext(AuthContext);
  const isTabletOrMobileDevice = useMediaQuery({
    maxDeviceWidth: 1224,
  });

  return (
    <Modal isOpen={isLevelUpModalOpen} onClose={() => setIsLevelUpModalOpen(false)}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Body>
          <Flex height={'full'} paddingX={10}>
            <ImageBackground
              source={imgBackground}
              resizeMode="contain"
              style={{
                borderRadius: 40,
                marginBottom: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 140,
                  fontWeight: 600,
                  fontFamily: 'Quicksand_700Bold',
                }}>
                {user.level}
              </Text>
            </ImageBackground>
            <Text style={{ fontFamily: 'Quicksand_700Bold', fontSize: 36, textAlign: 'center' }}>
              Parabéns
            </Text>
            <Text
              style={{
                fontFamily: 'Quicksand_400Regular',
                fontSize: 20,
                marginTop: 4,
                textAlign: 'center',
              }}>
              Você alcançou um novo nível
            </Text>
          </Flex>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
