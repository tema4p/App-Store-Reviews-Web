import {Component, Input, SimpleChanges} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-card',
  templateUrl: 'appCard.component.html',
  styleUrls: ['./appCard.component.scss'],
})

export class AppCardComponent {
  @Input()
  item: any;

  @Input()
  expanded: boolean;

  public fullImgDelay = false;

  constructor(
  // public verbsService: VerbsService
  ) {
    setTimeout(() => {
      this.fullImgDelay = true;
    }, 10);
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   // console.log('changes', changes);
  // }

  public getDateFormatted(text: string): string {
    return moment(text).format('L');
  }
}
