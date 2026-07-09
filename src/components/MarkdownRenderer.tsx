import { Fragment, ReactElement } from 'react';

interface MarkdownRendererProps {
  content: string;
}

const isOrderedList = (line: string) => /^\d+\.\s+/.test(line);

export const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  const lines = content.split('\n');
  const nodes: ReactElement[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trimEnd();

    if (!line.trim()) {
      i += 1;
      continue;
    }

    if (line.startsWith('```')) {
      const language = line.replace('```', '').trim();
      i += 1;
      const codeLines: string[] = [];
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i += 1;
      }
      i += 1;
      nodes.push(
        <pre key={`code-${i}`} className="overflow-x-auto rounded-2xl border border-white/10 bg-black/35 p-4 text-xs text-white/85">
          <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/45">{language || 'code'}</span>
          <code>{codeLines.join('\n')}</code>
        </pre>,
      );
      continue;
    }

    if (line.startsWith('### ')) {
      nodes.push(
        <h4 key={`h3-${i}`} className="mt-5 font-display text-xl font-semibold text-slate-900 dark:text-white">
          {line.slice(4)}
        </h4>,
      );
      i += 1;
      continue;
    }

    if (line.startsWith('## ')) {
      nodes.push(
        <h3 key={`h2-${i}`} className="mt-6 font-display text-2xl font-semibold text-slate-900 dark:text-white">
          {line.slice(3)}
        </h3>,
      );
      i += 1;
      continue;
    }

    if (line.startsWith('# ')) {
      nodes.push(
        <h2 key={`h1-${i}`} className="mt-6 font-display text-3xl font-bold text-slate-900 dark:text-white">
          {line.slice(2)}
        </h2>,
      );
      i += 1;
      continue;
    }

    if (line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trimStart().startsWith('- ')) {
        items.push(lines[i].trimStart().slice(2));
        i += 1;
      }
      nodes.push(
        <ul key={`ul-${i}`} className="list-disc space-y-1 pl-5 text-slate-700 dark:text-white/70">
          {items.map((item, idx) => (
            <li key={`${idx}-${item}`}>{item}</li>
          ))}
        </ul>,
      );
      continue;
    }

    if (isOrderedList(line)) {
      const items: string[] = [];
      while (i < lines.length && isOrderedList(lines[i].trimStart())) {
        items.push(lines[i].trimStart().replace(/^\d+\.\s+/, ''));
        i += 1;
      }
      nodes.push(
        <ol key={`ol-${i}`} className="list-decimal space-y-1 pl-5 text-slate-700 dark:text-white/70">
          {items.map((item, idx) => (
            <li key={`${idx}-${item}`}>{item}</li>
          ))}
        </ol>,
      );
      continue;
    }

    const imageMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imageMatch) {
      nodes.push(
        <figure key={`img-${i}`} className="overflow-hidden rounded-2xl border border-white/10">
          <img src={imageMatch[2]} alt={imageMatch[1]} className="max-h-[420px] w-full object-cover" loading="lazy" />
          {imageMatch[1] ? (
            <figcaption className="px-3 py-2 text-xs text-slate-500 dark:text-white/45">{imageMatch[1]}</figcaption>
          ) : null}
        </figure>,
      );
      i += 1;
      continue;
    }

    const parts = line.split(/(\[[^\]]+\]\([^\)]+\))/g).filter(Boolean);
    nodes.push(
      <p key={`p-${i}`} className="leading-relaxed text-slate-700 dark:text-white/70">
        {parts.map((part, idx) => {
          const link = part.match(/^\[([^\]]+)\]\(([^\)]+)\)$/);
          if (!link) {
            return <Fragment key={`${idx}-${part}`}>{part}</Fragment>;
          }
          return (
            <a
              key={`${idx}-${part}`}
              href={link[2]}
              target="_blank"
              rel="noreferrer"
              className="text-neon-cyan hover:underline"
            >
              {link[1]}
            </a>
          );
        })}
      </p>,
    );
    i += 1;
  }

  return <div className="space-y-3">{nodes}</div>;
};
