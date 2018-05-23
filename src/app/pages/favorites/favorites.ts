import { Component } from '@angular/core';
import { FavoritesService } from '../../services/favoritesService';
import { AppInfoPageComponent } from '../app-info/app-info';

@Component({
  selector: 'app-page-favorites',
  templateUrl: 'favorites.html',
  styleUrls: ['./favorites.scss']
})
export class FavoritesPageComponent {
  public items: any[];

  constructor(public favoritesService: FavoritesService) {

    if (favoritesService.favorites.length === 0) {
      // this.navCtrl.parent.select(1);
    }
  }

  ionViewDidEnter() {
    this.items = this.favoritesService.getFavoritesItems(this.items);
  }

  public goToApp(item): void {
    // this.navCtrl.push(AppInfoPage, {item: item});
  }
}
