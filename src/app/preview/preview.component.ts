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
  size? : string;

  constructor(private _countdownService: CountdownService) { }

  ngOnInit(): void {
  }

  generatePreview(data: any) {
    this.data = data;
    this._countdownService.getCountdownUrl(data)
      .subscribe(({url, size}) => {
        this.size = this._countdownService.formatBytes(size);
        this.imageSrc = url;
        this.code = `<img src="${this.imageSrc}">`;
      });
  }

}
