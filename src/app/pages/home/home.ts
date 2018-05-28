import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppInfoPageComponent } from '../app-info/app-info';
import * as _ from 'lodash';

@Component({
  selector: 'app-page-home',
  templateUrl: 'home.html',
  styleUrls: ['./home.scss']
})
export class HomePageComponent {
  @Output() selectedItem = new EventEmitter<any>();

  public items: any[];
  public stars: [1, 2, 3, 4, 5];
  public term = 'english';
  public fullImgDelay = false;
  private minLengthSearch = 3;

  constructor(public http: HttpClient) {
    setTimeout(() => {
      this.getItems();
    }, 10);
  }

  public getItems(): void {
    console.log('this.term', this.term);
    if (this.term.length >= this.minLengthSearch) {
      this.http.get(`https://itunes.apple.com/search?term=${this.term}&entity=software`)
        .subscribe((data: any) => {
          this.items = _.sortBy(data.results, ['trackId']);
        });
    }
  }

  public goToApp(item: any): void {
    this.selectedItem.emit(item);
  }

  startSearch(): void {
    this.getItems();
  }
}
