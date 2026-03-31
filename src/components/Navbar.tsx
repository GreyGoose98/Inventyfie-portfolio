import { motion } from 'motion/react';
import { Terminal, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Neural Academy', href: '#academy' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300 px-6 py-4',
        isScrolled ? 'glass py-3' : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neon-cyan/20 dark:bg-neon-cyan/20 text-neon-cyan dark:text-neon-cyan">
            <Terminal size={24} />
          </div>
          <span className="font-display text-xl font-bold tracking-tighter uppercase text-slate-900 dark:text-white">
            inventyfie<span className="text-neon-cyan dark:text-neon-cyan">.</span>
          </span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-700 dark:text-white/70 transition-colors hover:text-neon-cyan dark:hover:text-neon-cyan"
            >
              {link.name}
            </a>
          ))}
          <ThemeSwitcher />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-neon-cyan px-6 py-2 text-sm font-bold text-obsidian shadow-[0_0_15px_rgba(0,242,255,0.4)] transition-all hover:shadow-[0_0_25px_rgba(0,242,255,0.6)]"
          >
            Hire Me
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white dark:text-white"
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
          className="absolute left-0 top-full w-full glass p-6 md:hidden"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-slate-700 dark:text-white/70"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="w-full rounded-xl bg-neon-cyan py-3 font-bold text-obsidian dark:text-obsidian">
              Hire Me
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};
