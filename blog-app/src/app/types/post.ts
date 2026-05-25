export interface Post{
    id: string;
    title: string;
    description: string;
    date: string;
    image: string;
    rating: number;
    comments: Comment[];
}

export type AddPostData = Pick<Post, 'title' | 'description'> & {
    imageFile?: File | null;
  };
  
  export type UpdatePostData = Pick<Post, 'id' | 'title' | 'description'> & {
    imageFile?: File | null;
  };

export interface Comment {
    id: string;
    author: string;
    text: string;
    date: string;
    rating: number;
  }

export type AddCommentData = Pick<Comment, 'author' | 'text'>;