import { AnimatePresence, motion } from 'motion/react';
import { Terminal, Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '../lib/utils';
import { MascotWatcher } from './MascotWatcher';

type NavbarThemeAccent = {
  id: string;
  label: string;
};

interface NavbarProps {
  theme: NavbarThemeAccent;
  onThemeChipClick: () => void;
  navLinks: Array<{ name: string; href: string }>;
  primaryAction: { label: string; href: string };
}

export const Navbar = ({ theme, onThemeChipClick, navLinks, primaryAction }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement | null>(null);

  const handleThemeChipClick = () => {
    window.dispatchEvent(new CustomEvent('mascot-theme-changing'));
    onThemeChipClick();
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!moreMenuRef.current) {
        return;
      }
      if (!moreMenuRef.current.contains(event.target as Node)) {
        setIsMoreMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const desktopLinks = navLinks.filter((link) => link.name !== 'Home');
  const visibleDesktopLinks = desktopLinks.slice(0, 6);
  const overflowDesktopLinks = desktopLinks.slice(6);

  return (
    <nav
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300 px-6 py-4',
        isScrolled ? 'glass nav-surface py-3' : 'bg-transparent'
      )}
    >
      <div className="flex w-full items-center justify-between">
        <motion.a
          href="#home"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="icon-well flex h-10 w-10 items-center justify-center rounded-lg bg-neon-cyan/20 dark:bg-neon-cyan/20 text-neon-cyan dark:text-neon-cyan">
            <Terminal size={24} />
          </div>
          <span
            className="theme-text-primary font-display text-xl font-bold tracking-tighter uppercase text-slate-900 dark:text-white transition-colors duration-[3200ms] ease-in-out"
            style={{ color: 'var(--theme-brand-color)' }}
          >
            inventyfie<span style={{ color: 'var(--theme-brand-color)' }}>.</span>
          </span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-end">
          <div className="mr-4 flex items-center gap-5 lg:gap-6">
            {visibleDesktopLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="nav-text theme-link-hover text-sm font-medium text-slate-700 dark:text-white/70"
              >
                {link.name}
              </a>
            ))}

            {overflowDesktopLinks.length > 0 ? (
              <div ref={moreMenuRef} className="relative">
                <button
                  onClick={() => setIsMoreMenuOpen((prev) => !prev)}
                  className="nav-text theme-link-hover inline-flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-white/70"
                >
                  More
                  <ChevronDown size={14} className={cn('transition-transform', isMoreMenuOpen && 'rotate-180')} />
                </button>

                {isMoreMenuOpen ? (
                  <div className="glass nav-surface absolute right-0 top-8 z-50 min-w-[180px] rounded-2xl border border-white/10 p-2">
                    {overflowDesktopLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMoreMenuOpen(false)}
                        className="nav-text theme-link-hover block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 dark:text-white/70 hover:bg-white/10 dark:hover:bg-white/10"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
          <div className="relative flex items-center gap-3 justify-end">
            <MascotWatcher />
            <motion.a
              href={primaryAction.href}
              whileTap={{ scale: 0.98 }}
              className="accent-button h-10 w-[124px] rounded-full px-6 py-2 text-sm font-bold text-white transition-all duration-[3200ms] ease-in-out hover:brightness-110"
              style={{
                backgroundImage: 'linear-gradient(120deg, var(--theme-button-from), var(--theme-button-to))',
                boxShadow: '0 0 18px var(--theme-button-glow)',
              }}
            >
              {primaryAction.label}
            </motion.a>
            <div className="relative h-8 w-[152px] shrink-0">
              <AnimatePresence mode="sync">
                <motion.button
                  key={`navbar-theme-chip-${theme.id}`}
                  onClick={handleThemeChipClick}
                  initial={{ opacity: 0, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(3px)' }}
                  transition={{ duration: 2.2, ease: 'easeInOut' }}
                  className="absolute inset-0 flex items-center justify-center whitespace-nowrap rounded-full border border-white/25 bg-black/35 px-3 py-1 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-white/90 shadow-[0_8px_28px_rgba(0,0,0,0.3)] backdrop-blur-md transition-colors hover:border-white/50"
                >
                  {theme.label}
                </motion.button>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="nav-text md:hidden text-white dark:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-0 top-full w-full glass nav-surface p-6 md:hidden"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="nav-text text-lg font-medium text-slate-700 dark:text-white/70"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="flex items-end justify-between gap-4">
              <MascotWatcher />
              <button
                onClick={() => {
                  window.location.hash = primaryAction.href;
                  setIsMobileMenuOpen(false);
                }}
                className="accent-button w-full rounded-xl py-3 font-bold text-white transition-all duration-[3200ms] ease-in-out"
                style={{
                  backgroundImage: 'linear-gradient(120deg, var(--theme-button-from), var(--theme-button-to))',
                  boxShadow: '0 0 16px var(--theme-button-glow)',
                }}
              >
                {primaryAction.label}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};
