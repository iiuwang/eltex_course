import { ChangeDetectionStrategy, Component,Input } from '@angular/core';
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

 }
