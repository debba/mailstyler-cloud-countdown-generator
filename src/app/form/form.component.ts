import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CountdownResponse, TimeZone} from "../app.interfaces";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment";
import {CountdownService} from "../countdown.service";
import {SelectItem} from "primeng/api";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  timezoneList: TimeZone[] = [];
  // @ts-ignore
  form: FormGroup;

  @Output() dataGenerated = new EventEmitter<CountdownResponse>();
  @Input() loading : boolean;
  @Output() loadingData = new EventEmitter<boolean>();

  fontList: SelectItem<string>[] = [];
  //@ts-ignore
  todayDateNoHours: Date;

  maxLength: number = 16;
  // @ts-ignore
  maxDateNoHours: Date;
  rendererList: SelectItem<string>[] = [];

  stylesList: SelectItem<string>[] = [];

  minFrameSize: number = 61;
  maxFrameSize: number = 181;

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
      separator: [':'],
      separator_color: ['#000000', Validators.required],
      background_color: ['#ffffff', Validators.required],
      font_color: ['#000000', Validators.required],
      footer_font_color: ['#000000', Validators.required],
      font_name:[null, Validators.required],
      footer_font_name:[null],
      frame_size:[this.minFrameSize, Validators.required],
      font_renderer:[null, Validators.required],
      style: [null, Validators.required]
    });

    this._countdownService.getEnv().subscribe(res => {
      console.log({res});
      this.timezoneList = res.timezones;
      this.stylesList = res.styles;
      this.fontList = res.fonts;
      this.rendererList = res.renderers;
      this.maxLength = res.footer_text_max_length;
      this.minFrameSize = res.min_frame_size;
      this.maxFrameSize = res.max_frame_size;
      this.form.patchValue({
        style: this.stylesList[0].value,
        font_renderer: this.rendererList[0].value,
        font_name: res.default_font_name,
        footer_font_name: res.default_font_name
      })
    })

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
