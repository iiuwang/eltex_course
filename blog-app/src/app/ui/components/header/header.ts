import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, Router,RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class Header {

  toFooter() {
    const el = document.getElementById('footer');

    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
 }
