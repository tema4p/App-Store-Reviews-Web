import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import {map, tap} from 'rxjs/internal/operators';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AppsSearchService {
  items: any = {};

  constructor(public http: HttpClient) {

  }

  searchApps(term: any): any {
    return (<any> this.http.get<any>(`https://itunes.apple.com/search?term=${term}&entity=software`))
      .pipe(
        tap( // Log the result or error
          (data: any) => {
            _.each(data.results, (item) => {
              this.items[item.trackId] = item;
            });
            console.log('this.items', this.items);
          }
        )
      );
  }

  getApp(trackId: number): any {
    if (trackId && this.items[trackId]) {
      return Observable.of(this.items[trackId]);
    } else {
      return (<any> this.http.get<any>(`https://itunes.apple.com/search?term=${trackId}&entity=software`))
        .pipe(
          map( // Log the result or error
            (data: any) => {
              return data.results[0];
            }
          )
        );
    }

    // return ;
  }
}
