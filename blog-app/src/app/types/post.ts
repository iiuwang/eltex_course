export interface Post{
    id: number;
    title: string;
    description: string;
    date: string;
    image: string;
    rating: number;
    comments: Comment[];
}
export type AddPostData = Omit<Post, 'id' | 'date' | 'image' | 'rating' | 'comments'>;
export type UpdatePostData = Pick<Post, 'id' | 'title' | 'description'>;

export interface Comment {
    id: number;
    author: string;
    text: string;
    date: string;
    rating: number;
  }

export type AddCommentData = Pick<Comment, 'author' | 'text'>;