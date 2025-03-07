
import AudioCall from '../components/AudioCall';
import ProfileButton from '../components/ProfileButton';

const Index = () => {
  return (
    <>
      <ProfileButton />
      <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto mb-8 mt-12">
        <div className="w-full backdrop-blur-md bg-dark-elegant-surface/70 border border-dark-elegant-accent/30 rounded-3xl p-6 shadow-lg animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-dark-elegant-text text-center mb-3">
            Persönliches Erstgespräch
          </h1>
          <h2 className="text-lg md:text-xl text-dark-elegant-muted text-center">
            mit Jan Herwig Haubrich, Männercoach & Abnehmexperte
          </h2>
          <p className="text-dark-elegant-text/80 text-center mt-4 max-w-xl mx-auto">
            Starten Sie jetzt ein persönliches Gespräch mit Jan und erfahren Sie, wie er Ihnen bei Ihren Zielen helfen kann.
          </p>
        </div>
      </div>
      <AudioCall />
    </>
  );
};

export default Index;
