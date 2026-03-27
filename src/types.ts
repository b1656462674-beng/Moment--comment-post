export interface PostData {
  id: string;
  author: {
    name: string;
    avatar: string;
    vip?: boolean;
    languages?: string[];
    location?: string;
  };
  content: string;
  images: string[];
  tags: string[];
  likes: number;
  comments: number;
  time: string;
}
