import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import PillNav from './components/PillNav';
import StarField from './components/StarField';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import SignUpPage from './pages/SignUpPage';
import './App.css';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Sign Up', href: '/signup' },
];

const AppInner: React.FC = () => {
  const location = useLocation();

  return (
    <div className="app">
      <StarField />
      <PillNav
        logo=""
        logoAlt="Moonshot"
        items={navItems}
        activeHref={location.pathname}
        className="moonshot-nav"
        baseColor="var(--bg-primary)"
        pillColor="var(--bg-secondary)"
        hoveredPillTextColor="var(--accent-cyan)"
        pillTextColor="var(--text-primary)"
      />

      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </AnimatePresence>

      <Footer />
    </div>
  );
};

const App: React.FC = () => (
  <ThemeProvider>
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
