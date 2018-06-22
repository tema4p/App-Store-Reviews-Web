import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IReview, ReviewService } from '../../services/reviewService';
import { FavoritesService } from '../../services/favoritesService';
import * as _ from 'lodash';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {AppsSearchService} from '../../services/appsSearchService';
import { Location } from '@angular/common';
import {routerTransition} from '../../animations/routerTransition';
import COUNTRIES from '../../models/countries.model';

@Component({
  selector: 'app-page-info',
  templateUrl: 'app-info.html',
  styleUrls: ['./app-info.scss']
})
export class AppInfoPageComponent implements OnInit  {
  @Input()
  public item: any;
  public items: IReview[] = [];
  public loadedCountriesCount = 0;
  public progress: any = {
    countriesTotal: 0,
    countriesResult: 0,
    countByCountries: {},
    countByRates: [0, 0, 0, 0, 0, 0]
  };

  public allReviews: IReview[] = [];
  private perPage = 50;
  private currentPage = 1;
  public countriesChartData: {};
  public ratesChartData: [0, 0, 0, 0, 0];

  constructor(
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              // public navParams: NavParams,
              public http: HttpClient,
              public reviewService: ReviewService,
              public favoritesService: FavoritesService,
              public appsSearchService: AppsSearchService) {


  }

  fetchReviews() {
    this.reviewService.fetchReviewsByGroup(this.allReviews, this.progress, this.item.trackId, 10)
      .subscribe(() => {
        this.items = this.allReviews.slice(0, this.perPage);
        this.loadedCountriesCount = this.getCountries();

        this.calculateCountByCountries();
        this.calculateCountByRates();
      });
  }

  calculateCountByCountries() {
    let data: any[] = _.toPairs(this.progress.countByCountries);
    data = _.map(data, (item) => {
      return {
        fullName: COUNTRIES[item[0]],
        name: item[0],
        y: item[1],
      };
    });
    data = _.filter(data, (item) => item.y > 0);
    this.countriesChartData = data;
  }

  calculateCountByRates() {
    this.ratesChartData = this.progress.countByRates.slice(1).reverse();
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    const market = this.route.snapshot.paramMap.get('market');
    this.appsSearchService.getApp(id, market).subscribe((res) => {
      this.item = res;
      this.fetchReviews();
    });
  }

  getCountries(): number {
    return _.uniq(_.map(this.allReviews, 'country')).length;
  }

  doInfinite(infiniteScroll): void {
    this.currentPage++;
    this.items = [
      ...this.items,
      ...this.allReviews.slice(this.items.length, this.perPage * this.currentPage)
    ];
    infiniteScroll.complete();
  }

  navigateBack(): void {
    this.location.back(); // <-- go back to previous location on cancel
  }
}

// let sss = {
//   'feed': {
//   'author': {
//     'name': {
//       'label': 'iTunes Store'
//     },
//     'uri': {
//       'label': 'http://www.apple.com/uk/itunes/'
//     }
//   },
//   'entry': [
//     {
//       'im:name': {
//         'label': 'Viber Messenger – Text & Call'
//       },
//       'rights': {
//         'label': '© Viber Media S.à r.l.'
//       },
//       'im:price': {
//         'label': 'Get',
//         'attributes': {
//           'amount': '0.00000',
//           'currency': 'USD'
//         }
//       },
//       'im:image': [
//         {
//           'label': 'http://is3.mzstatic.com/image/thumb/Purple118/v4/67/ce/f7/67cef723-5513-af30-199e-67005f06c66c/AppIcon-1x_U007emarketing-0-85-220-0-6.png/53x53bb-85.png',
//           'attributes': {
//             'height': '53'
//           }
//         },
//         {
//           'label': 'http://is5.mzstatic.com/image/thumb/Purple118/v4/67/ce/f7/67cef723-5513-af30-199e-67005f06c66c/AppIcon-1x_U007emarketing-0-85-220-0-6.png/75x75bb-85.png',
//           'attributes': {
//             'height': '75'
//           }
//         },
//         {
//           'label': 'http://is2.mzstatic.com/image/thumb/Purple118/v4/67/ce/f7/67cef723-5513-af30-199e-67005f06c66c/AppIcon-1x_U007emarketing-0-85-220-0-6.png/100x100bb-85.png',
//           'attributes': {
//             'height': '100'
//           }
//         }
//       ],
//       'im:artist': {
//         'label': 'Viber Media SARL.',
//         'attributes': {
//           'href': 'https://itunes.apple.com/al/developer/viber-media-sarl/id382617923?mt=8&uo=2'
//         }
//       },
//       'title': {
//         'label': 'Viber Messenger – Text & Call - Viber Media SARL.'
//       },
//       'link': {
//         'attributes': {
//           'rel': 'alternate',
//           'type': 'text/html',
//           'href': 'https://itunes.apple.com/al/app/viber-messenger-text-call/id382617920?mt=8&uo=2'
//         }
//       },
//       'id': {
//         'label': 'https://itunes.apple.com/al/app/viber-messenger-text-call/id382617920?mt=8&uo=2',
//         'attributes': {
//           'im:id': '382617920',
//           'im:bundleId': 'com.viber'
//         }
//       },
//       'im:contentType': {
//         'attributes': {
//           'term': 'Application',
//           'label': 'Application'
//         }
//       },
//       'category': {
//         'attributes': {
//           'im:id': '6005',
//           'term': 'Social Networking',
//           'scheme': 'https://itunes.apple.com/al/genre/ios-social-networking/id6005?mt=8&uo=2',
//           'label': 'Social Networking'
//         }
//       },
//       'im:releaseDate': {
//         'label': '2012-05-31T16:42:12-07:00',
//         'attributes': {
//           'label': '31 May 2012'
//         }
//       }
//     },
//     {
//       'author': {
//         'uri': {
//           'label': 'https://itunes.apple.com/al/reviews/id714810812'
//         },
//         'name': {
//           'label': 'eldadedinca'
//         },
//         'label': ''
//       },
//       'im:version': {
//         'label': '8.2.1'
//       },
//       'im:rating': {
//         'label': '1'
//       },
//       'id': {
//         'label': '2221577708'
//       },
//       'title': {
//         'label': 'Eldadedinca'
//       },
//       'content': {
//         'label': 'I cant open the viber the cod is arrive but when I write it doesnt work the viber said something acess cod doesnt work etc help me because i need for the viber can you open the viber for me please',
//         'attributes': {
//           'type': 'text'
//         }
//       },
//       'link': {
//         'attributes': {
//           'rel': 'related',
//           'href': 'https://itunes.apple.com/al/review?id=382617920&type=Purple%20Software'
//         }
//       },
//       'im:voteSum': {
//         'label': '0'
//       },
//       'im:contentType': {
//         'attributes': {
//           'term': 'Application',
//           'label': 'Application'
//         }
//       },
//       'im:voteCount': {
//         'label': '0'
//       }
//     },
