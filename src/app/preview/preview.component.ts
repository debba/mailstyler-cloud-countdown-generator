import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CountdownService} from "../countdown.service";
import {CountdownResponse} from "../app.interfaces";

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html'
})
export class PreviewComponent implements OnInit {

  status :  'no_data' | 'data' | 'loading' = 'no_data';

  imageSrc: string = '';
  code: string = '';
  size? : string;
  generationTime: number;

  constructor(private _countdownService: CountdownService) { }

  ngOnInit(): void {
  }

  generatePreview({size, generation_time, url}: CountdownResponse) {
    this.status = 'data';
    this.size = this._countdownService.formatBytes(size);
    this.generationTime = generation_time;
    this.imageSrc = url;
    this.code = `<img src="${this.imageSrc}">`;
  }

  setLoading(loading: boolean) {
    if (loading){
      this.status = 'loading';
    }
  }
}
