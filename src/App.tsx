/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
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
  return (
    <ThemeProvider>
      <div className="relative min-h-screen overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="neural-grid absolute inset-0 opacity-20 dark:opacity-20" />
        <div className="absolute -left-[10%] -top-[10%] h-[50%] w-[50%] rounded-full bg-neon-cyan/10 dark:bg-neon-cyan/10 blur-[120px]" />
        <div className="absolute -right-[10%] bottom-[10%] h-[50%] w-[50%] rounded-full bg-neon-purple/10 dark:bg-neon-purple/10 blur-[120px]" />
      </div>

      <Navbar />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 dark:border-neon-cyan/30 bg-neon-cyan/5 dark:bg-neon-cyan/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-neon-cyan dark:text-neon-cyan"
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
            className="mb-6 font-display text-5xl font-bold leading-[1.1] tracking-tight text-slate-900 dark:text-white md:text-8xl"
          >
            Architecting the <br />
            <span className="text-gradient">Future of AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mx-auto mb-10 max-w-2xl text-lg text-slate-600 dark:text-white/60 md:text-xl"
          >
            High-performance AI software solutions tailored for the next generation of digital innovation. From neural networks to quantum-ready architectures.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <button className="group flex items-center gap-2 rounded-full bg-neon-cyan text-obsidian px-8 py-4 font-bold transition-all hover:shadow-[0_0_30px_rgba(0,242,255,0.5)] dark:bg-neon-cyan dark:text-obsidian">
              View Projects
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button className="rounded-full border border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan px-8 py-4 font-bold backdrop-blur-sm transition-all hover:bg-neon-cyan/20 dark:border-white/20 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10">
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
              <h2 className="mb-4 font-display text-4xl font-bold md:text-6xl text-slate-900 dark:text-white">Selected <span className="text-neon-cyan dark:text-neon-cyan">Works</span></h2>
              <p className="max-w-xl text-slate-600 dark:text-white/50">A showcase of cutting-edge AI implementations across various industries.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        </Section>

        {/* Services Section */}
        <Section id="services" className="py-24 px-6 bg-white/[0.02] dark:bg-white/[0.02]">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-display text-4xl font-bold md:text-6xl text-slate-900 dark:text-white">Core <span className="text-neon-purple dark:text-neon-purple">Capabilities</span></h2>
              <p className="mx-auto max-w-xl text-slate-600 dark:text-white/50">Specialized expertise in modern AI software development.</p>
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
                  <h3 className="mb-4 font-display text-2xl font-bold text-slate-900 dark:text-white">{service.title}</h3>
                  <p className="text-slate-600 dark:text-white/60 leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Neural Academy Section */}
        <Section id="academy" className="py-24 px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center md:text-left">
              <h2 className="mb-4 font-display text-4xl font-bold md:text-6xl text-slate-900 dark:text-white">Neural <span className="text-neon-cyan dark:text-neon-cyan">Academy</span></h2>
              <p className="max-w-xl text-slate-600 dark:text-white/50">Comprehensive learning resources on AI, machine learning, and advanced software engineering practices. Level up your knowledge with curated educational content.</p>
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
          <div className="mx-auto max-w-4xl glass rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-neon-purple/20 dark:bg-neon-purple/20 blur-[100px]" />
            
            <h2 className="mb-6 font-display text-4xl font-bold md:text-7xl text-slate-900 dark:text-white">Let's Build <br />Something <span className="text-neon-cyan dark:text-neon-cyan">Epic</span></h2>
            <p className="mb-12 text-slate-600 dark:text-white/60 text-lg">Ready to transform your vision into an AI-powered reality? Let's connect and discuss your next breakthrough.</p>
            
            <div className="flex flex-col items-center gap-8">
              <a 
                href="mailto:contact@inventyfie.com" 
                className="group flex items-center gap-4 text-2xl font-bold text-slate-900 dark:text-white hover:text-neon-cyan transition-colors md:text-4xl"
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

      <footer className="py-12 px-6 text-center text-slate-500 dark:text-white/30 border-t border-slate-300 dark:border-white/5">
        <p className="text-sm uppercase tracking-widest font-medium">
          © 2026 INVENTYFIE AI SOLUTIONS • INVENTYFIE.COM
        </p>
      </footer>
    </div>
    </ThemeProvider>
  );
}
