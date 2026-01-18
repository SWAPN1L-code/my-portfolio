import React, { useState, useEffect, useRef } from 'react';
import { X, Info, Link, Briefcase, HelpCircle, Mail, Twitter, Instagram, Github, Linkedin, Moon, Sun, Menu, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Button } from './components/ui/button';
import { GlassButton } from './components/ui/glass-button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { cn } from './lib/utils';
import GhostCursor from './components/ui/GhostCursor';
import LaserFlow from './components/ui/LaserFlow';
import { Play, ExternalLink } from 'lucide-react';
import AnimatedList from './components/ui/AnimatedList';

const Y2KDesktopPortfolio = () => {
  const [windows, setWindows] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === null) return false;
      return JSON.parse(saved) === true;
    } catch (e) {
      return false;
    }
  });
  const [zIndexCounter, setZIndexCounter] = useState(1000);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const revealImgRef = useRef(null);

  const handleRevealMove = (e) => {
    if (!revealImgRef.current) return;
    const x = e.clientX;
    const y = e.clientY;
    revealImgRef.current.style.setProperty('--mx', `${x}px`);
    revealImgRef.current.style.setProperty('--my', `${y}px`);
  };

  const handleRevealLeave = () => {
    if (!revealImgRef.current) return;
    revealImgRef.current.style.setProperty('--mx', '-9999px');
    revealImgRef.current.style.setProperty('--my', '-9999px');
  };

  // Handle resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Persist theme
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Sound effects
  const playSound = (freq, type = 'sine', duration = 0.1) => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = type;
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
      // Audio not available
    }
  };

  const playClickSound = () => playSound(800, 'sine', 0.1);
  const playHoverSound = () => playSound(600, 'triangle', 0.05);
  const playOpenSound = () => playSound(400, 'sine', 0.2);
  const playCloseSound = () => playSound(300, 'square', 0.15);

  const createWindow = (type, title, content) => {
    playOpenSound();
    const existingWindow = windows.find(w => w.type === type);

    if (existingWindow) {
      bringToFront(existingWindow.id);
      return;
    }

    const newWindow = {
      id: Date.now(),
      type,
      title,
      content,
      x: isMobile ? 0 : Math.random() * 100 + 100,
      y: isMobile ? 0 : Math.random() * 100 + 50,
      width: isMobile ? '100%' : 600,
      height: isMobile ? '100%' : 500,
      zIndex: zIndexCounter,
      isMaximized: isMobile
    };
    setWindows(prev => [...prev, newWindow]);
    setZIndexCounter(prev => prev + 1);
    if (isMobile) setIsMenuOpen(false);
  };

  const closeWindow = (id) => {
    playCloseSound();
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  const bringToFront = (id) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, zIndex: zIndexCounter } : w
    ));
    setZIndexCounter(prev => prev + 1);
  };

  const toggleMaximize = (id) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  };

  const openAbout = () => createWindow('about', 'About Me', <AboutContent />);
  const openWork = () => createWindow('work', 'My Work', <WorkContent isDarkMode={isDarkMode} />);
  const openLinks = () => createWindow('links', 'Links', <LinksContent isDarkMode={isDarkMode} />);
  const openContact = () => createWindow('contact', 'Contact', <ContactContent isDarkMode={isDarkMode} />);
  const openFaq = () => createWindow('faq', 'FAQ', <FaqContent />);

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-500 relative overflow-hidden font-sans",
        isDarkMode ? "text-slate-100" : "text-slate-900"
      )}
      onMouseMove={handleRevealMove}
      onMouseLeave={handleRevealLeave}
    >
      {/* Background Base Layer */}
      <div className="fixed inset-0 z-[-2] pointer-events-none" style={{ backgroundColor: isDarkMode ? '#060010' : '#f8faff' }} />

      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <LaserFlow
          color={isDarkMode ? "#ffffff" : "#000000"}
          backgroundColor={isDarkMode ? "#040008" : "#ffffff"}
          fogIntensity={isDarkMode ? 0.38 : 0.18}
          horizontalBeamOffset={0.0}
          verticalBeamOffset={-0.5}
          horizontalSizing={3.8}
          verticalSizing={2.8}
        />

        {/* Reveal Image Effect */}
        <div
          ref={revealImgRef}
          className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-500"
          style={{
            zIndex: 1,
            mixBlendMode: isDarkMode ? 'screen' : 'multiply',
            '--mx': '-9999px',
            '--my': '-9999px',
            filter: isDarkMode ? 'grayscale(100%)' : 'grayscale(100%) contrast(1.2)',
            backgroundImage: `url('https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80\u0026w=2070\u0026auto=format\u0026fit=crop')`,
            backgroundSize: 'cover',
            WebkitMaskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 80px, rgba(255,255,255,0.6) 160px, rgba(255,255,255,0.25) 240px, rgba(255,255,255,0) 320px)',
            maskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 80px, rgba(255,255,255,0.6) 160px, rgba(255,255,255,0.25) 240px, rgba(255,255,255,0) 320px)',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat'
          }}
        />
      </div>
      {/* Dynamic Background Blobs for Glass POP */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className={cn(
          "absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-10 animate-pulse",
          isDarkMode ? "bg-white" : "bg-slate-300"
        )} />
        <div className={cn(
          "absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-10 animate-pulse delay-1000",
          isDarkMode ? "bg-slate-500" : "bg-slate-200"
        )} />
      </div>

      {/* Dark Mode Toggle */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            playClickSound();
            setIsDarkMode(!isDarkMode);
          }}
          className="rounded-full shadow-lg glass-morphism hover:bg-white/20 transition-all"
        >
          {isDarkMode ? <Moon size={20} className="text-blue-400" /> : <Sun size={20} className="text-yellow-500" />}
        </Button>
      </div>

      <GhostCursor
        color={isDarkMode ? "#ffffff" : "#000000"}
        bloomStrength={isDarkMode ? 0.8 : 0.3}
        trailLength={30}
      />

      {/* LaserFlow and Reveal Effect now integrated at the root level */}

      {/* Mobile Menu Button */}
      {isMobile && (
        <div className="fixed top-4 left-4 z-50">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-full shadow-lg glass-morphism hover:bg-white/20 transition-all"
          >
            <Menu size={20} />
          </Button>
        </div>
      )}

      {/* Main Home Content */}
      <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none z-20">
        <motion.div
          drag
          dragMomentum={false}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            "pointer-events-auto w-full max-w-2xl rounded-2xl shadow-2xl border overflow-hidden cursor-grab active:cursor-grabbing",
            isDarkMode ? "glass-dark" : "glass"
          )}
        >
          {/* Window Header */}
          <div className={cn(
            "h-12 flex items-center justify-between px-6 border-b",
            isDarkMode ? "bg-white/5 border-white/10" : "bg-black/5 border-black/5"
          )}>
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-slate-300 rounded-full hover:bg-red-400 transition-colors" />
              <div className="w-3 h-3 bg-slate-300 rounded-full hover:bg-yellow-400 transition-colors" />
              <div className="w-3 h-3 bg-slate-300 rounded-full hover:bg-green-400 transition-colors" />
            </div>
          </div>

          {/* Window Content */}
          <div className="p-8 text-center space-y-8">
            <div className="space-y-4">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl md:text-5xl font-extralight tracking-tight"
              >
                Hi, I'm <span className="font-medium text-blue-500 drop-shadow-sm">Swapnil</span>
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-slate-500 font-light"
              >
                Web Developer & Music Enthusiast
              </motion.p>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 justify-items-center">
              {[
                { icon: <Info />, label: 'About', action: openAbout },
                { icon: <Briefcase />, label: 'Work', action: openWork },
                { icon: <Link />, label: 'Links', action: openLinks },
                { icon: <HelpCircle />, label: 'FAQ', action: openFaq },
                { icon: <Mail />, label: 'Contact', action: openContact },
              ].map((item, index) => (
                <NavigationBox
                  key={item.label}
                  {...item}
                  delay={index * 0.1}
                  onHover={playHoverSound}
                  onClick={() => {
                    playClickSound();
                    item.action();
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Windows */}
      <AnimatePresence>
        {windows.map(window => (
          <DraggableWindow
            key={window.id}
            window={window}
            onClose={() => closeWindow(window.id)}
            onFocus={() => bringToFront(window.id)}
            onMaximize={() => toggleMaximize(window.id)}
            isDarkMode={isDarkMode}
            isMobile={isMobile}
          />
        ))}
      </AnimatePresence>


      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 pb-3 pt-4 z-40">
        <div className="flex flex-col items-center gap-3">
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {[
              { icon: <Instagram size={16} />, href: "https://www.instagram.com", label: "Instagram" },
              { icon: <Twitter size={16} />, href: "https://x.com/home", label: "Twitter" },
              { icon: <Linkedin size={16} />, href: "https://www.linkedin.com/in/swapnil-negi-46048725a/", label: "LinkedIn" },
              { icon: <Github size={16} />, href: "https://github.com/SWAPN1L-code", label: "GitHub" },
            ].map((social, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  onClick={playClickSound}
                  onMouseEnter={playHoverSound}
                  className={cn(
                    "flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300",
                    isDarkMode
                      ? "bg-slate-700/60 hover:bg-slate-600/70 text-white/80 hover:text-white border border-slate-600/40"
                      : "bg-slate-400/60 hover:bg-slate-500/70 text-white hover:text-white border border-slate-300/40",
                    "backdrop-blur-md shadow-md hover:shadow-lg"
                  )}
                >
                  {social.icon}
                </a>
              </motion.div>
            ))}
          </div>

          {/* Copyright Text */}
          <p className={cn(
            "text-xs font-medium tracking-wide",
            isDarkMode ? "text-slate-400/70" : "text-slate-500/70"
          )}>
            © 2025 Swapnil
          </p>
        </div>
      </div>

    </div>
  );
};

const NavigationBox = ({ icon, label, onClick, onHover, delay }) => (
  <motion.button
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 0.2 + delay, type: "spring" }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    onMouseEnter={onHover}
    className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-white/10 dark:hover:bg-black/10 transition-all group scale-100 hover:scale-105 active:scale-95"
  >
    <div className="p-4 rounded-2xl glass-morphism text-slate-600 group-hover:text-blue-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] dark:text-slate-300 dark:group-hover:text-blue-400 transition-all border border-white/20">
      {icon}
    </div>
    <span className="text-xs font-semibold tracking-wide text-slate-500 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-100">{label}</span>
  </motion.button>
);

const DraggableWindow = ({ window, onClose, onFocus, onMaximize, isDarkMode, isMobile }) => {
  const dragControls = useDragControls();

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      drag={!window.isMaximized && !isMobile}
      dragMomentum={false}
      dragListener={true} // Changed to true to allow dragging from anywhere
      dragControls={dragControls}
      className={cn(
        "fixed rounded-2xl shadow-2xl border overflow-hidden flex flex-col",
        isDarkMode ? "glass-dark" : "glass",
        window.isMaximized || isMobile ? "inset-0 rounded-none m-0" : ""
      )}
      style={{
        left: window.isMaximized || isMobile ? 0 : window.x,
        top: window.isMaximized || isMobile ? 0 : window.y,
        width: window.isMaximized || isMobile ? '100%' : window.width,
        height: window.isMaximized || isMobile ? '100%' : window.height,
        zIndex: window.zIndex,
        position: window.isMaximized || isMobile ? 'fixed' : 'absolute'
      }}
      onClick={onFocus}
    >
      {/* Window Header */}
      <div
        className={cn(
          "h-12 flex items-center justify-between px-6 border-b select-none",
          isDarkMode ? "bg-white/5 border-white/10" : "bg-black/5 border-black/5",
          !window.isMaximized && !isMobile ? "cursor-move" : ""
        )}
        onPointerDown={(e) => {
          if (!window.isMaximized && !isMobile) {
            dragControls.start(e);
            onFocus();
          }
        }}
      >
        <span className="text-sm font-medium">{window.title}</span>
        <div className="flex items-center gap-2">
          {!isMobile && (
            <button
              onClick={(e) => { e.stopPropagation(); onMaximize(); }}
              className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded"
            >
              {window.isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="p-1 hover:bg-red-500 hover:text-white rounded transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto p-6">
        {window.content}
      </div>
    </motion.div>
  );
};



// Content Components
const AboutContent = () => {
  const hobbies = [
    (
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            ⚽ Football & Tactics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            If passion had a Premier League table, I'd be sitting top of the league with football—blue side of Manchester, obviously. I don't just watch Man City, I overanalyze Pep’s tactics like it's a PhD thesis.
          </p>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {['football1.png', 'football2.png', 'football3.png'].map((img, i) => (
              <img key={i} src={`${process.env.PUBLIC_URL}/${img}`} alt="football" className="w-16 h-16 object-contain" />
            ))}
          </div>
        </CardContent>
      </Card>
    ),
    (
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            🎵 Music
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            When life gets noisy, Kanye and Frank Ocean run my soundtrack. One gives me stadium-level confidence, the other makes me stare at the ceiling and question the universe—balance is key.
          </p>
          <div className="flex gap-4">
            {['kanye.png', 'frank.png'].map((img, i) => (
              <img key={i} src={`${process.env.PUBLIC_URL}/${img}`} alt="music" className="w-16 h-16 object-contain" />
            ))}
          </div>
        </CardContent>
      </Card>
    ),
    (
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            🏔️ Hiking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            And when I'm not yelling 'GOAAALLL,' I'm chasing actual goals—like climbing at least 10 mountains before 2030.
          </p>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {['mountain1.png', 'mountain2.png', 'mountain3.png', 'mountain4.png'].map((img, i) => (
              <img key={i} src={`${process.env.PUBLIC_URL}/${img}`} alt="mountain" className="w-16 h-16 object-contain" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  ];

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={`${process.env.PUBLIC_URL}/swapnil.jpg`}
          alt="Swapnil"
          className="w-32 h-32 rounded-full object-cover border-4 border-slate-100 dark:border-slate-800 shadow-xl"
        />
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Swapnil Negi</h2>
          <p className="text-sky-600 font-medium">Web Developer • Music Enthusiast • Traveler</p>
        </div>
      </div>

      <div className="space-y-6 text-lg leading-relaxed opacity-90">
        <p>
          Hi, I'm Swapnil — a passionate and creative web developer who loves turning ideas into sleek, user-friendly websites.
        </p>
        <p>
          With a strong foundation in HTML, CSS, JavaScript, and modern frameworks, I build responsive designs and interactive experiences.
        </p>
      </div>

      <AnimatedList
        items={hobbies}
        showGradients={true}
        enableArrowNavigation={false}
        displayScrollbar={true}
      />
    </div>
  );
};

const WorkContent = ({ isDarkMode }) => (
  <div className="space-y-6 max-w-3xl mx-auto">
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold mb-2">My Projects</h2>
      <p className="text-muted-foreground">A collection of my recent work</p>
    </div>

    <div className="grid gap-6">
      {[
        {
          title: "DailyGitHack",
          github: "https://github.com/SWAPN1L-code/dailygithack",
          demo: "#",
          deployed: "https://dailygithack.vercel.app",
          videoUrl: "https://www.youtube.com/watch?v=kYmInN20jVw",
          description: "A SwiftUI app that helps you keep your GitHub streak alive by pushing daily commits with style. Generate commit messages, track contribution stats, and push logs directly to your GitHub repo.",
          tags: ['SwiftUI', 'GitHub API', 'iOS']
        },
        {
          title: "Dashboard Website",
          github: "https://github.com/SWAPN1L-code/dashboard-app",
          demo: "#",
          deployed: "https://dashboard-swapnil.vercel.app",
          videoUrl: "https://www.youtube.com/watch?v=kYmInN20jVw",
          description: "A customizable Dashboard using HTML, CSS, and JavaScript that brings together widgets like weather, calendar, clock, and task manager in one clean interface.",
          tags: ['HTML', 'CSS', 'JavaScript', 'Widgets']
        }
      ].map((project) => (
        <Card key={project.title} className="overflow-hidden group hover:shadow-lg transition-all border-slate-200 dark:border-slate-800 glass-morphism">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-slate-800 dark:text-slate-100 group-hover:text-sky-600 transition-colors">{project.title}</CardTitle>
              <div className="flex gap-2">
                <GlassButton isDarkMode={isDarkMode} asChild className="px-3 py-2 text-xs h-auto">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-3.5 w-3.5" /> GitHub
                  </a>
                </GlassButton>
                <GlassButton isDarkMode={isDarkMode} asChild className="px-3 py-2 text-xs h-auto">
                  <a href={project.deployed} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-3.5 w-3.5" /> Live
                  </a>
                </GlassButton>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-sm">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-secondary rounded-md text-[10px] font-medium uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
            <div className="pt-2">
              <GlassButton
                isDarkMode={isDarkMode}
                asChild
                className="w-full text-xs flex items-center justify-center gap-2 py-3"
              >
                <a href={project.videoUrl} target="_blank" rel="noopener noreferrer">
                  <Play size={14} /> Video Demo Available
                </a>
              </GlassButton>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {['HTML/CSS', 'JavaScript', 'React', 'SwiftUI', 'Node.js', 'Git/GitHub', 'Tailwind'].map(skill => (
              <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Platforms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {['GitHub', 'LeetCode', 'LinkedIn', 'Vercel', 'XCode'].map(platform => (
              <span key={platform} className="px-3 py-1 bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-300 rounded-full text-sm font-medium">
                {platform}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const LinksContent = ({ isDarkMode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
    {[
      { icon: <Instagram size={24} />, label: "Instagram", href: "https://www.instagram.com", color: "text-pink-500" },
      { icon: <Twitter size={24} />, label: "X (Twitter)", href: "https://x.com/home", color: "text-blue-400" },
      { icon: <Linkedin size={24} />, label: "LinkedIn", href: "https://www.linkedin.com/in/swapnil-negi-46048725a/", color: "text-blue-600" },
      { icon: <Briefcase size={24} />, label: "LeetCode", href: "https://leetcode.com/u/30NK3T28Ag/", color: "text-yellow-500" },
      { icon: <Github size={24} />, label: "GitHub", href: "https://github.com/SWAPN1L-code", color: "text-gray-800 dark:text-white", full: true },
    ].map((link, i) => (
      <a
        key={link.label}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "flex items-center gap-4 p-4 rounded-xl border transition-all hover:scale-105 glass-morphism",
          isDarkMode ? "bg-white/5 border-white/10" : "bg-black/5 border-black/5",
          link.full ? "sm:col-span-2" : ""
        )}
      >
        <div className={cn("p-2 rounded-full shadow-sm bg-white/10 dark:bg-white/5", link.color)}>
          {link.icon}
        </div>
        <span className="font-medium">{link.label}</span>
      </a>
    ))}
  </div>
);

const ContactContent = ({ isDarkMode }) => (
  <div className="max-w-md mx-auto text-center space-y-8">
    <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto">
      <Mail size={48} className="text-blue-500" />
    </div>

    <div>
      <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
      <p className="text-muted-foreground">
        Have a project in mind or just want to say hi? I'd love to hear from you.
      </p>
    </div>

    <div className="space-y-4">
      <Card className="p-4 flex items-center gap-4 hover:border-sky-200 transition-colors">
        <div className="p-3 bg-sky-50 dark:bg-sky-900/20 rounded-full text-sky-600">
          <Mail size={20} />
        </div>
        <div className="text-left">
          <p className="text-sm font-medium text-muted-foreground">Email</p>
          <p className="font-medium">swapnilnegi06@gmail.com</p>
        </div>
      </Card>

      <Card className="p-4 flex items-center gap-4 hover:border-sky-200 transition-colors">
        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300">
          <Briefcase size={20} />
        </div>
        <div className="text-left">
          <p className="text-sm font-medium text-muted-foreground">Phone</p>
          <p className="font-medium">+91 9149177159</p>
        </div>
      </Card>
    </div>

    <div className="flex gap-4 justify-center pt-4">
      <GlassButton isDarkMode={isDarkMode} className="flex-1" asChild>
        <a href="mailto:swapnilnegi06@gmail.com">Send Email</a>
      </GlassButton>
      <GlassButton isDarkMode={isDarkMode} className="flex-1" asChild>
        <a href="tel:+919149177159">Call Now</a>
      </GlassButton>
    </div>
  </div>
);

const FaqContent = () => {
  const faqItems = [
    { q: "What technologies do you use?", a: "I primarily work with React, Node.js, and Tailwind CSS, but I'm also experienced with SwiftUI for iOS development." },
    { q: "Are you available for freelance work?", a: "Yes! I'm currently open to new opportunities and interesting projects." },
    { q: "How long have you been coding?", a: "I've been coding for several years, constantly learning and adapting to new technologies." },
    { q: "What's your development process?", a: "I focus on user-centric design, clean code, and performance optimization." },
    { q: "Do you work remotely?", a: "Absolutely! I'm comfortable working remotely and have experience collaborating with distributed teams." },
    { q: "What's your favorite tech stack?", a: "I love working with React, Tailwind CSS, and Framer Motion for creating beautiful, interactive UIs." },
  ].map((item, i) => (
    <Card key={i} className="hover:border-sky-200 transition-colors border-0 shadow-none bg-transparent">
      <CardHeader>
        <CardTitle className="text-base text-sky-600">{item.q}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{item.a}</p>
      </CardContent>
    </Card>
  ));

  return (
    <div className="max-w-2xl mx-auto">
      <AnimatedList
        items={faqItems}
        showGradients={true}
        enableArrowNavigation={true}
        displayScrollbar={true}
      />
    </div>
  );
};

export default Y2KDesktopPortfolio;