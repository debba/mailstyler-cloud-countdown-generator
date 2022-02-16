import {Component, OnInit, ViewChild} from '@angular/core';
import {PreviewComponent} from "./preview/preview.component";
import {CountdownResponse} from "./app.interfaces";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'mailstyler-cloud-countdown-generator';


  // @ts-ignore;
  @ViewChild('preview') preview : PreviewComponent;

  ngOnInit(){

  }

  setPreviewData(previewData: CountdownResponse) {
    this.preview.generatePreview(previewData);
  }

  setLoadingData(loading: boolean) {
    console.log('loading = ', loading);
    this.preview.setLoading(loading);
  }
}
