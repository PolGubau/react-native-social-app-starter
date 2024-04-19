import User from "./user";

export interface Post {
  title: string;
  $id: string;
  thumbnail: string;
  prompt: string;
  video: string;
  creator: User;
}
