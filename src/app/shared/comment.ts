import { Author } from "./author";

export interface Comment {
  id?: string;
  rating?: number;
  comment?: string;
  author?: Author;
  date?: string | any;
}


