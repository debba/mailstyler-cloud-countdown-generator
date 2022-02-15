import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {

  private serviceUrl = "https://andreadb.dev.editor.mailstyler.com/apps/api/v1/utils/elements/countdown";

  constructor() { }

  getCountdownUrl(data: any) {
    return this.serviceUrl + "?" +  Object.keys(data).map(key => key + '=' + encodeURIComponent( data[key] ) ).join('&');
  }
}
