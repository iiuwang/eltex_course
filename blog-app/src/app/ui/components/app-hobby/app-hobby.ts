import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HobbyItem } from '../../../types/main-page';

@Component({
  selector: 'app-app-hobby',
  imports: [],
  templateUrl: './app-hobby.html',
  styleUrl: './app-hobby.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppHobby {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) hobbies!: HobbyItem[];
}
