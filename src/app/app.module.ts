import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import {DropdownModule} from "primeng/dropdown";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CalendarModule} from "primeng/calendar";
import {CheckboxModule} from "primeng/checkbox";
import {InputTextModule} from "primeng/inputtext";
import {ColorPickerModule} from "primeng/colorpicker";
import { PreviewComponent } from './preview/preview.component';

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
    ColorPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
