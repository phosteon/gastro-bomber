
import AudioCall from '../components/AudioCall';
import ProfileButton from '../components/ProfileButton';
import BenefitsBox from '../components/BenefitsBox';
import FutureFeatures from '../components/FutureFeatures';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-elegant-background to-dark-elegant-surface pb-12">
      <ProfileButton />
      <AudioCall />
      <BenefitsBox />
      <FutureFeatures />
    </div>
  );
};

export default Index;
