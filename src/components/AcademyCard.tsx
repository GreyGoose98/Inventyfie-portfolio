import { motion } from 'motion/react';
import { ArrowRight, Terminal } from 'lucide-react';
import { FC } from 'react';
import { cn } from '../lib/utils';

export interface AcademyTopic {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: number;
  icon?: string;
}

interface AcademyCardProps {
  topic: AcademyTopic;
  index: number;
}

export const AcademyCard: FC<AcademyCardProps> = ({ topic, index }) => {
  const difficultyColors = {
    'Beginner': 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30 dark:bg-neon-cyan/20 dark:text-neon-cyan dark:border-neon-cyan/30',
    'Intermediate': 'bg-neon-purple/20 text-neon-purple border-neon-purple/30 dark:bg-neon-purple/20 dark:text-neon-purple dark:border-neon-purple/30',
    'Advanced': 'bg-amber-500/20 text-amber-300 border-amber-500/30 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30'
  };

  return (
    <motion.a
      href={`#academy/${topic.id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group glass rounded-2xl p-8 h-full flex flex-col justify-between hover:bg-white/10 dark:hover:bg-white/10 transition-all cursor-pointer border border-white/5 dark:border-white/5 hover:border-neon-cyan/30 dark:hover:border-neon-cyan/30"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neon-cyan/10 dark:bg-neon-cyan/10 text-neon-cyan dark:text-neon-cyan">
          <Terminal size={24} />
        </div>
        <span className={cn(
          "px-3 py-1 rounded-full text-xs font-bold border",
          difficultyColors[topic.difficulty]
        )}>
          {topic.difficulty}
        </span>
      </div>

      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-white/50 mb-2 block">
          {topic.category}
        </span>
        <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-neon-cyan transition-colors">
          {topic.title}
        </h3>
        <p className="text-slate-600 dark:text-white/60 text-sm leading-relaxed">
          {topic.description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-slate-300 dark:border-white/5">
        <span className="text-xs text-slate-500 dark:text-white/40">
          {topic.readTime} min read
        </span>
        <ArrowRight 
          size={18} 
          className="text-slate-500 dark:text-white/40 group-hover:text-neon-cyan group-hover:translate-x-1 transition-all" 
        />
      </div>
    </motion.a>
  );
};
