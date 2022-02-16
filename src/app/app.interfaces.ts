export interface TimeZone {
  label: string;
  tzCode: string;
  name: string;
  utc: string;
}

export interface Font {
  label: string;
  value: string;
}

export interface CountdownResponse {
  url: string;
  size: number;
  generation_time: number;
}
