import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HolidayApiService } from '../../shared/services/holiday-api.service';
import { Subscription } from 'rxjs';
import { DataviewBasicDemo } from "../upcoming-holiday.component.ts/upcoming-holiday.component";
import { CalendarGridCompnent } from "../calendar-grid/calendar-grid.component";

@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  imports: [DataviewBasicDemo],
})
export class CalendarComponent implements OnInit, OnDestroy {
  private holidaysClass = inject(HolidayApiService);
  private subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(
      this.holidaysClass.getHolidays('US', 2025).subscribe({
        next: (data) => {
          
        },
        error: (err) => {
          
        },
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
