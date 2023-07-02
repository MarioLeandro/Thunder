import { useMediaQuery } from 'react-responsive';
import TutorialMobile from './TutorialMobile';
import FeedWeb from './FeedWeb';

export default function FeedScreen() {
  const isTabletOrMobileDevice = useMediaQuery({
    maxDeviceWidth: 1224,
  });

  if (isTabletOrMobileDevice) {
    return <TutorialMobile />;
  }

  return <FeedWeb />;
}
