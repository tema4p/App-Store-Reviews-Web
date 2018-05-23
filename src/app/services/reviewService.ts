import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { Observable } from 'rxjs/observable';
import { Observer } from 'rxjs/Observer';
import * as moment from 'moment';
import * as $ from 'jquery';
import { forkJoin } from 'rxjs/observable/forkJoin';

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
  private fetchLimit = 200;

  private countries = {
    ru: 'Russia',
    us: 'USA',
    ae: 'United Arab Emirates',
    ag: 'Antigua and Barbuda',
    ai: 'Anguilla',
    al: 'Albania',
    am: 'Armenia',
    ao: 'Angola',
    ar: 'Argentina',
    at: 'Austria',
    au: 'Australia',
    az: 'Azerbaijan',
    bb: 'Barbados',
    be: 'Belgium',
    bf: 'Burkina-Faso',
    bg: 'Bulgaria',
    bh: 'Bahrain',
    bj: 'Benin',
    bm: 'Bermuda',
    bn: 'Brunei Darussalam',
    bo: 'Bolivia',
    br: 'Brazil',
    bs: 'Bahamas',
    bt: 'Bhutan',
    bw: 'Botswana',
    by: 'Belarus',
    bz: 'Belize',
    ca: 'Canada',
    cg: 'Democratic Republic of the Congo',
    ch: 'Switzerland',
    cl: 'Chile',
    cn: 'China',
    co: 'Colombia',
    cr: 'Costa Rica',
    cv: 'Cape Verde',
    cy: 'Cyprus',
    cz: 'Czech Republic',
    de: 'Germany',
    dk: 'Denmark',
    dm: 'Dominica',
    do: 'Dominican Republic',
    dz: 'Algeria',
    ec: 'Ecuador',
    ee: 'Estonia',
    eg: 'Egypt',
    es: 'Spain',
    fi: 'Finland',
    fj: 'Fiji',
    fm: 'Federated States of Micronesia',
    fr: 'France',
    gb: 'Great Britain',
    gd: 'Grenada',
    gh: 'Ghana',
    gm: 'Gambia',
    gr: 'Greece',
    gt: 'Guatemala',
    gw: 'Guinea Bissau',
    gy: 'Guyana',
    hk: 'Hong Kong',
    hn: 'Honduras',
    hr: 'Croatia',
    hu: 'Hungaria',
    id: 'Indonesia',
    ie: 'Ireland',
    il: 'Israel',
    in: 'India',
    is: 'Iceland',
    it: 'Italy',
    jm: 'Jamaica',
    jo: 'Jordan',
    jp: 'Japan',
    ke: 'Kenya',
    kg: 'Krygyzstan',
    kh: 'Cambodia',
    kn: 'Saint Kitts and Nevis',
    kr: 'South Korea',
    kw: 'Kuwait',
    ky: 'Cayman Islands',
    kz: 'Kazakhstan',
    la: 'Laos',
    lb: 'Lebanon',
    lc: 'Saint Lucia',
    lk: 'Sri Lanka',
    lr: 'Liberia',
    lt: 'Lithuania',
    lu: 'Luxembourg',
    lv: 'Latvia',
    md: 'Moldova',
    mg: 'Madagascar',
    mk: 'Macedonia',
    ml: 'Mali',
    mn: 'Mongolia',
    mo: 'Macau',
    mr: 'Mauritania',
    ms: 'Montserrat',
    mt: 'Malta',
    mu: 'Mauritius',
    mw: 'Malawi',
    mx: 'Mexico',
    my: 'Malaysia',
    mz: 'Mozambique',
    na: 'Namibia',
    ne: 'Niger',
    ng: 'Nigeria',
    ni: 'Nicaragua',
    nl: 'Netherlands',
    np: 'Nepal',
    no: 'Norway',
    nz: 'New Zealand',
    om: 'Oman',
    pa: 'Panama',
    pe: 'Peru',
    pg: 'Papua New Guinea',
    ph: 'Philippines',
    pk: 'Pakistan',
    pl: 'Poland',
    pt: 'Portugal',
    pw: 'Palau',
    py: 'Paraguay',
    qa: 'Qatar',
    ro: 'Romania',
    sa: 'Saudi Arabia',
    sb: 'Soloman Islands',
    sc: 'Seychelles',
    se: 'Sweden',
    sg: 'Singapore',
    si: 'Slovenia',
    sk: 'Slovakia',
    sl: 'Sierra Leone',
    sn: 'Senegal',
    sr: 'Suriname',
    st: 'Sao Tome e Principe',
    sv: 'El Salvador',
    sz: 'Swaziland',
    tc: 'Turks and Caicos Islands',
    td: 'Chad',
    th: 'Thailand',
    tj: 'Tajikistan',
    tm: 'Turkmenistan',
    tn: 'Tunisia',
    tr: 'Turkey',
    tt: 'Republic of Trinidad and Tobago',
    tw: 'Taiwan',
    tz: 'Tanzania',
    ua: 'Ukraine',
    ug: 'Uganda',
    uy: 'Uruguay',
    uz: 'Uzbekistan',
    vc: 'Saint Vincent and the Grenadines',
    ve: 'Venezuela',
    vg: 'British Virgin Islands',
    vn: 'Vietnam',
    ye: 'Yemen',
    za: 'South Africa',
    zw: 'Zimbabwe'
  };

  constructor(private http: HttpClient) {}

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
      queries.push(this.getReviewsBy.bind(this, id, countryGroup))
    });

    for (const query of queries) {
      const results = await query();
      progress.countriesResult += perItem;
      results.map((result: any) => {
        this.extractReviews(result.xmlString, items, result.country);
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
          return {country, xmlString: results[index]}
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
            this.extractReviews(xmlString, items, country);
            observer.next(null);
          });
        });
      });
    });
  }

  private extractReviews(xmlString: string, items: IReview[], country: string): void {
    const entries = xmlString.split('<entry>');
    entries.forEach((entry: string) => {
      const content = entry.match(/<content type='text'>([\s|\S]*?)<\/content>/m);
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

        items.splice(index, 0, {
            id: +entry.match(/<id>(.*)<\/id>/)[1],
            title: this.replaceCharts(entry.match(/<title>(.*?)<\/title>/)[1]),
            author: this.replaceCharts(entry.match(/<author><name>(.*)<\/name>/)[1]),
            updated: moment(entry.match(/<updated>(.*?)<\/updated>/)[1]).format('L'),
            rating: +entry.match(/<im:rating>(.*?)<\/im:rating>/)[1],
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
