import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import * as moment from "moment";
import {CountdownEnv, CountdownResponse} from "./app.interfaces";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CountdownService {

  private readonly countdownPath = '/apps/api/v1/utils/elements/countdown';
  private readonly serviceUrl = `${environment.serviceUrl}`;

  constructor(
    private http: HttpClient
  ) {
  }

  get devuser() {
    return localStorage.getItem(environment.devUserStorage);
  }

  assignDevUser(devuser?: string) {
    if (devuser) {
      localStorage.setItem(environment.devUserStorage, devuser);
    }
  }

  removeDevUser() {
    localStorage.removeItem(environment.devUserStorage);
  }

  private getServiceUrl() {
    let serviceUrl = this.serviceUrl;
    if (this.devuser) {
      serviceUrl = `https://${this.devuser}.dev.editor.mailstyler.com`;
    }
    return `${serviceUrl}${this.countdownPath}`;
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
    return this.http.get(this.getServiceUrl(), {
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
      }))
    );
  }

  getEnv() {
    return this.http.get<CountdownEnv>(`${this.getServiceUrl()}/env`);
  }

}
