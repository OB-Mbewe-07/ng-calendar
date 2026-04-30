import { Routes } from '@angular/router';
import { UpcomingHolidaysComponent } from './components/upcoming-holiday.component.ts/upcoming-holiday.component';
import { TaskManagementComponent } from './components/task-management.component/task-maanagement.component';

export const routes: Routes = [
  {
    path: '',
    component: UpcomingHolidaysComponent,
  },
  {
    path: 'tasks',
    component: TaskManagementComponent,
  },
];
