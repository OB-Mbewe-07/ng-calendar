import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { HolidayApiService } from '../../shared/services/holiday-api.service';
import { Holiday } from '../../shared/models/data.models';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming-holiday.component.html',
  standalone: true,
  imports: [ButtonModule, DataViewModule, TagModule, CommonModule, BadgeModule],
})
export class DataviewBasicDemo implements OnInit, OnDestroy {
  private holidayApi = inject(HolidayApiService);
  private cdr = inject(ChangeDetectorRef);
  private subscription = new Subscription();
  holidays: Holiday[] = [];

  ngOnInit() {
    this.allHolidays();
  }

  allHolidays() {
    this.subscription.add(
      this.holidayApi.getHolidays('US', 2025).subscribe({
        next: (data) => {
          this.holidays = data.holidays.slice(0, 8);
          this.cdr.detectChanges();
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
