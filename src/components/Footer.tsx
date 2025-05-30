const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full py-1 bg-black/10 backdrop-blur-sm">
      <div className="flex justify-center">
        <div className="flex items-center space-x-2 text-[10px] text-gray-400/60 hover:text-gray-300/80 transition-colors">
          <a 
            href="https://gastro-voice.de/impressum" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline transition-colors duration-200 hover:text-gray-200/70"
          >
            Impressum
          </a>
          <span className="text-gray-500/40">•</span>
          <a 
            href="https://gastro-voice.de/datenschutz" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline transition-colors duration-200 hover:text-gray-200/70"
          >
            Datenschutz
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 