import { motion } from 'motion/react';
import { ExternalLink, Github, Cpu, Brain, Zap } from 'lucide-react';

export interface Project {
  title: string;
  description: string;
  tags: string[];
  icon: 'cpu' | 'brain' | 'zap';
  image: string;
}

interface ProjectCardProps {
  project: Project;
  key?: string | number;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const Icon = {
    cpu: Cpu,
    brain: Brain,
    zap: Zap,
  }[project.icon];

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group theme-card-hover relative overflow-hidden rounded-2xl glass section-panel p-6 transition-all duration-500"
    >
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-neon-cyan/10 dark:bg-neon-cyan/10 blur-3xl transition-all group-hover:bg-neon-cyan/20 dark:group-hover:bg-neon-cyan/20" />
      
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <div className="icon-well rounded-lg bg-neon-cyan/10 dark:bg-neon-cyan/10 p-2 text-neon-cyan dark:text-neon-cyan">
            <Icon size={24} />
          </div>
          <div className="theme-text-secondary flex gap-3 text-slate-600 dark:text-white/50">
            <Github size={20} className="cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors" />
            <ExternalLink size={20} className="cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors" />
          </div>
        </div>

        <h3 className="theme-text-primary theme-title-hover mb-2 font-display text-xl font-bold text-slate-900 dark:text-white transition-colors">
          {project.title}
        </h3>
        <p className="theme-text-secondary mb-4 text-sm leading-relaxed text-slate-600 dark:text-white/60">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="tag-chip rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white/40"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
