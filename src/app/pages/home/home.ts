import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppInfoPageComponent } from '../app-info/app-info';
import * as _ from 'lodash';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {AppsSearchService} from '../../services/appsSearchService';

@Component({
  selector: 'app-page-home',
  templateUrl: 'home.html',
  styleUrls: ['./home.scss']
})
export class HomePageComponent implements OnInit {
  @Output() selectedItem = new EventEmitter<any>();

  public items: any[];
  public term = 'english';
  public fullImgDelay = false;

  constructor( private route: ActivatedRoute,
               private router: Router,
               public appsSearchService: AppsSearchService) {
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('word')) {
      this.term = this.route.snapshot.paramMap.get('word');
      this.getItems();
    }

    this.route.paramMap.subscribe(
      (params: ParamMap | any) => {
        if (params.params.word && (this.term !== params.params.word)) {
          this.term = params.params.word;
          this.getItems();
        }
      }
    );
  }

  public getItems(): void {
    if (this.term && this.term.length >= 0) {
      this.appsSearchService.searchApps(this.term)
        .subscribe((res: any) => {
          this.items = _.sortBy(res.results, ['trackId']);
        });
    }
  }

  public goToApp(item: any): void {
    this.router.navigate(['/appInfo', item.trackId]);
  }
}
