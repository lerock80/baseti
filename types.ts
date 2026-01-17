
export interface Tool {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
  source: 'Brazuca' | '4ALL';
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
