import { Component, OnInit } from '@angular/core';
import {CountdownService} from "../countdown.service";

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html'
})
export class PreviewComponent implements OnInit {

  data: any;
  imageSrc: string = '';

  constructor(private _countdownService: CountdownService) { }

  ngOnInit(): void {
  }

  generatePreview(data: any) {
    this.data = data;
    this.imageSrc = this._countdownService.getCountdownUrl(data);
  }

}
