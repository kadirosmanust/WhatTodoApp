export type Note = {
  title: string;
  id: string;
  note: string;
};

export type User = {
  username: string;
  password: string;
  email: string;
  notes: Note[];
};
