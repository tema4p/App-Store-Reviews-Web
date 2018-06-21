import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs/Observer';
import * as moment from 'moment';
import * as $ from 'jquery';
import { forkJoin } from 'rxjs/observable/forkJoin';
import COUNTRIES from '../models/countries.model';

export interface IReview {
  id: number;
  title: string;
  updated: string;
  author: string;
  rating: number;
  version: string;
  content: string;
  country: string;
  countryCode: string;
}

@Injectable()
export class ReviewService {
  private fetchLimit = 500;
  private progress: any;
  private countries = COUNTRIES;

  constructor(private http: HttpClient) {
  }

  public fetchReviewsByGroup(items: IReview[], progress: any, id: number, perGroup: number): Observable<any> {
    return new Observable((observer: Observer<null>) => {
      this.fetchByGroup(items, progress, id, observer, perGroup);
    });
  }

  public async fetchByGroup(items: IReview[], progress: any, id: number, observer: any, perGroup: number) {
    const countries = Object.keys(this.countries);
    const perItem: number = perGroup || 10;
    const totalCount: number = Math.floor(countries.length / perItem);
    const countryGroups: any = [];
    const queries = [];
    progress.countriesTotal = countries.length;

    for (let i = 0; i <= totalCount; i++) {
      countryGroups.push(countries.slice(i * perItem, i * perItem + perItem));
    }

    countryGroups.map((countryGroup) => {
      queries.push(this.getReviewsBy.bind(this, id, countryGroup));
    });

    for (const query of queries) {
      const results = await query();
      progress.countriesResult += perItem;
      results.map((result: any) => {
        this.extractReviews(result.xmlString, items, result.country, progress);
      });
      observer.next(true);
    }
  }

  public getReviewsBy(id: number, countries: string[]): Promise<any> {
    return new Promise((resolve) => {
      const queries: any = [];
      countries.forEach((country: string) => {
        const url = `https://itunes.apple.com/${country.toLowerCase()}/rss/customerreviews/id=${id}/sortBy=mostRecent/xml`;
        queries.push(this.http.get(url, {responseType: 'text'}));
      });

      forkJoin(queries).subscribe(results => {
        resolve(countries.map((country: string, index: number) => {
          return {country, xmlString: results[index]};
        }));
      }, () => {
        resolve([]);
      });
    });
  }

  public fetchReviews(items: IReview[], progress: any, id: number): Observable<null> {
    const countries = Object.keys(this.countries);
    progress.countriesTotal = countries.length;
    progress.countriesResult = 0;
    return new Observable((observer: Observer<null>) => {
      countries.forEach((country: string) => {
        const url = `https://itunes.apple.com/${country.toLowerCase()}/rss/customerreviews/id=${id}/sortBy=mostRecent/xml`;
        setTimeout(() => {
          this.http.get(url, {responseType: 'text'}).subscribe((xmlString: string) => {
            progress.countriesResult++;
            this.extractReviews(xmlString, items, country, progress);
            observer.next(null);
          });
        });
      });
    });
  }

  private extractReviews(xmlString: string, items: IReview[], country: string, progress): void {
    const entries = xmlString.split('<entry>');
    progress.countByCountries[country] = progress[country] || 0;


    entries.forEach((entry: string) => {
      const content = entry.match(/<content type="text">([\s|\S]*?)<\/content>/m);

      if (content) {
        const id = +entry.match(/<id>(.*)<\/id>/)[1];
        if (items.length > this.fetchLimit) {
          if (items[items.length - 1].id > id) {
            return;
          }
        }
        let index = 0;
        if (items.length > 0) {
          index = _.findIndex(items, (item) => {
            return item.id < id;
          });
        }
        index = (index === -1) ? items.length : index;


        progress.countByCountries[country] += 1;

        const rating = +entry.match(/<im:rating>(.*?)<\/im:rating>/)[1];

        progress.countByRates[rating] = progress.countByRates[rating] || 0;
        progress.countByRates[rating] += 1;

        items.splice(index, 0, {
            id: +entry.match(/<id>(.*)<\/id>/)[1],
            title: this.replaceCharts(entry.match(/<title>(.*?)<\/title>/)[1]),
            author: this.replaceCharts(entry.match(/<author><name>(.*)<\/name>/)[1]),
            updated: moment(entry.match(/<updated>(.*?)<\/updated>/)[1]).format('L'),
            rating: rating,
            version: entry.match(/<im:version>(.*?)<\/im:version>/)[1],
            content: this.replaceCharts(content[1]),
            country: this.countries[country],
            countryCode: country
        });

        if (items.length > this.fetchLimit) {
          items.pop();
        }
      }
    });
  }

  public replaceCharts(text: string) {
    return $('<div></div>').html(text).text();
  }
}
