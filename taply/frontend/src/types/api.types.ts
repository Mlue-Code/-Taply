export type User = {
  id: string;
  name: string;
  email: string;
};

export type AuthCredentials = {
  email: string;
  password: string;
};

export type AuthResult = {
  token: string;
  user: User;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  status: "Draft" | "In review" | "Approved";
  designCount: number;
  updatedAt: string;
  shareableId: string;
};

export type Design = {
  id: string;
  name: string;
  description: string;
};

export type FeedbackPin = {
  id: string;
  x: number;
  y: number;
  label: string;
};

export type ReviewSession = {
  id: string;
  shareableId: string;
  title: string;
  description: string;
  pins: FeedbackPin[];
};

export type FeedbackItem = {
  id: string;
  author: string;
  message: string;
  createdAt: string;
};
