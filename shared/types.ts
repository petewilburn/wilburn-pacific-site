export interface Service {
  id: number;
  title: string;
  description: string;
  category: string;
  features: string[] | null;
  icon: string;
}

export interface Project {
  id: number;
  title: string;
  location: string;
  challenge: string;
  solution: string;
  outcome: string;
  metrics: Record<string, string | undefined> | null;
  imageUrl: string | null;
}

export interface Inquiry {
  id: number;
  name: string;
  company: string;
  email: string;
  details: string;
  createdAt: string | Date | null;
}