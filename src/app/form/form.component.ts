import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import timezones from 'timezones-list';
import {Font, TimeZone} from "../app.interfaces";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  timezoneList: TimeZone[] = timezones;
  // @ts-ignore
  form: FormGroup;

  @Output() onGenerate = new EventEmitter<any>();

  fontList: Font[] = [
    {
      label: 'Noto',
      value: 'Noto'
    },
    {
      label: 'Arial',
      value: 'Arial'
    },
    {
      label: 'Verdana',
      value: 'Verdana'
    },
    {
      label: 'CourierNew',
      value: 'CourierNew'
    },
    {
      label: 'Saxmono',
      value: 'Saxmono'
    }
  ]
  //@ts-ignore
  todayDateNoHours: Date;

  maxLength: number = 64;

  constructor(
    private _fb : FormBuilder
  ) {
  }

  get myTimezone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  get todayDate(){
    return new Date();
  }

  get tomorrowDate(){
    const tomorrow = this.todayDate;
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  }

  get isShowIntervalText(){
    return this.form.get('show_interval_text')?.value;
  }

  ngOnInit(): void {

    this.todayDateNoHours = moment(this.todayDate).toDate();

    this.form = this._fb.group({
      time_zone: [this.myTimezone, Validators.required],
      end_time: [this.tomorrowDate, Validators.required],
      show_interval_text: [true, Validators.required],
      days_text: ['days', Validators.maxLength(this.maxLength)],
      hours_text: ['hours', Validators.maxLength(this.maxLength)],
      minutes_text: ['minutes', Validators.maxLength(this.maxLength)],
      seconds_text: ['seconds', Validators.maxLength(this.maxLength)],
      background_color: ['#ffffff', Validators.required],
      font_color: ['#000000', Validators.required],
      font_name:['Noto', Validators.required],
      frame_size:[61, Validators.required]
    });
  }

  onSubmit() {
    const data = {
      ...this.form.value,
      end_time: moment(this.form.get('end_time')?.value).format('YYYY-MM-DD HH:mm:ss'),
      show_interval_text: this.form.get('show_interval_text')?.value ? 1 : 0
    }
    this.onGenerate.emit(data);
  }
}
