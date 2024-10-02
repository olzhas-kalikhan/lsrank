export type ListItem = {
  _id: string;
  name: string;
  score: number;
};

export type FormDefaultValues = {
  listName: string;
  listItems: ListItem[];
};
