import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormComponent} from './form/form.component';
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CalendarModule} from "primeng/calendar";
import {CheckboxModule} from "primeng/checkbox";
import {InputTextModule} from "primeng/inputtext";
import {ColorPickerModule} from "primeng/colorpicker";
import {PreviewComponent} from './preview/preview.component';
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputNumberModule} from "primeng/inputnumber";
import {HttpClientModule} from "@angular/common/http";
import {environment} from "../environments/environment";
import {CountdownService} from "./countdown.service";

function getParameterByName(name: string) {
  const url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function initializeAppFactory(countdownService: CountdownService) : () => Promise<any> {
  return () => new Promise((resolve, reject) => {
    const devuser = getParameterByName('devuser');

    if (devuser !== null){
      countdownService.assignDevUser(devuser);
    }

    resolve(devuser);

  });
}

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    PreviewComponent
  ],
  imports: [
    DropdownModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CalendarModule,
    CheckboxModule,
    InputTextModule,
    BrowserModule,
    ColorPickerModule,
    FormsModule,
    InputTextareaModule,
    InputNumberModule,
    HttpClientModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializeAppFactory,
    deps: [CountdownService],
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
