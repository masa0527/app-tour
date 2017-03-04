import { Injectable } from '@angular/core';
import { RequestOptions, URLSearchParams, Jsonp, RequestOptionsArgs } from '@angular/http';
import { Observable } from  'rxjs/Observable';
import 'rxjs/add/operator/map';
import { API_KEY } from '../shared/API_KEY';

@Injectable()
export class TourService {

  WEB_API_URL: string = 'https://webservice.recruit.co.jp/ab-road/tour/v1/';
  API_KEY = API_KEY;
  DEFAULT_SIZE = '50';
  SORT_RANKING = '5';
  CALLBACK = 'JSONP_CALLBACK';

  constructor(private jsonp: Jsonp) {}

  getTourData(areaCode: string): Observable<any> {

    let option = this.setParam(areaCode);

    return this.reqData(option);
  }

  setParam(areaCode: string): RequestOptions {
    let param = new URLSearchParams();
    param.set('key', this.API_KEY);
    param.set('area', areaCode);
    param.set('order', this.SORT_RANKING);
    param.set('count', this.DEFAULT_SIZE);
    param.set('format', 'jsonp');
    param.set('callback', this.CALLBACK);

    let options: RequestOptionsArgs = {
      method: 'get',
      url: this.WEB_API_URL,
      search: param
    };
    return new RequestOptions(options);
  }

  reqData(config: RequestOptions): Observable<any> {
    return this.jsonp.request(config.url, config)
      .map((response) => {
          let tourData;
          let obj = response.json();
          if (obj.results.error) {
            //Web APIリクエスト失敗
            let err = obj.results.error[0];
            tourData = {
              error: err.code,
              message: err.message
            }
          } else {

            let dataObj = obj.results.tour;
            tourData = {
              error: null,
              data: dataObj,
            };
          }
          //console.dir(tourData);
          return tourData;
        }
      );
  };


}
