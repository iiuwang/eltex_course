import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-app-about-me',
  imports: [],
  templateUrl: './app-about-me.html',
  styleUrl: './app-about-me.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppAboutMe {}
