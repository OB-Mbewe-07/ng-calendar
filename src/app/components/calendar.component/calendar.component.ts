import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HolidayApiService } from '../../shared/services/holiday-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
})
export class CalendarComponent implements OnInit, OnDestroy {
  private holidaysClass = inject(HolidayApiService);
  private subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(
      this.holidaysClass.getHolidays('US', 2025).subscribe({
        next: (data) => {
          console.log(data.holidays);
        },
        error: (err) => {
          console.log(err);
        },
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
