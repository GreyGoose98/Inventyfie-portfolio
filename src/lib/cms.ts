import { CmsEntry } from '../data/platformContent';

const CMS_STORAGE_KEY = 'inventyfie.cms.entries.v1';

export const loadCmsEntries = (): CmsEntry[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(CMS_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as CmsEntry[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch {
    return [];
  }
};

export const saveCmsEntries = (entries: CmsEntry[]) => {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(entries));
};
