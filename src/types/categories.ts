export interface Category {
  id: string;
  name: string;
  slug: string;
  noteCount: number;
  categoryColor: string;
  categoryNotes: Note[];
  createdAt: Date;
  updatedAt: Date;
}

export enum Priority {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

export interface Note {
  id: string;
  tag: string[];
  title: string;
  pinned: boolean;
  content: string;
  completed: boolean;
  categoryId: string;
  categoryColor: string;
  priority: Priority;
  createdAt: Date;
  updatedAt: Date;
}
