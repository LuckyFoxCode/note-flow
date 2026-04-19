export interface Category {
  id: string;
  name: string;
  slug: string;
  noteCount: number;
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
  // tag: string[] = ???
  // pinned: boolean = ???
}
