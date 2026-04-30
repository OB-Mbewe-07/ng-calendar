import { Injectable, signal, computed, WritableSignal } from '@angular/core';
import { UserTask } from '../models/tasks.models';
import { Holiday } from '../models/data.models';

@Injectable({ providedIn: 'root' })
export class TaskStoreService {
  private tasksSignal = signal<UserTask[]>([
    { id: '1', title: 'Team Meeting', date: '2025-01-06', category: 'work' },
    { id: '2', title: 'Project Kickoff', date: '2025-01-15', category: 'work' },
    { id: '3', title: 'Budget Review', date: '2025-02-03', category: 'work' },
    { id: '4', title: 'Client Presentation', date: '2025-02-19', category: 'work' },
    { id: '5', title: 'Team Building Event', date: '2025-03-07', category: 'personal' },
    { id: '6', title: 'Quarterly Report', date: '2025-03-21', category: 'work' },
    { id: '7', title: 'Project Deadline', date: '2025-04-15', category: 'work' },
    { id: '8', title: 'Client Review', date: '2025-04-22', category: 'work' },
    { id: '9', title: 'Strategy Planning', date: '2025-05-08', category: 'work' },
    { id: '10', title: 'Design Handoff', date: '2025-05-23', category: 'work' },
    { id: '11', title: 'Mid Year Review', date: '2025-06-12', category: 'work' },
    { id: '12', title: 'Team Lunch', date: '2025-06-27', category: 'personal' },
    { id: '13', title: 'Product Launch', date: '2025-07-10', category: 'work' },
    { id: '14', title: 'Summer Offsite', date: '2025-07-25', category: 'personal' },
    { id: '15', title: 'Stakeholder Update', date: '2025-08-14', category: 'work' },
    { id: '16', title: 'Sprint Retrospective', date: '2025-09-05', category: 'work' },
    { id: '17', title: 'Annual Conference', date: '2025-09-18', category: 'work' },
    { id: '18', title: 'Performance Reviews', date: '2025-10-09', category: 'work' },
    { id: '19', title: 'Year End Planning', date: '2025-11-14', category: 'work' },
    { id: '20', title: 'Christmas Party', date: '2025-12-19', category: 'personal' },
  ]);

  private filteredPerMonthSignal = signal<Holiday[]>([]);

  readonly HolidaysfilteredByMonth = this.filteredPerMonthSignal.asReadonly();
  readonly tasks = this.tasksSignal.asReadonly();
  readonly totalReminders = computed(() => this.tasksSignal().length);

  addTask(task: UserTask) {
    this.tasksSignal.update((current) => [...current, task]);
    this.saveToLocal();
  }

  updateTask(updatedTask: Holiday) {
    const value: UserTask = {
      id: updatedTask.uuid,
      title: updatedTask.name,
      date: updatedTask.date,
      category: updatedTask.public ? 'Public' : 'Known day',
    };

    this.tasksSignal.update((currentTasks) =>
      currentTasks.map((task) => (task.id === value.id ? { ...value } : task)),
    );
    this.saveToLocal();
  }

  deleteTask(id: string) {
    this.tasksSignal.update((current) => current.filter((t) => t.id !== id));
    this.saveToLocal();
  }

  private saveToLocal() {
    localStorage.setItem('my_tasks', JSON.stringify(this.tasksSignal()));
  }

  loadFromLocal(): string {
    const data = localStorage.getItem('my_tasks');
    if (data) this.tasksSignal.set(JSON.parse(data));
    console.log('Ssee data', data);
    return data!;
  }

  setFilteredHolidays(array: Holiday[]) {
    this.filteredPerMonthSignal.set(array);
  }
}
