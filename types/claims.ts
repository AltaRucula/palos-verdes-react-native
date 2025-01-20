export type Claim = {
    id: string;
    createdAt: Date;
    content: string;
    messages: Message[];
    tags: string[];
    title: string;
    author: Author;
    votes: Vote[];
    isAuthor: boolean;
    hasVoted: boolean;
};

export type Message = {
    id: string;
    content: string;
    createdAt: Date;
    author: Author;
};

export type Vote = {
    id: string;
    createdAt: Date;
    author: Author;
};

export type NewClaim = {
    content: string;
    tags: string[];
    title: string;
};

export type Author = {
    id: string;
    firstName: string;
};
