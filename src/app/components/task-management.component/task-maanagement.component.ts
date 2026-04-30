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
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { CheckboxModule } from 'primeng/checkbox';
import { UserTask } from '../../shared/models/tasks.models';

@Component({
  standalone: true,
  selector: 'app-task-managment',
  templateUrl: './task-management.component.html',
  imports: [
    ButtonModule,
    DataViewModule,
    TagModule,
    FormsModule,
    CommonModule,
    BadgeModule,
    RouterLink,
    ToggleSwitchModule,
    CheckboxModule,
  ],
})
export class TaskManagementComponent implements OnInit {
  store = inject(TaskStoreService);
  HolidaysPerMonth: Holiday[] = [];

  checked: boolean = false;
  ngOnInit(): void {
    this.loadTasks();
    this.resetForm();
  }
  loadTasks() {
    const hydrated = this.store.HolidaysfilteredByMonth();
    if (hydrated.length > 0) {
      this.HolidaysPerMonth = this.checked ? hydrated : hydrated.filter((day) => day.isTask);
    } else {
      this.HolidaysPerMonth = this.store.tasks().map((task) => this.mapTaskToHoliday(task));
    }
  }

  isChecked() {
    this.loadTasks();
  }

  title: string = '';
  date: string = '';
  id: string = '';
  isTask: boolean | undefined = undefined;
  selectedType: string = '';
  currentTask: Holiday | null = null;
  isHoliday: boolean = false;
  addNewValue: boolean = true;
  getTask(task: Holiday) {
    this.currentTask = task;
    this.id = task.uuid;
    this.title = task.name;
    this.date = task.date;
    this.isTask = task.isTask;
    this.selectedType = this.isTask ? 'Task' : task.public ? 'Public' : 'Holiday';
    this.addNewValue = false;
    this.isHoliday = task.isTask ? false : true;
  }

  resetForm() {
    this.id = this.store.tasks().length.toString();
    this.title = '';
    this.date = '';
    this.isTask = undefined;
    this.isHoliday = false;
    this.selectedType = '';
    this.addNewValue = true;
  }

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

  runDelete() {
    if (!this.isHoliday) {
      this.store.deleteTask(this.id);
      this.HolidaysPerMonth = this.HolidaysPerMonth.filter((task) => task.uuid !== this.id);
      this.resetForm();
    }
  }

  runUpdate() {
    let convertedTask: UserTask = {
      id: this.id,
      title: this.title,
      date: this.date,
      category: this.selectedType,
    };

    if (this.currentTask && !this.addNewValue) {
      this.store.updateTask(this.mapTaskToHoliday(convertedTask));
      this.HolidaysPerMonth = this.HolidaysPerMonth.map((task) =>
        task.uuid === this.id ? { ...this.mapTaskToHoliday(convertedTask) } : task,
      );
    } else if (this.title && this.date && this.selectedType && this.addNewValue) {
      convertedTask = {
        id: this.id + 1,
        title: this.title,
        date: this.date,
        category: this.selectedType,
      };

      this.store.addTask(convertedTask);
      this.HolidaysPerMonth = [...this.HolidaysPerMonth, this.mapTaskToHoliday(convertedTask)];
      this.getTask(this.mapTaskToHoliday(convertedTask));

      this.resetForm();
    } else {
      console.log('error in input');
    }
  }
}
