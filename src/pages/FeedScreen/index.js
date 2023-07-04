import { useMediaQuery } from 'react-responsive';
import TutorialMobile from './TutorialMobile';
import FeedWeb from './FeedWeb';
import LayoutWeb from '../../components/LayoutWeb';

export default function FeedScreen() {
  const isTabletOrMobileDevice = useMediaQuery({
    maxDeviceWidth: 1224,
  });

  if (isTabletOrMobileDevice) {
    return <FeedWeb />;
  }

  return (
    <LayoutWeb>
      <FeedWeb />
    </LayoutWeb>
  );
}
