import type { SORT_CATEGORY_OPTIONS, SORT_PRIORITY_OPTION } from '@/consts';

export interface Category {
  id: string;
  name: string;
  slug: string;
  noteCount: number;
  categoryColor: string;
  categoryNotes: Note[];
  createdAt: string;
  updatedAt: string;
}

export enum Priority {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

export interface Note {
  id: string;
  tags: string[];
  title: string;
  pinned: boolean;
  content: string;
  archived: boolean;
  completed: boolean;
  categoryId: string;
  categoryColor: string;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
}

type ExtractValue<T extends readonly { value: string }[]> = T[number]['value'];

export type SortCategoryOption = ExtractValue<typeof SORT_CATEGORY_OPTIONS>;
export type SortNoteOption = Exclude<ExtractValue<typeof SORT_CATEGORY_OPTIONS>, 'percentage'>;
export type SortPriorityOption = ExtractValue<typeof SORT_PRIORITY_OPTION>;
