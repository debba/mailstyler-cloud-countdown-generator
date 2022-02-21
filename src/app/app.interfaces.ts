import {SelectItem} from "primeng/api";

export interface TimeZone {
  label: string;
  tzCode: string;
  name: string;
  utc: string;
}

export interface CountdownResponse {
  url: string;
  size: number;
  generation_time: number;
}

export interface CountdownEnv {
  fonts: SelectItem<string>[];
  styles: SelectItem<string>[];
  timezones: TimeZone[];
  renderers: SelectItem<string>[];
  default_font_name: string;
  footer_text_max_length: number;
  min_frame_size: number;
  max_frame_size: number;
}
