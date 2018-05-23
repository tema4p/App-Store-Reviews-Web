import {Component, Input, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: 'stars.component.html',
  styleUrls: ['./stars.component.scss']
})

export class StarsComponent {
  @Input()
  rate: number;

  constructor(
    // public verbsService: VerbsService
  ) {

  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   // console.log('changes', changes);
  // }
}
