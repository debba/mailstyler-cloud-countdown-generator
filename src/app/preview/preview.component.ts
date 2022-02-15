import {Component, OnInit, ViewChild} from '@angular/core';
import {CountdownService} from "../countdown.service";

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html'
})
export class PreviewComponent implements OnInit {

  data: any;
  imageSrc: string = '';
  code: string = '';

  constructor(private _countdownService: CountdownService) { }

  ngOnInit(): void {
  }

  generatePreview(data: any) {
    this.data = data;
    this.imageSrc = this._countdownService.getCountdownUrl(data)
    this.code = `<img src="${this.imageSrc}">`;
  }

}
