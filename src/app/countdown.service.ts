import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CountdownService {

  private serviceUrl = "https://andreadb.dev.editor.mailstyler.com/apps/api/v1/utils/elements/countdown";

  constructor(
    private http: HttpClient
  ) {
  }

  formatBytes(bytes : number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  getCountdownUrl(data: any) {
    const url = this.serviceUrl + "?" + Object.keys(data).map(key => key + '=' + encodeURIComponent(data[key])).join('&');
    return this.http.get(url, {
      observe: 'response',
      responseType: 'blob'
    }).pipe(
      map(res => ({url: url, size: res.body?.size || 0}))
    );
  }
}
