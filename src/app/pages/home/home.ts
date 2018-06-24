import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { AppsSearchService } from '../../services/appsSearchService';
import { FavoritesService } from '../../services/favoritesService';
import { CardModel } from '../../models/card.model';

import * as _ from 'lodash';

@Component({
  selector: 'app-page-home',
  templateUrl: 'home.html',
  styleUrls: ['./home.scss']
})
export class HomePageComponent implements OnInit {
  @Output() selectedItem = new EventEmitter<any>();

  public items: CardModel[];
  public favorites: CardModel[] = [];
  public isLoading = false;

  public term = '';
  public market = 'us';

  constructor(private route: ActivatedRoute,
              private router: Router,
              public appsSearchService: AppsSearchService,
              private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('word')) {
      this.term = this.route.snapshot.paramMap.get('word');
      this.market = this.route.snapshot.paramMap.get('market');
      this.getItems();
    }

    this.route.paramMap.subscribe(
      (params: ParamMap | any) => {
        const wordChange = params.params.word && (this.term !== params.params.word);
        const marketChange = params.params.market && (this.market !== params.params.market);
        if (params.params.word && (wordChange || marketChange)) {
          this.term = params.params.word;
          this.market = params.params.market;
          this.getItems();
        }
      }
    );

    this.favoritesService.getFavoritesItems(this.favorites);
  }

  public getItems(): void {
    this.isLoading = true;

    if (this.term && this.term.length >= 0) {
      this.appsSearchService.searchApps(this.term, this.market)
        .subscribe((cards: CardModel[]) => {
          this.items = _.sortBy(cards, ['trackId']);
          this.isLoading = false;
          setTimeout(() => {
            window.scrollTo(0, 0);
          });
        }, () => this.isLoading = false);
    }
  }

  public goToApp(item: any): void {
    this.router.navigate(['/appInfo', this.market, item.trackId]);
  }
}
