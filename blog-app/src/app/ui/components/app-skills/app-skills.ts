import { ChangeDetectionStrategy, Component , Input} from '@angular/core';

@Component({
  selector: 'app-app-skills',
  imports: [],
  templateUrl: './app-skills.html',
  styleUrl: './app-skills.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSkills {
  @Input({ required: true }) skills!: string[];
}
