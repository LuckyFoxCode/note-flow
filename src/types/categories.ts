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
  title: string;
  content: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
  pinned: boolean;
  // tag: string[] = ???
}
