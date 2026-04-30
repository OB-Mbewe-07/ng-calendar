export interface HolidayResponse {
  status:   number;
  warning:  string;
  requests: Requests;
  holidays: Holiday[];
}

export interface Requests {
  used:      number;
  available: number;
  resets:    string; 
}

export interface Holiday {
  name:     string;
  date:     string;
  observed: string;
  public:   boolean;
  country:  string;
  uuid:     string;
  weekday:  Weekday;
  isTask ?: boolean;
  description ?: boolean;
}

export interface Weekday {
  date:     DayDetails;
  observed: DayDetails;
}

export interface DayDetails {
  name:    string;
  numeric: string; 
}
