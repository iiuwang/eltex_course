import { ChangeDetectionStrategy, Component,Input, output } from '@angular/core';
import { Post } from '../../../types/post';
@Component({
  selector: 'app-blog-post',
  imports: [],
  templateUrl: './blog-post.html',
  styleUrl: './blog-post.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class BlogPost {
  @Input() post!: Post;
  deletePost = output<number>();
  editPost = output<Post>();
 }
