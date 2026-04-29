import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { HolidayApiService } from '../../shared/services/holiday-api.service';
import { Holiday } from '../../shared/models/data.models';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { AddTaskComponent } from '../add-task.component/add-task.component';
import { TaskStoreService } from '../../shared/store/tasks.store';
import { UserTask } from '../../shared/models/tasks.models';
import { toObservable } from '@angular/core/rxjs-interop';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming-holiday.component.html',
  standalone: true,
  imports: [ButtonModule, DataViewModule, TagModule, CommonModule, BadgeModule, AddTaskComponent, RouterLink],
})
export class UpcomingHolidaysComponent implements OnInit, OnDestroy {
  private holidayApi = inject(HolidayApiService);
  private store = inject(TaskStoreService);
  private cdr = inject(ChangeDetectorRef);
  private subscription = new Subscription();
  private tasks$ = toObservable(this.store.tasks);
  holidays: Holiday[] = [];
  currentDate = new Date();
  daysInMonth: number[] = [];
  gridPadding: number[] = [];
  weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  ngOnInit() {
    this.allHolidays();
  }

  filteredHolidays: Holiday[] = [];

  allHolidays() {
    this.subscription.add(
      this.holidayApi.getHolidays('US', 2025).subscribe({
        next: (data) => {
          this.holidays = data.holidays;
          this.watchTasks();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.log(err);
        },
      }),
    );
  }

  watchTasks() {
    this.subscription.add(
      this.tasks$.subscribe((_) => {
        this.mergeTasks();
        this.cdr.detectChanges();
      }),
    );
  }

  private addedTaskIds: string[] = [];

  private mapTaskToHoliday(task: UserTask): Holiday {
    return {
      name: task.title,
      date: task.date,
      observed: task.date,
      public: false,
      country: 'US',
      uuid: task.id,
      weekday: {
        date: {
          name: new Date(task.date).toLocaleDateString('en-US', { weekday: 'long' }),
          numeric: new Date(task.date).getDay().toString(),
        },
        observed: {
          name: new Date(task.date).toLocaleDateString('en-US', { weekday: 'long' }),
          numeric: new Date(task.date).getDay().toString(),
        },
      },
      isTask: true,
    };
  }
  mergeTasks() {
    for (const task of this.store.tasks()) {
      if (!this.addedTaskIds.includes(task.id)) {
        this.addedTaskIds.push(task.id);
        this.holidays = [...this.holidays, this.mapTaskToHoliday(task)];
      }
    }
    this.generateCalendar();
    this.cdr.detectChanges();
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear() - 1; //2025
    const month = this.currentDate.getMonth();

    const monthStr = (month + 1).toString().padStart(2, '0');
    const yearStr = year.toString();

    this.filteredHolidays = this.holidays.filter((day) =>
      day.date.startsWith(`${yearStr}-${monthStr}`),
    );
    this.store.setFilteredHolidays(this.filteredHolidays);

    const totalDays = new Date(year, month + 1, 0).getDate();
    this.daysInMonth = Array.from({ length: totalDays }, (_, i) => i + 1);

    const firstDayIndex = new Date(year, month, 1).getDay();
    this.gridPadding = Array.from({ length: firstDayIndex }, (_, i) => i);
  }

  getHolidayForDay(day: number) {
    const dayStr = day.toString().padStart(2, '0');
    const fullDate = `${this.currentDate.getFullYear() - 1}-${(this.currentDate.getMonth() + 1).toString().padStart(2, '0')}-${dayStr}`;

    return this.filteredHolidays.filter((holiday) => holiday.date === fullDate);
  }

  prevMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar();
  }

  goToToday() {
    this.currentDate = new Date();
    this.generateCalendar();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
