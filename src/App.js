import React, { useState, useEffect, useRef } from 'react';
import { X, Info, Link, Briefcase, HelpCircle, Mail, Twitter, Instagram, Github, Linkedin, Moon, Sun, Image, Menu, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { cn } from './lib/utils';

const Y2KDesktopPortfolio = () => {
  const [windows, setWindows] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? JSON.parse(saved) : false;
  });
  const [zIndexCounter, setZIndexCounter] = useState(1000);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
  const openWork = () => createWindow('work', 'My Work', <WorkContent />);
  const openLinks = () => createWindow('links', 'Links', <LinksContent isDarkMode={isDarkMode} />);
  const openContact = () => createWindow('contact', 'Contact', <ContactContent />);
  const openFaq = () => createWindow('faq', 'FAQ', <FaqContent />);

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-500 relative overflow-hidden font-sans",
      isDarkMode ? "bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-900"
    )}>

      {/* Dark Mode Toggle */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            playClickSound();
            setIsDarkMode(!isDarkMode);
          }}
          className="rounded-full shadow-lg bg-background/80 backdrop-blur-sm"
        >
          {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
        </Button>
      </div>

      {/* Mobile Menu Button */}
      {isMobile && (
        <div className="fixed top-4 left-4 z-50">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-full shadow-lg bg-background/80 backdrop-blur-sm"
          >
            <Menu size={20} />
          </Button>
        </div>
      )}

      {/* Main Home Content */}
      <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            "pointer-events-auto w-full max-w-2xl rounded-xl shadow-2xl border overflow-hidden backdrop-blur-sm",
            isDarkMode ? "bg-slate-800/90 border-slate-700" : "bg-white/90 border-slate-200"
          )}
        >
          {/* Window Header */}
          <div className={cn(
            "h-10 flex items-center justify-between px-4 border-b",
            isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
          )}>
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-slate-300 rounded-full hover:bg-red-400 transition-colors" />
              <div className="w-3 h-3 bg-slate-300 rounded-full hover:bg-yellow-400 transition-colors" />
              <div className="w-3 h-3 bg-slate-300 rounded-full hover:bg-green-400 transition-colors" />
            </div>
            <span className="text-sm font-medium opacity-40 tracking-widest uppercase text-[10px]">portfolio.os</span>
          </div>

          {/* Window Content */}
          <div className="p-8 text-center space-y-8">
            <div className="space-y-4">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl md:text-5xl font-light tracking-tight"
              >
                Hi, I'm <span className="font-medium text-sky-600">Swapnil</span>
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

      {/* Social Links */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 z-40">
        {[
          { icon: <Instagram size={20} />, href: "https://www.instagram.com" },
          { icon: <Twitter size={20} />, href: "https://x.com/home" },
          { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/swapnil-negi-46048725a/" },
          { icon: <Github size={20} />, href: "https://github.com/SWAPN1L-code" },
        ].map((social, idx) => (
          <motion.a
            key={idx}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={playClickSound}
            onMouseEnter={playHoverSound}
            className={cn(
              "p-3 rounded-full shadow-lg transition-colors",
              isDarkMode ? "bg-slate-800 hover:bg-slate-700 text-white" : "bg-white hover:bg-slate-50 text-slate-800"
            )}
          >
            {social.icon}
          </motion.a>
        ))}
      </div>

      {/* Footer */}
      <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 text-xs opacity-50">
        © 2025 Swapnil Negi
      </div>

      <WaveBackground isDarkMode={isDarkMode} />
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
    className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
  >
    <div className="p-3 rounded-lg bg-slate-50 text-slate-600 group-hover:text-sky-600 group-hover:bg-sky-50 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:text-sky-400 dark:group-hover:bg-sky-900/30 transition-colors">
      {icon}
    </div>
    <span className="text-xs font-medium text-slate-500 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-200">{label}</span>
  </motion.button>
);

const DraggableWindow = ({ window, onClose, onFocus, onMaximize, isDarkMode, isMobile }) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragControls = useDragControls();

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      drag={!window.isMaximized && !isMobile}
      dragMomentum={false}
      dragListener={false}
      dragControls={dragControls}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      className={cn(
        "fixed rounded-lg shadow-2xl border overflow-hidden flex flex-col",
        isDarkMode ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200",
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
          "h-10 flex items-center justify-between px-4 border-b select-none",
          isDarkMode ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-200",
          !window.isMaximized && !isMobile ? "cursor-move" : ""
        )}
        onPointerDown={(e) => {
          if (!window.isMaximized && !isMobile) {
            dragControls.current?.start(e);
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

const WaveBackground = ({ isDarkMode }) => (
  <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-0">
    <svg className="w-full h-32 md:h-48" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path
        fill={isDarkMode ? "rgba(14, 165, 233, 0.05)" : "rgba(14, 165, 233, 0.05)"}
        fillOpacity="1"
        d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      />
    </svg>
  </div>
);

// Content Components
const AboutContent = () => (
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

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            ⚽ Football & Tactics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            If passion had a Premier League table, I’d be sitting top of the league with football—blue side of Manchester, obviously. I don’t just watch Man City, I overanalyze Pep’s tactics like it’s a PhD thesis.
          </p>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {['football1.png', 'football2.png', 'football3.png'].map((img, i) => (
              <img key={i} src={`${process.env.PUBLIC_URL}/${img}`} alt="football" className="w-16 h-16 object-contain" />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
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

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            🏔️ Hiking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            And when I’m not yelling ‘GOAAALLL,’ I’m chasing actual goals—like climbing at least 10 mountains before 2030.
          </p>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {['mountain1.png', 'mountain2.png', 'mountain3.png', 'mountain4.png'].map((img, i) => (
              <img key={i} src={`${process.env.PUBLIC_URL}/${img}`} alt="mountain" className="w-16 h-16 object-contain" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const WorkContent = () => (
  <div className="space-y-6 max-w-3xl mx-auto">
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold mb-2">My Projects</h2>
      <p className="text-muted-foreground">A collection of my recent work</p>
    </div>

    <div className="grid gap-6">
      <Card className="overflow-hidden group hover:shadow-lg transition-shadow border-slate-200 dark:border-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-slate-800 dark:text-slate-100 group-hover:text-sky-600 transition-colors">DailyGitHack</CardTitle>
            <Button size="sm" variant="outline" asChild className="hover:bg-sky-50 hover:text-sky-600 border-slate-200">
              <a href="https://github.com/SWAPN1L-code/dailygithack" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> GitHub
              </a>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            A SwiftUI app that helps you keep your GitHub streak alive by pushing daily commits with style.
            Generate commit messages, track contribution stats, and push logs directly to your GitHub repo using the GitHub REST API.
          </p>
          <div className="flex gap-2 flex-wrap">
            {['SwiftUI', 'GitHub API', 'iOS'].map(tag => (
              <span key={tag} className="px-2 py-1 bg-secondary rounded-md text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden group hover:shadow-lg transition-shadow border-slate-200 dark:border-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-slate-800 dark:text-slate-100 group-hover:text-sky-600 transition-colors">Dashboard Website</CardTitle>
            <Button size="sm" variant="outline" asChild className="hover:bg-sky-50 hover:text-sky-600 border-slate-200">
              <a href="https://github.com/SWAPN1L-code/dashboard-app" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> GitHub
              </a>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            I built a customizable Dashboard using HTML, CSS, and JavaScript that brings together widgets like weather, calendar, clock, and task manager in one clean interface.
          </p>
          <div className="flex gap-2 flex-wrap">
            {['HTML', 'CSS', 'JavaScript', 'Widgets'].map(tag => (
              <span key={tag} className="px-2 py-1 bg-secondary rounded-md text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
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

const LinksContent = () => (
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
          "flex items-center gap-4 p-4 rounded-xl border bg-card hover:bg-accent transition-all hover:scale-105",
          link.full ? "sm:col-span-2" : ""
        )}
      >
        <div className={cn("p-2 rounded-full bg-background shadow-sm", link.color)}>
          {link.icon}
        </div>
        <span className="font-medium">{link.label}</span>
      </a>
    ))}
  </div>
);

const ContactContent = () => (
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
      <Button asChild className="flex-1">
        <a href="mailto:swapnilnegi06@gmail.com">Send Email</a>
      </Button>
      <Button variant="outline" asChild className="flex-1">
        <a href="tel:+919149177159">Call Now</a>
      </Button>
    </div>
  </div>
);

const FaqContent = () => (
  <div className="space-y-4 max-w-2xl mx-auto">
    {[
      { q: "What technologies do you use?", a: "I primarily work with React, Node.js, and Tailwind CSS, but I'm also experienced with SwiftUI for iOS development." },
      { q: "Are you available for freelance work?", a: "Yes! I'm currently open to new opportunities and interesting projects." },
      { q: "How long have you been coding?", a: "I've been coding for several years, constantly learning and adapting to new technologies." },
      { q: "What's your development process?", a: "I focus on user-centric design, clean code, and performance optimization." },
    ].map((item, i) => (
      <Card key={i} className="hover:border-sky-200 transition-colors">
        <CardHeader>
          <CardTitle className="text-base text-sky-600">{item.q}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{item.a}</p>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default Y2KDesktopPortfolio;