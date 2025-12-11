# NASA Website

A modern, animated website built with React, TypeScript, and Vite featuring smooth animations and responsive design.

## Features

- 🚀 **Hero Section**: Eye-catching landing with fade-in animations
- 📖 **Team Story Section**: Placeholder for team narrative with visual appeal
- 💡 **Product Section**: Split layout showing Theory (How it Works) and Practice (Implementation)
- 🔗 **Footer**: Minimalist design with social links
- 🎨 **Modern Design**: Monotone background with accent colors
- ✨ **Smooth Animations**: Fade-in on scroll, hover effects, and transitions
- 📱 **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **CSS3** - Animations and styling
- **CSS Grid & Flexbox** - Responsive layouts

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and visit the URL shown in the terminal (typically `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Hero.tsx          # Landing section with animations
│   ├── Hero.css
│   ├── TeamStory.tsx     # Team story section
│   ├── TeamStory.css
│   ├── Product.tsx       # Product theory & practice
│   ├── Product.css
│   ├── Footer.tsx        # Footer with links
│   └── Footer.css
├── App.tsx               # Main app component
├── App.css               # App-level styles
├── main.tsx              # Entry point
└── index.css             # Global styles
```

## Customization

### Update Product Name & Tagline

Edit `src/components/Hero.tsx`:
```typescript
<h1 className="hero-title">Your Product Name</h1>
<p className="hero-tagline">Your tagline here</p>
```

### Add Team Story

Edit `src/components/TeamStory.tsx` and replace:
```typescript
<p className="story-text">[INSERT TEAM STORY HERE]</p>
```

### Modify Product Content

Edit the theory and practice sections in `src/components/Product.tsx`

### Update Links

Edit `src/components/Footer.tsx` to add your email, GitHub, LinkedIn, etc.

## Color Scheme

The site uses a modern gradient-based color scheme:
- Primary: `#667eea` → `#764ba2` (Purple gradient)
- Background: Dark monotone (`#1a1a2e`, `#16213e`)
- Text: White (`#ffffff`) and light gray (`#b8c5d6`)

Customize colors in `src/index.css` using CSS variables.

## License

MIT

## Contributing

Feel free to submit issues and enhancement requests!
