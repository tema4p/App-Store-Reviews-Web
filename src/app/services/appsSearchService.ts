import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/internal/operators';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import * as _ from 'lodash';

import { CardModel } from '../models/card.model';

@Injectable()
export class AppsSearchService {

  private searchUrl: string = 'https://itunes.apple.com';
  private items: any = {};

  constructor(private http: HttpClient, private toastr: ToastrService) {}

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
        }),
        catchError(this.handleError.bind(this))
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 403) {
      this.toastr.error('Amounts of requests to API are limited');
    }
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  public getApp(trackId: number, market: string): Observable<CardModel> {
    if (trackId && this.items[trackId]) {
      return Observable.of(this.items[trackId]);
    } else {
      return this.http.get<any>(`${this.searchUrl}/${market}/search?term=${trackId}&entity=software`)
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
