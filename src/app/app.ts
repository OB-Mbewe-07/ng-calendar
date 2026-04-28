import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarTemplateDemo } from "./components/nav.compoponent/nav.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenubarTemplateDemo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('calendar-holiday');
}
