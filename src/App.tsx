/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { 
  ArrowRight, 
  Cpu, 
  Brain, 
  Zap, 
  Mail, 
  Linkedin, 
  Twitter, 
  Github,
  ChevronDown 
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Section } from './components/Section';
import { ProjectCard, Project } from './components/ProjectCard';
import { AcademyCard, AcademyTopic } from './components/AcademyCard';
import { ThemeProvider } from './contexts/ThemeContext';
import { cn } from './lib/utils';

type BackgroundTheme = {
  id: string;
  label: string;
  brandColor: string;
  buttonFrom: string;
  buttonTo: string;
  buttonGlow: string;
  highlightColor: string;
  backdrop: string;
  overlay: string;
  spark: string;
  orbA: string;
  orbB: string;
  gridOpacity: number;
};

const BACKGROUND_THEMES: BackgroundTheme[] = [
  {
    id: 'dynamic-orbit',
    label: 'Dynamic Orbit',
    brandColor: '#53eebe',
    buttonFrom: '#53eebe',
    buttonTo: '#ff7c6c',
    buttonGlow: 'rgba(83, 238, 190, 0.46)',
    highlightColor: '#53eebe',
    backdrop: 'radial-gradient(circle at 18% 14%, #071b2d 0%, #05070f 54%, #030409 100%)',
    overlay: 'radial-gradient(circle at 74% 26%, rgba(78, 255, 212, 0.2) 0%, rgba(78, 255, 212, 0) 55%), radial-gradient(circle at 24% 78%, rgba(255, 141, 112, 0.2) 0%, rgba(255, 141, 112, 0) 58%)',
    spark: 'radial-gradient(circle at 52% 48%, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0) 58%)',
    orbA: 'radial-gradient(circle, rgba(83, 238, 190, 0.48) 0%, rgba(83, 238, 190, 0.2) 40%, rgba(83, 238, 190, 0) 75%)',
    orbB: 'radial-gradient(circle, rgba(255, 124, 108, 0.45) 0%, rgba(255, 124, 108, 0.19) 40%, rgba(255, 124, 108, 0) 75%)',
    gridOpacity: 0.22,
  },
  {
    id: 'galaxy',
    label: 'Galaxy',
    brandColor: '#af78ff',
    buttonFrom: '#af78ff',
    buttonTo: '#57b2ff',
    buttonGlow: 'rgba(175, 120, 255, 0.44)',
    highlightColor: '#af78ff',
    backdrop: 'radial-gradient(circle at 20% 20%, #2c0f4f 0%, #0c1027 45%, #02030a 100%)',
    overlay: 'radial-gradient(circle at 72% 22%, rgba(161, 97, 255, 0.34) 0%, rgba(161, 97, 255, 0) 56%), radial-gradient(circle at 26% 76%, rgba(88, 166, 255, 0.24) 0%, rgba(88, 166, 255, 0) 56%)',
    spark: 'radial-gradient(circle at 65% 18%, rgba(255, 244, 220, 0.3) 0%, rgba(255, 244, 220, 0) 26%), radial-gradient(circle at 40% 66%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 32%)',
    orbA: 'radial-gradient(circle, rgba(175, 120, 255, 0.54) 0%, rgba(175, 120, 255, 0.2) 38%, rgba(175, 120, 255, 0) 76%)',
    orbB: 'radial-gradient(circle, rgba(87, 178, 255, 0.48) 0%, rgba(87, 178, 255, 0.16) 38%, rgba(87, 178, 255, 0) 76%)',
    gridOpacity: 0.17,
  },
  {
    id: 'solar',
    label: 'Solar',
    brandColor: '#ffce5e',
    buttonFrom: '#ffce5e',
    buttonTo: '#ff624e',
    buttonGlow: 'rgba(255, 206, 94, 0.44)',
    highlightColor: '#ffce5e',
    backdrop: 'radial-gradient(circle at 28% 18%, #5d2600 0%, #2b1300 30%, #090909 78%, #030303 100%)',
    overlay: 'radial-gradient(circle at 74% 24%, rgba(255, 208, 106, 0.35) 0%, rgba(255, 208, 106, 0) 58%), radial-gradient(circle at 20% 78%, rgba(255, 98, 69, 0.25) 0%, rgba(255, 98, 69, 0) 58%)',
    spark: 'radial-gradient(circle at 36% 24%, rgba(255, 240, 181, 0.25) 0%, rgba(255, 240, 181, 0) 24%)',
    orbA: 'radial-gradient(circle, rgba(255, 206, 94, 0.58) 0%, rgba(255, 206, 94, 0.25) 40%, rgba(255, 206, 94, 0) 78%)',
    orbB: 'radial-gradient(circle, rgba(255, 98, 78, 0.5) 0%, rgba(255, 98, 78, 0.21) 40%, rgba(255, 98, 78, 0) 78%)',
    gridOpacity: 0.2,
  },
  {
    id: 'aurora',
    label: 'Aurora',
    brandColor: '#60fcd8',
    buttonFrom: '#60fcd8',
    buttonTo: '#6d81ff',
    buttonGlow: 'rgba(96, 252, 216, 0.42)',
    highlightColor: '#60fcd8',
    backdrop: 'radial-gradient(circle at 50% 10%, #07313a 0%, #061620 45%, #03060c 100%)',
    overlay: 'radial-gradient(circle at 76% 16%, rgba(64, 255, 207, 0.22) 0%, rgba(64, 255, 207, 0) 60%), radial-gradient(circle at 24% 78%, rgba(82, 122, 255, 0.18) 0%, rgba(82, 122, 255, 0) 60%)',
    spark: 'radial-gradient(circle at 52% 20%, rgba(216, 255, 252, 0.14) 0%, rgba(216, 255, 252, 0) 32%)',
    orbA: 'radial-gradient(circle, rgba(96, 252, 216, 0.54) 0%, rgba(96, 252, 216, 0.2) 38%, rgba(96, 252, 216, 0) 76%)',
    orbB: 'radial-gradient(circle, rgba(109, 129, 255, 0.46) 0%, rgba(109, 129, 255, 0.18) 38%, rgba(109, 129, 255, 0) 76%)',
    gridOpacity: 0.16,
  },
  {
    id: 'nebula',
    label: 'Nebula',
    brandColor: '#ff83d6',
    buttonFrom: '#ff83d6',
    buttonTo: '#857cff',
    buttonGlow: 'rgba(255, 131, 214, 0.42)',
    highlightColor: '#ff83d6',
    backdrop: 'radial-gradient(circle at 76% 18%, #31104a 0%, #170c2b 34%, #070712 78%, #020206 100%)',
    overlay: 'radial-gradient(circle at 22% 20%, rgba(255, 139, 207, 0.24) 0%, rgba(255, 139, 207, 0) 54%), radial-gradient(circle at 72% 78%, rgba(136, 126, 255, 0.24) 0%, rgba(136, 126, 255, 0) 56%)',
    spark: 'radial-gradient(circle at 58% 52%, rgba(255, 235, 255, 0.14) 0%, rgba(255, 235, 255, 0) 30%)',
    orbA: 'radial-gradient(circle, rgba(255, 131, 214, 0.52) 0%, rgba(255, 131, 214, 0.2) 40%, rgba(255, 131, 214, 0) 78%)',
    orbB: 'radial-gradient(circle, rgba(133, 124, 255, 0.5) 0%, rgba(133, 124, 255, 0.18) 40%, rgba(133, 124, 255, 0) 78%)',
    gridOpacity: 0.16,
  },
  {
    id: 'eclipse',
    label: 'Eclipse',
    brandColor: '#ffb05d',
    buttonFrom: '#588fff',
    buttonTo: '#ffb05d',
    buttonGlow: 'rgba(255, 176, 93, 0.4)',
    highlightColor: '#ffb05d',
    backdrop: 'radial-gradient(circle at 52% 26%, #111827 0%, #06070f 45%, #010102 100%)',
    overlay: 'radial-gradient(circle at 54% 28%, rgba(255, 184, 110, 0.16) 0%, rgba(255, 184, 110, 0) 42%), radial-gradient(circle at 24% 74%, rgba(73, 126, 255, 0.2) 0%, rgba(73, 126, 255, 0) 56%)',
    spark: 'radial-gradient(circle at 49% 24%, rgba(255, 233, 191, 0.17) 0%, rgba(255, 233, 191, 0) 24%)',
    orbA: 'radial-gradient(circle, rgba(88, 143, 255, 0.5) 0%, rgba(88, 143, 255, 0.2) 40%, rgba(88, 143, 255, 0) 78%)',
    orbB: 'radial-gradient(circle, rgba(255, 176, 93, 0.48) 0%, rgba(255, 176, 93, 0.19) 40%, rgba(255, 176, 93, 0) 78%)',
    gridOpacity: 0.14,
  },
  {
    id: 'lunar',
    label: 'Lunar',
    brandColor: '#9ec5ff',
    buttonFrom: '#9ec5ff',
    buttonTo: '#d8ddff',
    buttonGlow: 'rgba(158, 197, 255, 0.38)',
    highlightColor: '#9ec5ff',
    backdrop: 'radial-gradient(circle at 38% 12%, #1b2238 0%, #090b14 50%, #020306 100%)',
    overlay: 'radial-gradient(circle at 78% 24%, rgba(210, 220, 255, 0.22) 0%, rgba(210, 220, 255, 0) 54%), radial-gradient(circle at 18% 72%, rgba(126, 162, 255, 0.2) 0%, rgba(126, 162, 255, 0) 58%)',
    spark: 'radial-gradient(circle at 60% 28%, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0) 28%)',
    orbA: 'radial-gradient(circle, rgba(158, 197, 255, 0.48) 0%, rgba(158, 197, 255, 0.2) 40%, rgba(158, 197, 255, 0) 78%)',
    orbB: 'radial-gradient(circle, rgba(216, 221, 255, 0.44) 0%, rgba(216, 221, 255, 0.16) 40%, rgba(216, 221, 255, 0) 78%)',
    gridOpacity: 0.15,
  },
  {
    id: 'prism',
    label: 'Prism',
    brandColor: '#6fffd7',
    buttonFrom: '#6fffd7',
    buttonTo: '#ff7fd4',
    buttonGlow: 'rgba(111, 255, 215, 0.4)',
    highlightColor: '#6fffd7',
    backdrop: 'radial-gradient(circle at 14% 16%, #12304a 0%, #0a1025 45%, #04040a 100%)',
    overlay: 'radial-gradient(circle at 72% 20%, rgba(111, 255, 215, 0.2) 0%, rgba(111, 255, 215, 0) 58%), radial-gradient(circle at 26% 76%, rgba(255, 127, 212, 0.24) 0%, rgba(255, 127, 212, 0) 56%)',
    spark: 'radial-gradient(circle at 52% 38%, rgba(255, 241, 255, 0.14) 0%, rgba(255, 241, 255, 0) 30%)',
    orbA: 'radial-gradient(circle, rgba(111, 255, 215, 0.54) 0%, rgba(111, 255, 215, 0.2) 40%, rgba(111, 255, 215, 0) 78%)',
    orbB: 'radial-gradient(circle, rgba(255, 127, 212, 0.5) 0%, rgba(255, 127, 212, 0.18) 40%, rgba(255, 127, 212, 0) 78%)',
    gridOpacity: 0.18,
  },
  {
    id: 'abyss',
    label: 'Abyss',
    brandColor: '#36d4ff',
    buttonFrom: '#36d4ff',
    buttonTo: '#1f7dff',
    buttonGlow: 'rgba(54, 212, 255, 0.42)',
    highlightColor: '#36d4ff',
    backdrop: 'radial-gradient(circle at 50% 6%, #052437 0%, #04101a 42%, #010205 100%)',
    overlay: 'radial-gradient(circle at 80% 22%, rgba(54, 212, 255, 0.22) 0%, rgba(54, 212, 255, 0) 56%), radial-gradient(circle at 18% 82%, rgba(31, 125, 255, 0.22) 0%, rgba(31, 125, 255, 0) 58%)',
    spark: 'radial-gradient(circle at 46% 34%, rgba(185, 235, 255, 0.12) 0%, rgba(185, 235, 255, 0) 28%)',
    orbA: 'radial-gradient(circle, rgba(54, 212, 255, 0.52) 0%, rgba(54, 212, 255, 0.2) 40%, rgba(54, 212, 255, 0) 78%)',
    orbB: 'radial-gradient(circle, rgba(31, 125, 255, 0.48) 0%, rgba(31, 125, 255, 0.18) 40%, rgba(31, 125, 255, 0) 78%)',
    gridOpacity: 0.16,
  },
];

const PROJECTS: Project[] = [
  {
    title: "NeuralVision AI",
    description: "Real-time object detection and behavioral analysis system for industrial safety monitoring.",
    tags: ["PyTorch", "Computer Vision", "Edge Computing"],
    icon: "cpu",
    image: "https://picsum.photos/seed/ai1/800/600"
  },
  {
    title: "Linguist Pro",
    description: "Next-gen NLP engine optimized for low-latency multilingual translation and sentiment analysis.",
    tags: ["Transformers", "FastAPI", "Redis"],
    icon: "brain",
    image: "https://picsum.photos/seed/ai2/800/600"
  },
  {
    title: "QuantumPredict",
    description: "Financial market prediction model using hybrid classical-quantum machine learning algorithms.",
    tags: ["TensorFlow", "Quantum Computing", "Finance"],
    icon: "zap",
    image: "https://picsum.photos/seed/ai3/800/600"
  }
];

const ACADEMY_TOPICS: AcademyTopic[] = [
  {
    id: "llm-fundamentals",
    title: "LLM Fundamentals",
    description: "Master the core concepts of Large Language Models, from transformer architecture to fine-tuning techniques.",
    category: "Machine Learning",
    difficulty: "Beginner",
    readTime: 12
  },
  {
    id: "computer-vision",
    title: "Computer Vision Essentials",
    description: "Learn image processing, CNNs, and real-world applications of computer vision in production systems.",
    category: "AI & Deep Learning",
    difficulty: "Intermediate",
    readTime: 18
  },
  {
    id: "prompt-engineering",
    title: "Advanced Prompt Engineering",
    description: "Techniques to optimize LLM outputs, chain-of-thought prompting, and building intelligent agents.",
    category: "AI Operations",
    difficulty: "Intermediate",
    readTime: 15
  },
  {
    id: "rag-systems",
    title: "Retrieval-Augmented Generation",
    description: "Build scalable RAG systems that combine retrieval and generation for domain-specific AI solutions.",
    category: "Advanced AI",
    difficulty: "Advanced",
    readTime: 25
  },
  {
    id: "ml-deployment",
    title: "ML Model Deployment & Scaling",
    description: "Production-ready deployment strategies, containerization, and scaling ML models at enterprise level.",
    category: "DevOps & Infrastructure",
    difficulty: "Advanced",
    readTime: 20
  },
  {
    id: "data-engineering",
    title: "Data Pipelines for AI",
    description: "Design and implement robust data engineering pipelines that power modern AI applications.",
    category: "Data Engineering",
    difficulty: "Intermediate",
    readTime: 16
  }
];

export default function App() {
  const [backgroundThemeIndex, setBackgroundThemeIndex] = useState(0);

  const chooseRandomThemeIndex = useCallback((current: number) => {
    if (BACKGROUND_THEMES.length < 2) {
      return current;
    }

    let next = current;
    while (next === current) {
      next = Math.floor(Math.random() * BACKGROUND_THEMES.length);
    }
    return next;
  }, []);

  const randomizeTheme = useCallback(() => {
    setBackgroundThemeIndex((prev) => chooseRandomThemeIndex(prev));
  }, [chooseRandomThemeIndex]);

  useEffect(() => {
    let cycleTimer = 0;

    const scheduleNextTheme = () => {
      const nextInMs = 10000 + Math.random() * 9000;
      cycleTimer = window.setTimeout(() => {
        setBackgroundThemeIndex((prev) => chooseRandomThemeIndex(prev));

        scheduleNextTheme();
      }, nextInMs);
    };

    scheduleNextTheme();

    return () => {
      window.clearTimeout(cycleTimer);
    };
  }, [chooseRandomThemeIndex]);

  const activeBackgroundTheme = BACKGROUND_THEMES[backgroundThemeIndex] ?? BACKGROUND_THEMES[0];

  return (
    <ThemeProvider>
      <motion.div
        className="relative min-h-screen overflow-x-hidden"
        animate={
          {
            '--theme-brand-color': activeBackgroundTheme.brandColor,
            '--theme-button-from': activeBackgroundTheme.buttonFrom,
            '--theme-button-to': activeBackgroundTheme.buttonTo,
            '--theme-button-glow': activeBackgroundTheme.buttonGlow,
            '--theme-highlight-color': activeBackgroundTheme.highlightColor,
          } as any
        }
        transition={{ duration: 3.2, ease: 'easeInOut' }}
      >
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={`theme-backdrop-${activeBackgroundTheme.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.8, ease: 'easeInOut' }}
            className="absolute inset-0"
            style={{ background: activeBackgroundTheme.backdrop }}
          />
        </AnimatePresence>

        <AnimatePresence mode="sync">
          <motion.div
            key={`theme-overlay-${activeBackgroundTheme.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3.2, ease: 'easeInOut' }}
            className="absolute inset-0"
            style={{ background: activeBackgroundTheme.overlay, mixBlendMode: 'screen' }}
          />
        </AnimatePresence>

        <motion.div
          className="neural-grid absolute inset-0"
          animate={{ opacity: activeBackgroundTheme.gridOpacity }}
          transition={{ duration: 2.6, ease: 'easeInOut' }}
        />

        <AnimatePresence mode="sync">
          <motion.div
            key={`theme-orbits-${activeBackgroundTheme.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.8, ease: 'easeInOut' }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="orb-orbit absolute inset-[-18%]">
              <div
                className="orb-theme-blob absolute left-1/2 top-[3%] h-[72%] w-[72%] -translate-x-1/2 rounded-full blur-[112px]"
                style={{ background: activeBackgroundTheme.orbA }}
              />
            </div>
            <div className="orb-orbit orb-orbit-opposite absolute inset-[-18%]">
              <div
                className="orb-theme-blob absolute left-1/2 top-[3%] h-[72%] w-[72%] -translate-x-1/2 rounded-full blur-[112px]"
                style={{ background: activeBackgroundTheme.orbB }}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="sync">
          <motion.div
            key={`theme-spark-${activeBackgroundTheme.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3.4, ease: 'easeInOut' }}
            className="absolute inset-0 pointer-events-none"
            style={{ background: activeBackgroundTheme.spark }}
          />
        </AnimatePresence>

      </div>

      <Navbar
        theme={
          {
            id: activeBackgroundTheme.id,
            label: activeBackgroundTheme.label,
          }
        }
        onThemeChipClick={randomizeTheme}
      />

      <main className="relative z-10">
        {/* Hero Section */}
        <section id="home" className="flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="eyebrow-badge mb-6 inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 dark:border-neon-cyan/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-neon-cyan dark:text-neon-cyan"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-cyan"></span>
            </span>
            Available for New Projects
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="hero-title theme-text-primary mb-6 font-display text-5xl font-bold leading-[1.1] tracking-tight text-slate-900 dark:text-white md:text-8xl"
          >
            Architecting the <br />
            <span className="text-gradient">Future of AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hero-copy theme-text-secondary mx-auto mb-10 max-w-2xl text-lg text-slate-600 dark:text-white/60 md:text-xl"
          >
            High-performance AI software solutions tailored for the next generation of digital innovation. From neural networks to quantum-ready architectures.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <button className="accent-button group flex items-center gap-2 rounded-full bg-neon-cyan text-obsidian px-8 py-4 font-bold transition-all hover:shadow-[0_0_30px_rgba(0,242,255,0.5)] dark:bg-neon-cyan dark:text-obsidian">
              View Projects
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button className="secondary-button rounded-full border border-neon-cyan/50 bg-neon-cyan/10 px-8 py-4 font-bold backdrop-blur-sm transition-all hover:bg-neon-cyan/20 dark:border-white/20 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10">
              Get in Touch
            </button>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 dark:text-white/30"
          >
            <ChevronDown size={32} />
          </motion.div>
        </section>

        {/* Projects Section */}
        <Section id="projects" className="py-24 px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center md:text-left">
              <h2 className="theme-text-primary mb-4 font-display text-4xl font-bold md:text-6xl text-slate-900 dark:text-white">Selected <span className="text-neon-cyan dark:text-neon-cyan">Works</span></h2>
              <p className="theme-text-secondary max-w-xl text-slate-600 dark:text-white/50">A showcase of cutting-edge AI implementations across various industries.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        </Section>

        {/* Services Section */}
        <Section id="services" className="section-panel py-24 px-6 bg-white/[0.02] dark:bg-white/[0.02]">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="theme-text-primary mb-4 font-display text-4xl font-bold md:text-6xl text-slate-900 dark:text-white">Core <span className="text-neon-purple dark:text-neon-purple">Capabilities</span></h2>
              <p className="theme-text-secondary mx-auto max-w-xl text-slate-600 dark:text-white/50">Specialized expertise in modern AI software development.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Machine Learning",
                  desc: "Custom model development, training, and optimization for specific business logic.",
                  icon: Brain,
                  color: "text-neon-cyan"
                },
                {
                  title: "AI Integration",
                  desc: "Seamlessly embedding LLMs and generative AI into existing software ecosystems.",
                  icon: Cpu,
                  color: "text-neon-purple"
                },
                {
                  title: "Data Engineering",
                  desc: "Scalable data pipelines and real-time processing for AI-ready infrastructure.",
                  icon: Zap,
                  color: "text-white dark:text-white"
                }
              ].map((service) => (
                <div key={service.title} className="glass rounded-3xl p-8 hover:bg-white/10 dark:hover:bg-white/10 transition-colors">
                  <service.icon className={cn("mb-6 h-12 w-12", service.color)} />
                  <h3 className="theme-text-primary mb-4 font-display text-2xl font-bold text-slate-900 dark:text-white">{service.title}</h3>
                  <p className="theme-text-secondary text-slate-600 dark:text-white/60 leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Neural Academy Section */}
        <Section id="academy" className="py-24 px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center md:text-left">
              <h2 className="theme-text-primary mb-4 font-display text-4xl font-bold md:text-6xl text-slate-900 dark:text-white">Neural <span className="text-neon-cyan dark:text-neon-cyan">Academy</span></h2>
              <p className="theme-text-secondary max-w-xl text-slate-600 dark:text-white/50">Comprehensive learning resources on AI, machine learning, and advanced software engineering practices. Level up your knowledge with curated educational content.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {ACADEMY_TOPICS.map((topic, index) => (
                <AcademyCard key={topic.id} topic={topic} index={index} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 flex justify-center"
            >
              <button className="group flex items-center gap-2 rounded-full border border-neon-cyan/50 dark:border-neon-cyan/50 bg-neon-cyan/10 dark:bg-neon-cyan/10 px-8 py-4 font-bold text-neon-cyan dark:text-neon-cyan transition-all hover:bg-neon-cyan hover:text-obsidian dark:hover:bg-neon-cyan dark:hover:text-obsidian hover:shadow-[0_0_30px_rgba(0,242,255,0.5)]">
                View All Topics
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>
        </Section>

        {/* Contact Section */}
        <Section id="contact" className="py-24 px-6">
          <div className="mx-auto max-w-4xl glass section-panel rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-neon-purple/20 dark:bg-neon-purple/20 blur-[100px]" />
            
            <h2 className="theme-text-primary mb-6 font-display text-4xl font-bold md:text-7xl text-slate-900 dark:text-white">Let's Build <br />Something <span className="text-neon-cyan dark:text-neon-cyan">Epic</span></h2>
            <p className="theme-text-secondary mb-12 text-slate-600 dark:text-white/60 text-lg">Ready to transform your vision into an AI-powered reality? Let's connect and discuss your next breakthrough.</p>
            
            <div className="flex flex-col items-center gap-8">
              <a 
                href="mailto:contact@inventyfie.com" 
                className="theme-text-primary group flex items-center gap-4 text-2xl font-bold text-slate-900 dark:text-white hover:text-neon-cyan transition-colors md:text-4xl"
              >
                <Mail size={32} />
                contact@inventyfie.com
              </a>

              <div className="flex gap-6">
                {[
                  { icon: Linkedin, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Github, href: "#" }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/60 hover:border-neon-cyan hover:text-neon-cyan dark:hover:border-neon-cyan dark:hover:text-neon-cyan transition-colors"
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </main>

      <footer className="theme-text-muted py-12 px-6 text-center text-slate-500 dark:text-white/30 border-t border-slate-300 dark:border-white/5">
        <p className="text-sm uppercase tracking-widest font-medium">
          © 2026 INVENTYFIE AI SOLUTIONS • INVENTYFIE.COM
        </p>
      </footer>
      </motion.div>
    </ThemeProvider>
  );
}
