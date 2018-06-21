import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import * as _ from 'lodash';

import { CardModel } from '../models/card.model';

@Injectable()
export class AppsSearchService {

  private searchUrl: string = 'https://itunes.apple.com';
  private items: any = {};

  constructor(private http: HttpClient) {}

  public searchApps(term: string, market: string): Observable<CardModel[]> {
    return this.http.get<any>(`${this.searchUrl}/${market}/search?term=${term}&entity=software`)
      .pipe(
        map((data: any) => {
        const cards: CardModel[] = [];

        _.each(data.results, (item) => {
          const card: CardModel = new CardModel(item);

          this.items[item.trackId] = card;
          cards.push(card);
        });

        return cards;
        })
      );
  }

  public getApp(trackId: number): Observable<CardModel> {
    if (trackId && this.items[trackId]) {
      return Observable.of(this.items[trackId]);
    } else {
      return this.http.get<any>(`${this.searchUrl}?term=${trackId}&entity=software`)
        .pipe(
          map( // Log the result or error
            (data: any) => {
              return new CardModel(data.results[0]);
            }
          )
        );
    }
  }
}
