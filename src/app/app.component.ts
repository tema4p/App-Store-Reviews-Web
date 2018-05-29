import {Component, OnInit} from '@angular/core';
import 'normalize.css';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  searchWord = '';
  currentApp: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
  }

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

  private selectItems(item: any): void {
    this.currentApp = item;
    console.log('currentApp', item);
  }

  public goToSearch(): void {
    this.router.navigate(['/home', this.searchWord]);
  }
}
