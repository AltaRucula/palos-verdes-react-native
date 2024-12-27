export type Claim = {
  author: string;
  content: string;
  createdAt: string;
  id: string;
  tags: string[];
  title: string;
  votes?: number;
  messages: {
    content: string;
    createdAt: string;
  }[]
};
