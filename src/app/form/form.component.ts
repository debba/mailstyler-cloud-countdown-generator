import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import timezones from 'timezones-list';
import {CountdownResponse, Font, TimeZone} from "../app.interfaces";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment";
import {CountdownService} from "../countdown.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  timezoneList: TimeZone[] = timezones;
  // @ts-ignore
  form: FormGroup;

  @Output() dataGenerated = new EventEmitter<CountdownResponse>();
  @Input() loading : boolean;
  @Output() loadingData = new EventEmitter<boolean>();

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
    },
    {
      label: 'Digital7',
      value: 'Digital7'
    }
  ]
  //@ts-ignore
  todayDateNoHours: Date;

  maxLength: number = 64;
  // @ts-ignore
  maxDateNoHours: Date;
  rendererList = [
    {
      label: 'Freetype 2',
      value: 'freetype'
    },
    {
      label: 'Truetype',
      value: 'ttf'
    },
  ];

  stylesList = [
    {
      label: 'Plain',
      value: 'plain'
    },
    {
      label: 'Light',
      value: 'countdown_light'
    },
    {
      label: 'Dark',
      value: 'countdown_dark'
    }
  ];

  constructor(
    private _fb : FormBuilder,
    private _countdownService : CountdownService
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

  get isPlainStyle(){
    return this.form.get('style')?.value === 'plain';
  }

  ngOnInit(): void {

    this.todayDateNoHours = moment(this.todayDate).toDate();
    this.maxDateNoHours = moment(this.todayDate).add(3, 'M').toDate();

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
      frame_size:[61, Validators.required],
      font_renderer:['freetype', Validators.required],
      style: [this.stylesList[0].value, Validators.required]
    });
  }

  private setLoading(loading: boolean = true){
    this.loading = loading;
    this.loadingData.emit(this.loading);
  }

  onSubmit() {

    this.setLoading(true)

    const data = {
      ...this.form.value,
      end_time: moment(this.form.get('end_time')?.value).format('YYYY-MM-DD HH:mm:00'),
      show_interval_text: this.form.get('show_interval_text')?.value ? 1 : 0
    };

    this._countdownService.getCountdown(data)
      .subscribe((data) => {
        this.dataGenerated.emit(data);
        this.setLoading(false);
      });

  }
}
