import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routerTransition } from './animations/routerTransition';
import { HostListener} from '@angular/core';

import 'normalize.css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})
export class AppComponent implements OnInit {
  public searchWord: string = '';
  public expandedNavBar: boolean = true;

  @HostListener('window:scroll', []) onWindowScroll(): void {
    this.expandedNavBar = window.scrollY === 0;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // TODO fix initial search term
    // if (this.route.snapshot.paramMap.get('word')) {
    //   this.searchWord = this.route.snapshot.paramMap.get('word');
    // }
    //
    // this.route.paramMap.subscribe(
    //   (params: ParamMap | any) => {
    //     if (params.params.word && (this.searchWord !== params.params.word)) {
    //       this.searchWord = params.params.word;
    //     }
    //   }
    // );
  }

  public goToSearch(): void {
    this.router.navigate(['/home', this.searchWord]);
  }

  public resetSearch(): void {
    this.searchWord = '';
    this.router.navigate(['/home']);
  }
}
