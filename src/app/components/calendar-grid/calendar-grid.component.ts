import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ButtonModule } from "primeng/button";

@Component({
    selector: 'app-calendar-grid',
    standalone: true,
    templateUrl: './calendar-grid.component.html',
    imports: [ButtonModule, CommonModule]
})
export class CalendarGridCompnent implements OnInit {
  currentDate = new Date();
  daysInMonth: number[] = [];
  gridPadding: number[] = [];
  weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const totalDays = new Date(year, month + 1, 0).getDate();
    this.daysInMonth = Array.from({ length: totalDays }, (_, i) => i + 1);

    const firstDayIndex = new Date(year, month, 1).getDay();
    this.gridPadding = Array.from({ length: firstDayIndex }, (_, i) => i);
  }
}