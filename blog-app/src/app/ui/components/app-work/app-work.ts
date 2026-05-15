import { ChangeDetectionStrategy, Component , Input} from '@angular/core';
import { WorkItem } from '../../../types/main-page';
@Component({
  selector: 'app-app-work',
  imports: [],
  templateUrl: './app-work.html',
  styleUrl: './app-work.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppWork {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) works!: WorkItem[];
}
