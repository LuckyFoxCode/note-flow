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
