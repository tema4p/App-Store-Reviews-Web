import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import * as _ from 'lodash';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {AppsSearchService} from '../../services/appsSearchService';
import {FavoritesService} from '../../services/favoritesService';

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
  public favorites = [];
  public isLoading = false;

  constructor( private route: ActivatedRoute,
               private router: Router,
               public appsSearchService: AppsSearchService,
               private favoritesService: FavoritesService) {
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

    this.favoritesService.getFavoritesItems(this.favorites);
  }

  public getItems(): void {
    this.isLoading = true;
    if (this.term && this.term.length >= 0) {
      this.appsSearchService.searchApps(this.term)
        .subscribe((res: any) => {
          this.items = _.sortBy(res.results, ['trackId']);
          this.isLoading = false;
        });
    }
  }

  public goToApp(item: any): void {
    this.router.navigate(['/appInfo', item.trackId]);
  }
}
