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

export interface Note {
  id: string;
  tag: string[];
  title: string;
  pinned: boolean;
  content: string;
  completed: boolean;
  categoryId: string;
  categoryColor: string;
  createdAt: Date;
  updatedAt: Date;
}
