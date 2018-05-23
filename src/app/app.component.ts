import { Component } from '@angular/core';
import 'normalize.css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  currentApp: any;

  private selectItems(item: any): void {
    this.currentApp = item;
    console.log('currentApp', item);
  }
}
