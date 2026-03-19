import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import ThemeToggle from './ThemeToggle';
import './PillNav.css';

export type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export interface PillNavProps {
  logo: string;
  logoAlt?: string;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
}

const PillNav: React.FC<PillNavProps> = ({
  items,
  activeHref,
  className = '',
  ease = 'power3.easeOut',
  baseColor = '#0e0a1d',
  pillColor = '#ffffff',
  hoveredPillTextColor = '#ffffff',
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true,
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const navItemsRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | HTMLElement | null>(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach(circle => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          opacity: 0,
          visibility: 'hidden',
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector<HTMLElement>('.pill-label');
        const hover = pill.querySelector<HTMLElement>('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (hover) gsap.set(hover, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, opacity: 1, visibility: 'visible', duration: 2, ease, overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
        }

        if (hover) {
          gsap.set(hover, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(hover, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    if (document.fonts) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1, y: 0 });
    }

    if (initialLoadAnimation) {
      const logo = logoRef.current;
      const navItems = navItemsRef.current;

      if (logo) {
        gsap.set(logo, { scale: 0 });
        gsap.to(logo, {
          scale: 1,
          duration: 0.6,
          ease,
        });
      }

      if (navItems) {
        gsap.set(navItems, { width: 0, overflow: 'hidden' });
        gsap.to(navItems, {
          width: 'auto',
          duration: 0.6,
          ease,
        });
      }
    }

    return () => window.removeEventListener('resize', onResize);
  }, [items, ease, initialLoadAnimation]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    const circle = circleRefs.current[i];
    if (circle) gsap.set(circle, { visibility: 'visible' });
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto',
    });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    const circle = circleRefs.current[i];
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto',
      onComplete: () => {
        if (circle) gsap.set(circle, { visibility: 'hidden', opacity: 0, scale: 0 });
      },
    });
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.2,
      ease,
      overwrite: 'auto',
    });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10, scaleY: 1 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 0.3,
            ease,
            transformOrigin: 'top center',
          },
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          scaleY: 1,
          duration: 0.2,
          ease,
          transformOrigin: 'top center',
          onComplete: () => {
            gsap.set(menu, { visibility: 'hidden' });
          },
        });
      }
    }

    onMobileMenuClick?.();
  };

  const cssVars = {
    ['--base' as string]: baseColor,
    ['--pill-bg' as string]: pillColor,
    ['--hover-text' as string]: hoveredPillTextColor,
    ['--pill-text' as string]: resolvedPillTextColor,
  } as React.CSSProperties;

  const handleItemClick = (item: PillNavItem, e: React.MouseEvent<HTMLElement>) => {
    if (item.href?.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(item.href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    } else if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="pill-nav-shell">
      <nav
        className={`pill-nav-root ${className}`}
        aria-label="Primary"
        style={cssVars}
      >
        <Link
          to="/"
          aria-label="Moonshot Home"
          onMouseEnter={handleLogoEnter}
          ref={el => { logoRef.current = el; }}
          className="pill-nav-logo"
        >
          <svg width="22" height="22" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <circle cx="20" cy="20" r="18" stroke="url(#nl1)" strokeWidth="2" />
            <circle cx="20" cy="20" r="8" fill="url(#nl2)" opacity="0.9" />
            <circle cx="28" cy="12" r="3" fill="#00d4ff" opacity="0.8" />
            <defs>
              <linearGradient id="nl1" x1="0" y1="0" x2="40" y2="40">
                <stop stopColor="#7c3aed" />
                <stop offset="1" stopColor="#00d4ff" />
              </linearGradient>
              <linearGradient id="nl2" x1="0" y1="0" x2="20" y2="20">
                <stop stopColor="#7c3aed" />
                <stop offset="1" stopColor="#00d4ff" />
              </linearGradient>
            </defs>
          </svg>
        </Link>

        <div ref={navItemsRef} className="pill-nav-items">
          <ul role="menubar" className="pill-nav-list">
            {items.map((item, i) => {
              const isActive = activeHref === item.href;

              const pillStyle: React.CSSProperties = {
                background: 'var(--pill-bg, #fff)',
                color: 'var(--pill-text, var(--base, #000))',
              };

              const pillContent = (
                <>
                  <span
                    className="hover-circle"
                    aria-hidden="true"
                    ref={el => { circleRefs.current[i] = el; }}
                  />
                  <span className="label-stack">
                    <span className="pill-label">{item.label}</span>
                    <span className="pill-label-hover" aria-hidden="true">{item.label}</span>
                  </span>
                  {isActive && <span className="pill-active-dot" aria-hidden="true" />}
                </>
              );

              return (
                <li key={item.href} role="none" className="pill-nav-li">
                  {item.href.startsWith('#') ? (
                    <button
                      type="button"
                      role="menuitem"
                      className={`pill-nav-pill ${isActive ? 'is-active' : ''}`}
                      style={pillStyle}
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                      onClick={e => handleItemClick(item, e)}
                    >
                      {pillContent}
                    </button>
                  ) : item.href.startsWith('/') ? (
                    <Link
                      role="menuitem"
                      to={item.href}
                      className={`pill-nav-pill ${isActive ? 'is-active' : ''}`}
                      style={pillStyle}
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                      onClick={() => { if (isMobileMenuOpen) setIsMobileMenuOpen(false); }}
                    >
                      {pillContent}
                    </Link>
                  ) : (
                    <a
                      role="menuitem"
                      href={item.href}
                      className={`pill-nav-pill ${isActive ? 'is-active' : ''}`}
                      style={pillStyle}
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                      onClick={e => handleItemClick(item, e)}
                    >
                      {pillContent}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="pill-nav-right">
          <ThemeToggle />
          <button
            ref={hamburgerRef}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            className="pill-nav-hamburger"
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </nav>

      <div
        ref={mobileMenuRef}
        className={`pill-nav-mobile ${isMobileMenuOpen ? 'open' : ''}`}
        style={cssVars}
      >
        <ul className="pill-nav-mobile-list">
          {items.map(item => {
            const isActive = activeHref === item.href;
            return (
              <li key={item.href}>
                {item.href.startsWith('#') ? (
                  <button
                    type="button"
                    className={`pill-nav-mobile-link ${isActive ? 'is-active' : ''}`}
                    onClick={e => handleItemClick(item, e)}
                  >
                    {item.label}
                  </button>
                ) : item.href.startsWith('/') ? (
                  <Link
                    to={item.href}
                    className={`pill-nav-mobile-link ${isActive ? 'is-active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className={`pill-nav-mobile-link ${isActive ? 'is-active' : ''}`}
                    onClick={e => handleItemClick(item, e)}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PillNav;
