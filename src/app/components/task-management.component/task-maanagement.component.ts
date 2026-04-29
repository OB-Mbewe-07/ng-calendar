import { Component, inject, OnInit } from '@angular/core';
import { TaskStoreService } from '../../shared/store/tasks.store';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Holiday } from '../../shared/models/data.models';
import { BadgeModule } from 'primeng/badge';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-task-managment',
  templateUrl: './task-management.component.html',
  imports: [ButtonModule, DataViewModule, TagModule, FormsModule, CommonModule, BadgeModule, RouterLink],
})
export class TaskManagementComponent implements OnInit {
  store = inject(TaskStoreService);
  HolidaysPerMonth: Holiday[] = [];
  ngOnInit(): void {
    this.HolidaysPerMonth = this.store.HolidaysfilteredByMonth();
  }
}
