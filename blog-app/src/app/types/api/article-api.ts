export interface ApiArticle {
    id: string;
    title: string;
    content: string;
    imgSrc: string | null;
    categoryId: string | null;
    rating: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ApiArticlesResult {
    items: ApiArticle[];
    total: number;
    page: number;
    limit: number;
  }

  export interface ApiComment {
    id: string;
    username: string;
    content: string;
    articleId: string;
    rating: number;
    createdAt: string;
  }