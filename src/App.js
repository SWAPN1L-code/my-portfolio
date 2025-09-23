import React, { useState, useEffect } from 'react';
import { X, Info, Link, Briefcase, HelpCircle, Mail, Twitter, Instagram, Github, Linkedin, Moon, Sun, Image } from 'lucide-react';

const Y2KDesktopPortfolio = () => {
  const [windows, setWindows] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [zIndexCounter, setZIndexCounter] = useState(1000);
  
  // Sound effects
  const playClickSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
      console.log('Audio not available');
    }
  };

  const playHoverSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.05);
    } catch (e) {
      console.log('Audio not available');
    }
  };

  const createWindow = (type, title, content) => {
    const newWindow = {
      id: Date.now(),
      type,
      title,
      content,
      x: Math.random() * 300 + 200,
      y: Math.random() * 200 + 150,
      width: 650,
      height: 600,
      zIndex: zIndexCounter
    };
    setWindows(prev => [...prev, newWindow]);
    setZIndexCounter(prev => prev + 1);
  };

  const closeWindow = (id) => {
    playClickSound();
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  const bringToFront = (id) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: zIndexCounter } : w
    ));
    setZIndexCounter(prev => prev + 1);
  };

  const openAbout = () => {
    playClickSound();
    createWindow('about', 'about', <AboutContent />);
  };

  const openWork = () => {
    playClickSound();
    createWindow('work', 'work', <WorkContent />);
  };

  const openLinks = () => {
    playClickSound();
    createWindow('links', 'links', <LinksContent isDarkMode={isDarkMode} />);
  };

  const openContact = () => {
    playClickSound();
    createWindow('contact', 'contact', <ContactContent />);
  };

  const openFaq = () => {
    playClickSound();
    createWindow('faq', 'faq', <FaqContent />);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600' 
        : 'bg-white'
    }`}
    style={{
      fontFamily: 'AFRAH, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      
      {/* Dark Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button 
          onClick={() => {
            playClickSound();
            setIsDarkMode(!isDarkMode);
          }}
          className={`w-10 h-10 rounded-full ${
            isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-white hover:bg-gray-100'
          } border ${
            isDarkMode ? 'border-slate-500' : 'border-gray-300'
          } flex items-center justify-center shadow-lg transition-all`}
        >
          {isDarkMode ? <Moon size={20} className="text-slate-300" /> : <Sun size={20} />}
        </button>
      </div>

      {/* Main Home Window - Always Visible */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className={`${
          isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-gray-300'
        } rounded-lg shadow-2xl border overflow-hidden w-[650px] max-w-[90vw] max-h-[90vh]`}>
          
          {/* Window Header */}
          <div className={`h-8 ${
            isDarkMode ? 'bg-slate-700' : 'bg-gray-600'
          } flex items-center justify-between px-3`}>
            <span className="text-white text-sm">home</span>
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-red-400 rounded-full opacity-50"></div>
            </div>
          </div>

          {/* Window Content */}
          <div className={`p-6 ${isDarkMode ? 'text-slate-200' : 'text-gray-800'}`}>
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-light tracking-wide">
                  hi! <span className="text-orange-500 font-medium">i'm swapnil</span>
                </h1>
                <p className={`text-sm font-light ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                 web developer & music nerd
                </p>
              </div>
              
              <div className="grid grid-cols-5 gap- 0 mt-6 justify-items-center px-2">
                <NavigationBox 
                  icon={<Info size={20} />}
                  label="about"
                  onClick={openAbout}
                  onHover={playHoverSound}
                  isDarkMode={isDarkMode}
                />
                <NavigationBox 
                  icon={<Link size={20} />}
                  label="links"
                  onClick={openLinks}
                  onHover={playHoverSound}
                  isDarkMode={isDarkMode}
                />
                <NavigationBox 
                  icon={<Briefcase size={20} />}
                  label="work"
                  onClick={openWork}
                  onHover={playHoverSound}
                  isDarkMode={isDarkMode}
                />
                <NavigationBox 
                  icon={<HelpCircle size={20} />}
                  label="faq"
                  onClick={openFaq}
                  onHover={playHoverSound}
                  isDarkMode={isDarkMode}
                />
                <NavigationBox 
                  icon={<Mail size={20} />}
                  label="contact"
                  onClick={openContact}
                  onHover={playHoverSound}
                  isDarkMode={isDarkMode}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Windows */}
      {windows.map(window => (
        <DraggableWindow
          key={window.id}
          window={window}
          onClose={() => closeWindow(window.id)}
          onFocus={() => bringToFront(window.id)}
          isDarkMode={isDarkMode}
        />
      ))}

      {/* Social Links at Bottom */}
      <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-3">
        <SocialIcon 
          icon={<Instagram size={16} />} 
          bgColor={isDarkMode ? "bg-slate-600" : "bg-gray-500"} 
          onClick={playClickSound}
          onHover={playHoverSound}
          href="https://www.instagram.com"
        />
        <SocialIcon 
          icon={<Twitter size={16} />} 
          bgColor={isDarkMode ? "bg-slate-600" : "bg-gray-500"} 
          onClick={playClickSound}
          onHover={playHoverSound}
          href="https://x.com/home"
        />
        <SocialIcon 
          icon={<Linkedin size={16} />} 
          bgColor={isDarkMode ? "bg-slate-600" : "bg-gray-500"} 
          onClick={playClickSound}
          onHover={playHoverSound}
          href="https://www.linkedin.com/in/swapnil-negi-46048725a/"
        />
        <SocialIcon 
          icon={<Github size={16} />} 
          bgColor={isDarkMode ? "bg-slate-600" : "bg-gray-500"} 
          onClick={playClickSound}
          onHover={playHoverSound}
          href="https://github.com/SWAPN1L-code"
        />
      </div>

      {/* Footer */}
      <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 text-xs ${
        isDarkMode ? 'text-slate-400' : 'text-gray-600'
      } font-light`}>
        © 2025 Swapnil
      </div>

      {/* Wave Component */}
      <WaveBackground isDarkMode={isDarkMode} />
    </div>
  );
};

const NavigationBox = ({ icon, label, onClick, onHover, isDarkMode }) => (
  <button
    onClick={onClick}
    onMouseEnter={onHover}
    className={`flex flex-col items-center space-y-1 p-4 rounded-lg transition-all hover:scale-105 ${
      isDarkMode 
        ? 'hover:bg-slate-700/50 border border-slate-600/30' 
        : 'hover:bg-gray-100 border border-gray-200'
    }`}
  >
    <div className={`${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
      {icon}
    </div>
    <span className="text-xs font-light">{label}</span>
  </button>
);

const SocialIcon = ({ icon, bgColor, onClick, onHover, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    onClick={onClick}
    onMouseEnter={onHover}
    className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg`}
  >
    <div className="text-white">{icon}</div>
  </a>
);

const DraggableWindow = ({ window, onClose, onFocus, isDarkMode }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: window.x, y: window.y });

  const handleMouseDown = (e) => {
    if (e.target.classList.contains('window-header') || e.target.closest('.window-header')) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
      onFocus();
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      setPosition({
        x: newX,
        y: Math.max(0, newY)
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div
      className={`fixed ${
        isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-gray-300'
      } rounded-lg shadow-2xl border overflow-hidden select-none`}
      style={{
        left: position.x,
        top: position.y,
        width: window.width,
        height: window.height,
        zIndex: window.zIndex
      }}
      onClick={onFocus}
    >
      <div
        className={`window-header h-8 ${
          isDarkMode ? 'bg-slate-700' : 'bg-gray-600'
        } flex items-center justify-between px-3 cursor-move`}
        onMouseDown={handleMouseDown}
      >
        <span className="text-white text-sm font-light">{window.title}</span>
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <button
            onClick={onClose}
            className="w-3 h-3 bg-red-400 rounded-full hover:bg-red-500 flex items-center justify-center"
          >
            <X size={6} className="text-red-800" />
          </button>
        </div>
      </div>

      <div className={`p-6 h-full overflow-auto ${
        isDarkMode ? 'text-slate-200' : 'text-gray-800'
      }`}>
        {window.content}
      </div>
    </div>
  );
};

const WaveBackground = ({ isDarkMode }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 pointer-events-none">
      <svg
        className="w-full h-32"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
          fill={isDarkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(135, 206, 235, 0.3)'}
          className="animate-pulse"
        />
        <path
          d="M0,80 C300,40 900,100 1200,80 L1200,120 L0,120 Z"
          fill={isDarkMode ? 'rgba(100, 116, 139, 0.1)' : 'rgba(135, 206, 235, 0.2)'}
          className="animate-pulse"
          style={{ animationDelay: '0.5s' }}
        />
      </svg>
    </div>
  );
};

const ImageItem = ({ src, alt, description }) => (
  <div className="group relative">
    <div className="bg-gradient-to-br from-pink-400 to-purple-500 w-20 h-20 rounded-lg mx-auto mb-2 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg group-hover:shadow-xl">
      <Image size={24} className="text-white" />
    </div>
    <p className="text-xs text-center font-light opacity-60 group-hover:opacity-100 transition-opacity">
      {description}
    </p>
    <div className="absolute -inset-2 bg-gradient-to-r from-pink-400/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity blur-sm -z-10"></div>
  </div>
);

const AboutContent = () => (
  <div className="space-y-6">
    <div className="flex items-start space-x-4">
     <img
  src={`${process.env.PUBLIC_URL}/swapnil.jpg`}
  alt="Swapnil"
  className="w-16 h-16  rounded-full"
/>

      <div>
        <h2 className="text-xl font-light text-orange-500 mb-1">Swapnil Negi</h2>
        <p className="text-gray-500 text-sm mb-1"> Web Developer</p>
        <p className="text-gray-500 text-sm">Music Enthousiast, Traveler</p>
      </div>
    </div>
    
    <div className="space-y-6 text-sm font-light">
      <div className="space-y-3">
        <p>Hi, I'm Swapnil — a passionate and creative web developer who loves turning ideas into sleek, user-friendly websites.</p>
        <div className="flex justify-center space-x-4">
         
        </div>
      </div>
      
      <div className="space-y-3">
        <p>With a strong foundation in HTML, CSS, JavaScript, and modern frameworks, I build responsive designs and interactive experiences.</p>
        <div className="flex justify-center space-x-4">
         
        </div>
      </div>
      
      <div className="space-y-3">
        <p>Whether it's a  startup landing page, or full-stack project, I approach each challenge with curiosity and a drive to learn.</p>
        <div className="flex justify-center space-x-4">
          
        </div>
      </div>
      
     
<div className="space-y-3">
  <p>
    If passion had a Premier League table, I’d be sitting top of the league with football—blue side of Manchester, obviously. I don’t just watch Man City, I overanalyze Pep’s tactics like it’s a PhD thesis.
  </p>
  <div className="flex justify-center space-x-4">
    <img
      src={`${process.env.PUBLIC_URL}/football1.png`}
      alt="football1"
      className="w-20 h-20"
    />
    <img
      src={`${process.env.PUBLIC_URL}/football2.png`}
      alt="football2"
      className="w-20 h-20"
    />
    <img
      src={`${process.env.PUBLIC_URL}/football3.png`}
      alt="football3"
      className="w-20 h-20"
    />
  </div>
</div>

<div className="space-y-3">
  <p>
    When life gets noisy, Kanye and Frank Ocean run my soundtrack. One gives me stadium-level confidence, the other makes me stare at the ceiling and question the universe—balance is key.
  </p>
  <div className="flex justify-center space-x-4">
    <img
      src={`${process.env.PUBLIC_URL}/kanye.png`}
      alt="kanye"
      className="w-20 h-20"
    />
    <img
      src={`${process.env.PUBLIC_URL}/frank.png`}
      alt="frank"
      className="w-20 h-20"
    />
  </div>
</div>

<div className="space-y-3">
  <p>
    And when I’m not yelling ‘GOAAALLL,’ I’m chasing actual goals—like climbing at least 10 mountains before 2030. Because if Haaland can score 50 in a season, the least I can do is summit a few peaks.
  </p>
  <div className="flex justify-center space-x-4">
    <img
      src={`${process.env.PUBLIC_URL}/mountain1.png`}
      alt="mountain1"
      className="w-20 h-20"
    />
    <img
      src={`${process.env.PUBLIC_URL}/mountain2.png`}
      alt="mountain2"
      className="w-20 h-20"
    />
    <img
      src={`${process.env.PUBLIC_URL}/mountain3.png`}
      alt="mountain3"
      className="w-20 h-20"
    />
    <img
      src={`${process.env.PUBLIC_URL}/mountain4.png`}
      alt="mountain4"
      className="w-20 h-16"
    />
  </div>
</div>


      
      <p className="text-orange-500 font-medium text-center">So yeah, football, music, and hiking—they're not hobbies, they're my holy trinity.</p>
    </div>
  </div>
);

const WorkContent = () => (
  <div className="space-y-4">
    <div >
      <p className="text-sm mb-1">Available for exciting projects!</p>
      <p className="text-xs text-gray-600">Web development and full-stack</p>
    </div>
    
    <div className="space-y-4">
      <div className="border-l-4 border-orange-500 pl-3">
        <h3 className="font-medium mb-2 text-sm text-orange-500">Featured Project</h3>
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-base mb-1">DailyGitHack</h4>
          <a
            href="https://github.com/SWAPN1L-code/dailygithack"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 bg-gray-800 text-white px-3 py-1 rounded-lg hover:bg-gray-700 transition-all text-xs"
          >
            <Github size={12} />
            <span>GitHub</span>
          </a>
        </div>
        <p className="text-xs font-light text-gray-600 mb-2">
          A SwiftUI app that helps you keep your GitHub streak alive by pushing daily commits with style 
        </p>
        <p className="text-xs font-light">
          Generate commit messages, track contribution stats, and push logs directly to your GitHub repo using the GitHub REST API.
        </p>
        <p> __________________</p>
         <div className="flex items-center justify-between">
          <h4 className="font-medium text-base mb-1">Dashboard website</h4>
          <a
            href="https://github.com/SWAPN1L-code/dashboard-app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 bg-gray-800 text-white px-3 py-1 rounded-lg hover:bg-gray-700 transition-all text-xs"
          >
            <Github size={12} />
            <span>GitHub</span>
          </a>
        </div>
        <p className="text-xs font-light text-gray-600 mb-2">
I built a customizable Dashboard using HTML, CSS, and JavaScript that brings together widgets like weather, calendar, clock, and task manager in one clean interface.
        </p>
        <p className="text-xs font-light">
         It's a simple yet interactive project that shows how front-end code can make everyday tools visually appealing and functional.
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium mb-2 text-sm">SKILLS</h3>
          <div className="space-y-1.5 text-xs font-light">
            <div>HTML/CSS</div>
            <div>JavaScript</div>
            <div>React</div>
            <div>SwiftUI</div>
            <div>Node.js</div>
            <div>Git/GitHub</div>
            <div>Tailwind</div>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2 text-sm">PLATFORMS</h3>
          <div className="space-y-1 text-xs font-light">
            <div>GitHub</div>
            <div>LeetCode</div>
            <div>LinkedIn</div>
            <div>Web Development</div>
            <div>Mobile Apps</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const LinksContent = ({ isDarkMode }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-3">
      <LinkCard 
        icon={<Instagram size={20} />} 
        label="instagram" 
        href="https://www.instagram.com"
        isDarkMode={isDarkMode}
      />
      <LinkCard 
        icon={<Twitter size={20} />} 
        label="x" 
        href="https://x.com/home"
        isDarkMode={isDarkMode}
      />
      <LinkCard 
        icon={<Linkedin size={20} />} 
        label="linkedin" 
        href="https://www.linkedin.com/in/swapnil-negi-46048725a/"
        isDarkMode={isDarkMode}
      />
      <LinkCard 
        icon={<Briefcase size={20} />} 
        label="leetcode" 
        href="https://leetcode.com/u/30NK3T28Ag/"
        isDarkMode={isDarkMode}
      />
    </div>
    
    <div className="border-t pt-3">
      <LinkCard 
        icon={<Github size={20} />} 
        label="github" 
        href="https://github.com/SWAPN1L-code"
        fullWidth={true}
        isDarkMode={isDarkMode}
      />
    </div>
  </div>
);

const LinkCard = ({ icon, label, href, fullWidth = false, isDarkMode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex flex-col items-center space-y-2 p-3 rounded-lg transition-all cursor-pointer ${
      fullWidth ? 'col-span-2' : ''
    } ${
      isDarkMode 
        ? 'hover:bg-slate-700/50 text-slate-300' 
        : 'hover:bg-gray-50 text-gray-700'
    }`}
  >
    <div className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>{icon}</div>
    <span className="text-sm font-light">{label}</span>
  </a>
);

const ContactContent = () => (
  <div className="space-y-4 text-center">
    <Mail size={48} className="mx-auto text-blue-400" />
    <div>
      <h3 className="text-lg font-light mb-2">Let's Connect!</h3>
      <p className="text-gray-500 text-sm mb-4 font-light">want to contact me?</p>
      
      <div className="space-y-3">
        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="text-sm font-medium text-gray-700">Email</p>
          <p className="text-sm text-orange-500">swapnilnegi06@gmail.com</p>
        </div>
        
        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="text-sm font-medium text-gray-700">Phone</p>
          <p className="text-sm text-orange-500">+91 9149177159</p>
        </div>
        
        <div className="flex gap-2 justify-center">
          <a
            href="mailto:swapnilnegi06@gmail.com"
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all text-sm font-light"
          >
            Send Email
          </a>
          <a
            href="tel:+919149177159"
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all text-sm font-light"
          >
            Call Now
          </a>
        </div>
      </div>
    </div>
  </div>
);

const FaqContent = () => (
  <div className="space-y-4">
    <div className="space-y-3 text-sm">
      <div>
        <h3 className="font-medium text-orange-500 mb-1">What technologies do you use?</h3>
        <p className="font-light">HTML, CSS, JavaScript, React, SwiftUI, Node.js, and more!</p>
      </div>
      
      <div>
        <h3 className="font-medium text-orange-500 mb-1">Are you available for freelance work?</h3>
        <p className="font-light">Yes! I'm available for exciting web development projects.</p>
      </div>
      
      <div>
        <h3 className="font-medium text-orange-500 mb-1">How long have you been coding?</h3>
        <p className="font-light">I've been passionate about coding for several years, constantly learning new technologies.</p>
      </div>
      
      <div>
        <h3 className="font-medium text-orange-500 mb-1">What's your development process?</h3>
        <p className="font-light">I focus on understanding requirements, designing solutions, and implementing with clean, maintainable code.</p>
      </div>
    </div>
  </div>
);

export default Y2KDesktopPortfolio;