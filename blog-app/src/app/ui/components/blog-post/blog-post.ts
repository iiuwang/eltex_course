import { ChangeDetectionStrategy, Component,Input } from '@angular/core';

@Component({
  selector: 'app-blog-post',
  imports: [],
  templateUrl: './blog-post.html',
  styleUrl: './blog-post.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class BlogPost {
  @Input() title: string = "";
  @Input() description: string = "";
  @Input() date: string = "";
  @Input() image: string = "";
  @Input() index: number=0;
 }
