import { ChangeEventHandler, useMemo, useState } from 'react';
import { CmsEntry, ContentMetadata } from '../data/platformContent';
import { MarkdownRenderer } from './MarkdownRenderer';
import { MetadataStrip } from './MetadataStrip';

type CmsContentType = CmsEntry['contentType'];

interface AdminPanelProps {
  entries: CmsEntry[];
  onSave: (entry: CmsEntry) => void;
  onDelete: (id: string) => void;
}

const EMPTY_METADATA: ContentMetadata = {
  difficulty: 'Intermediate',
  industry: 'Cross-Industry',
  technology: ['Generative AI'],
  estimatedReadingTime: 8,
  businessDomain: 'Applied AI',
  researchStatus: 'Draft',
  updatedDate: new Date().toISOString().slice(0, 10),
  author: 'Inventyfie Research Lab',
  version: '1.0.0',
  tags: ['Draft'],
};

export const AdminPanel = ({ entries, onSave, onDelete }: AdminPanelProps) => {
  const [contentType, setContentType] = useState<CmsContentType>('Article');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [summary, setSummary] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [metadata, setMetadata] = useState<ContentMetadata>(EMPTY_METADATA);

  const previewEntry = useMemo(
    () => ({
      id: 'preview',
      contentType,
      title,
      slug,
      summary,
      markdown,
      metadata,
      createdAt: new Date().toISOString(),
    }),
    [contentType, markdown, metadata, slug, summary, title],
  );

  const updateMetadata = <K extends keyof ContentMetadata>(key: K, value: ContentMetadata[K]) => {
    setMetadata((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      setMarkdown((prev) => `${prev}\n\n![${file.name}](${result})`);
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const handleSave = () => {
    if (!title.trim() || !slug.trim()) {
      return;
    }

    const entry: CmsEntry = {
      id: `${Date.now()}`,
      contentType,
      title: title.trim(),
      slug: slug.trim().toLowerCase(),
      summary: summary.trim(),
      markdown,
      metadata: {
        ...metadata,
        technology: metadata.technology.filter(Boolean),
        tags: metadata.tags.filter(Boolean),
      },
      createdAt: new Date().toISOString(),
    };

    onSave(entry);
    setTitle('');
    setSlug('');
    setSummary('');
    setMarkdown('');
    setMetadata({
      ...EMPTY_METADATA,
      updatedDate: new Date().toISOString().slice(0, 10),
    });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
      <div className="glass section-panel rounded-3xl border border-white/10 p-6">
        <h3 className="mb-4 font-display text-2xl font-bold text-slate-900 dark:text-white">Admin Panel · Content Studio</h3>
        <p className="mb-6 text-sm text-slate-700 dark:text-white/65">
          Create and publish markdown-first research, projects, resources, and benchmarks without modifying source files.
        </p>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-white/50">
            Content Type
            <select
              value={contentType}
              onChange={(event) => setContentType(event.target.value as CmsContentType)}
              className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm normal-case text-slate-900 focus:outline-none dark:text-white"
            >
              {(['Article', 'Research', 'Case Study', 'Project', 'Resource', 'Benchmark'] as CmsContentType[]).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-white/50">
            Difficulty
            <select
              value={metadata.difficulty}
              onChange={(event) => updateMetadata('difficulty', event.target.value as ContentMetadata['difficulty'])}
              className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm normal-case text-slate-900 focus:outline-none dark:text-white"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </label>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Title"
            className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none dark:text-white dark:placeholder:text-white/45"
          />
          <input
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
            placeholder="Slug"
            className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none dark:text-white dark:placeholder:text-white/45"
          />
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <input
            value={metadata.industry}
            onChange={(event) => updateMetadata('industry', event.target.value)}
            placeholder="Industry"
            className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none dark:text-white dark:placeholder:text-white/45"
          />
          <input
            value={metadata.businessDomain}
            onChange={(event) => updateMetadata('businessDomain', event.target.value)}
            placeholder="Business Domain"
            className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none dark:text-white dark:placeholder:text-white/45"
          />
          <input
            value={metadata.technology.join(', ')}
            onChange={(event) => updateMetadata('technology', event.target.value.split(',').map((item) => item.trim()))}
            placeholder="Technology (comma-separated)"
            className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none dark:text-white dark:placeholder:text-white/45"
          />
          <input
            value={metadata.tags.join(', ')}
            onChange={(event) => updateMetadata('tags', event.target.value.split(',').map((item) => item.trim()))}
            placeholder="Tags (comma-separated)"
            className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none dark:text-white dark:placeholder:text-white/45"
          />
          <input
            value={metadata.updatedDate}
            onChange={(event) => updateMetadata('updatedDate', event.target.value)}
            placeholder="Updated Date"
            className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none dark:text-white dark:placeholder:text-white/45"
          />
          <input
            value={metadata.version}
            onChange={(event) => updateMetadata('version', event.target.value)}
            placeholder="Version"
            className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none dark:text-white dark:placeholder:text-white/45"
          />
          <input
            type="number"
            value={metadata.estimatedReadingTime}
            onChange={(event) => updateMetadata('estimatedReadingTime', Number(event.target.value || 0))}
            placeholder="Estimated Reading Time"
            className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none dark:text-white dark:placeholder:text-white/45"
          />
          <select
            value={metadata.researchStatus}
            onChange={(event) => updateMetadata('researchStatus', event.target.value as ContentMetadata['researchStatus'])}
            className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-900 focus:outline-none dark:text-white"
          >
            <option value="Draft">Draft</option>
            <option value="In Progress">In Progress</option>
            <option value="Published">Published</option>
            <option value="Archived">Archived</option>
          </select>
        </div>

        <textarea
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
          placeholder="Executive summary"
          className="mt-3 min-h-[90px] w-full rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none dark:text-white dark:placeholder:text-white/45"
        />

        <textarea
          value={markdown}
          onChange={(event) => setMarkdown(event.target.value)}
          placeholder={'Markdown content (supports headings, lists, links, images, code snippets, and mermaid blocks)'}
          className="mt-3 min-h-[220px] w-full rounded-xl border border-white/10 bg-black/20 px-3 py-3 font-mono text-xs text-slate-900 placeholder:text-slate-500 focus:outline-none dark:text-white dark:placeholder:text-white/45"
        />

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <label className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700 dark:text-white/70">
            Upload image
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
          <button
            type="button"
            onClick={() =>
              setMarkdown((prev) => `${prev}\n\n\`\`\`mermaid\nflowchart LR\n  A[Business Problem] --> B[Decision Framework]\n  B --> C[Recommendation]\n\`\`\``)
            }
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700 dark:text-white/70"
          >
            Insert diagram block
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="accent-button rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white"
            style={{
              backgroundImage: 'linear-gradient(120deg, var(--theme-button-from), var(--theme-button-to))',
            }}
          >
            Publish Entry
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="glass section-panel rounded-3xl border border-white/10 p-6">
          <h4 className="mb-3 font-display text-xl font-semibold text-slate-900 dark:text-white">Live Preview</h4>
          <p className="mb-4 text-sm text-slate-700 dark:text-white/65">{previewEntry.summary || 'Summary preview appears here.'}</p>
          <MetadataStrip metadata={previewEntry.metadata} />
          <div className="mt-4">
            <MarkdownRenderer content={previewEntry.markdown || '### No markdown yet'} />
          </div>
        </div>

        <div className="glass section-panel rounded-3xl border border-white/10 p-6">
          <h4 className="mb-4 font-display text-xl font-semibold text-slate-900 dark:text-white">Published Entries</h4>
          <div className="space-y-3">
            {entries.length === 0 ? (
              <p className="text-sm text-slate-700 dark:text-white/60">No CMS entries yet.</p>
            ) : (
              entries.map((entry) => (
                <article key={entry.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-[10px] uppercase tracking-[0.16em] text-neon-cyan">{entry.contentType}</span>
                    <button
                      type="button"
                      onClick={() => onDelete(entry.id)}
                      className="text-xs text-rose-300 hover:text-rose-200"
                    >
                      Delete
                    </button>
                  </div>
                  <h5 className="font-display text-lg font-semibold text-slate-900 dark:text-white">{entry.title}</h5>
                  <p className="mt-1 text-sm text-slate-700 dark:text-white/65">{entry.summary}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-white/45">/{entry.slug}</p>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
