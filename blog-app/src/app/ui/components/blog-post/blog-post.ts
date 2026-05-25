import { ChangeDetectionStrategy, Component,Input, output } from '@angular/core';
import { Post } from '../../../types/post';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-blog-post',
  imports: [RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './blog-post.html',
  styleUrl: './blog-post.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class BlogPost {
  @Input() post!: Post;
  deletePost = output<string>();
  editPost = output<Post>();

  protected onDelete(): void {
    this.deletePost.emit(this.post.id);
  }

  protected onEdit(): void {
    this.editPost.emit(this.post);
  }
 }
