import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import * as moment from "moment";
import {CountdownEnv, CountdownResponse} from "./app.interfaces";

@Injectable({
  providedIn: 'root'
})
export class CountdownService {

  private serviceUrl = "https://andreadb.dev.editor.mailstyler.com/apps/api/v1/utils/elements/countdown";

  constructor(
    private http: HttpClient
  ) {
  }

  formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  getCountdown(params: any) {
    return this.http.get(this.serviceUrl, {
      params: {
        ...params,
        ts: moment().unix()
      },
      observe: 'response',
      responseType: 'blob'
    }).pipe(
      map(res => (<CountdownResponse>{
        headers: res.headers,
        url: res.url,
        size: res.body?.size,
        generation_time: parseFloat(res.headers.get('x-countdown-time'))
      })),
      tap(res => console.log(res))
    );
  }

  getEnv() {
    return this.http.get<CountdownEnv>(`${this.serviceUrl}/env`);
  }

}
