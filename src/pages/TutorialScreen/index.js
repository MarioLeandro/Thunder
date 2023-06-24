import { useMediaQuery } from 'react-responsive';
import TutorialMobile from './TutorialMobile';
import TutorialWeb from './TutorialWeb';

export default function TutorialScreen() {
  const isTabletOrMobileDevice = useMediaQuery({
    maxDeviceWidth: 1224,
  });

  if (isTabletOrMobileDevice) {
    return <TutorialMobile />;
  }

  return <TutorialWeb />;
}
