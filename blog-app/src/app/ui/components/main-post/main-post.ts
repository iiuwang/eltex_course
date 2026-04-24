import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-post',
  imports: [],
  templateUrl: './main-post.html',
  styleUrl: './main-post.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  // standalone: true,
})
export class MainPost { 
  @Input() post: any;
  @Input() index: number=0;
  // @Input() title: string = "";
  // @Input() description: string = "";
  // @Input() date: string = "";
  // @Input() image: string = "";

}
