import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly data = signal({
    title: 'Angular Core Deep Dive'
  });

  protected onLogoClicked() {
    alert('Hello World!');
  }
  protected onKeyUp(newTitle: string) {
    console.log(newTitle);
    this.data.set({
      title: newTitle
    })
  }
}
