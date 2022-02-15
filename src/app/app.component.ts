import {Component, ViewChild} from '@angular/core';
import {PreviewComponent} from "./preview/preview.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mailstyler-cloud-countdown-generator';

  private previewData : any;

  // @ts-ignore;
  @ViewChild('preview') preview : PreviewComponent;

  generatePreview(previewData: any) {
    this.preview.generatePreview(previewData);
  }
}
