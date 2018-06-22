import {Component, OnInit, QueryList} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routerTransition } from './animations/routerTransition';
import { HostListener} from '@angular/core';
import { Location } from '@angular/common';
import * as _ from 'lodash';

import 'normalize.css';
import COUNTRIES from './models/countries.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})
export class AppComponent implements OnInit {
  public searchWord: string = '';
  public expandedNavBar: boolean = true;
  public countries: any[] = _.toPairs(COUNTRIES);
  public selectedMarket: string = localStorage['selectedMarket'] || 'us';

  @HostListener('window:scroll', []) onWindowScroll(): void {
    this.expandedNavBar = window.scrollY === 0;
  }

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {

  }

  ngOnInit() { }

  public goToSearch(): void {
    localStorage['selectedMarket'] = this.selectedMarket;
    this.router.navigate(['/home', this.selectedMarket, this.searchWord]);
  }

  public resetSearch(): void {
    this.searchWord = '';
    this.router.navigate(['/home']);
  }

  navigateBack(): void {
    this.location.back(); // <-- go back to previous location on cancel
  }

  enabledBack(): boolean {
    return this.router.url.indexOf('/home') !== 0;
  }
}
