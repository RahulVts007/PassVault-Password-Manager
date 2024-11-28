export interface Password {
  id: string;
  title: string;
  username: string;
  password: string;
  website?: string;
  category: string;
  notes?: string;
  favorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type PasswordCategory = 'Personal' | 'Work' | 'Finance' | 'Social' | 'Other';