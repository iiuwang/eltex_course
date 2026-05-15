export interface Post{
    id: number;
    title: string;
    description: string;
    date: string;
    image: string;
}
export type AddPostData = Omit<Post, 'id' | 'date' | 'image'>;
export type UpdatePostData = Pick<Post, 'id' | 'title' | 'description'>;
