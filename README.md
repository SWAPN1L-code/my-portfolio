# Y2K Desktop Portfolio

A nostalgic Y2K-inspired desktop environment portfolio built with React, featuring draggable windows, sound effects, and a minimal monochrome design aesthetic.

## Features

### Desktop Environment
- **Always-visible home window** with embedded navigation
- **Draggable windows** that can be moved anywhere on screen
- **Mac-style window controls** with decorative green/yellow dots and functional red close button
- **No minimize functionality** - windows can only be closed for a clean experience

### Interactive Elements
- **Sound effects** on click and hover interactions using Web Audio API
- **Smooth animations** and hover effects throughout the interface
- **Dark/Light mode toggle** with complete theme switching
- **Responsive design** that works across different screen sizes

### Content Sections
- **About**: Personal introduction and background
- **Work**: Featured projects, skills, and development tools
- **Links**: Social media and platform links (Instagram, X, LinkedIn, LeetCode, GitHub)
- **Contact**: Email and phone contact information with clickable links

### Design Philosophy
- **Minimal aesthetics** with monochrome icons and clean typography
- **Y2K nostalgia** with retro window styling and desktop metaphors
- **White background** in light mode with subtle sky-blue wave accents
- **Consistent spacing** and typography using mono font family

## Tech Stack

- **React 18** with Hooks (useState, useEffect, useRef)
- **Tailwind CSS** for styling and responsive design
- **Lucide React** for consistent iconography
- **Web Audio API** for sound effects
- **CSS animations** for smooth transitions and wave effects

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/y2k-desktop-portfolio.git
cd y2k-desktop-portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Customization

### Personal Information
Update the following components with your own information:

- **AboutContent**: Personal bio and background
- **WorkContent**: Projects, skills, and experience
- **LinksContent**: Social media and platform URLs
- **ContactContent**: Email and phone contact details

### Styling
The portfolio uses a minimal color palette:
- **Light mode**: White background with gray accents
- **Dark mode**: Dark gradient with blue accents
- **Accent color**: Orange (#F97316) for highlights
- **Monochrome icons**: All icons use gray colors for consistency

### Sound Effects
Sound effects use the Web Audio API and include:
- Click sounds (800Hz frequency)
- Hover sounds (600Hz frequency)
- Automatic fallback if audio is not available

## Browser Compatibility

- **Chrome/Edge**: Full support including audio
- **Firefox**: Full support including audio
- **Safari**: Full support including audio
- **Mobile browsers**: Visual features work, audio may require user interaction

## Performance Considerations

- **Lightweight**: No external dependencies beyond React and Tailwind
- **Optimized rendering**: Efficient window management and state updates
- **Smooth animations**: CSS-based transitions for optimal performance
- **Memory efficient**: Clean component unmounting and event listener cleanup

## File Structure

```
src/
├── components/
│   ├── Y2KDesktopPortfolio.jsx    # Main portfolio component
│   ├── DraggableWindow.jsx        # Window management logic
│   ├── NavigationBox.jsx          # Home navigation buttons
│   └── ContentComponents.jsx      # About, Work, Links, Contact content
├── styles/
│   └── globals.css               # Global styles and Tailwind imports
└── App.jsx                       # Root application component
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request



## Acknowledgments

- Inspired by Y2K-era desktop environments and Sharlene Yap's portfolio design
- Icons provided by [Lucide React](https://lucide.dev/)
- Built with [Tailwind CSS](https://tailwindcss.com/) for styling
- Sound effects generated using Web Audio API

---

**Live Demo**: [View Portfolio](https://swapn1l-code.github.io/my-portfolio/)  
**Developer**: Swapnil Negi  
**Contact**: swapnilnegi06@gmail.com