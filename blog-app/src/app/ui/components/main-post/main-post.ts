import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Post } from '../../../types/post';
@Component({
  selector: 'app-main-post',
  imports: [],
  templateUrl: './main-post.html',
  styleUrl: './main-post.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class MainPost { 
  @Input() post!: Post;
  //@Input() index: number=0;
  

}
