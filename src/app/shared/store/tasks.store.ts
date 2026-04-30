import { Injectable, signal, computed, WritableSignal } from '@angular/core';
import { UserTask } from '../models/tasks.models';
import { Holiday } from '../models/data.models';

@Injectable({ providedIn: 'root' })
export class TaskStoreService {
  private tasksSignal = signal<UserTask[]>([
    { id: '1', title: 'Team Meeting', date: '2025-04-07', category: 'work' },
    { id: '2', title: 'Project Deadline', date: '2025-04-15', category: 'work' },
    { id: '3', title: 'Client Review', date: '2025-04-22', category: 'work' },
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
        id : updatedTask.uuid,
        title: updatedTask.name,
        date: updatedTask.date,
        category: (updatedTask.public) ? 'Public' : 'Known day',
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

  loadFromLocal(): string  {
    const data = localStorage.getItem('my_tasks');
    if (data) this.tasksSignal.set(JSON.parse(data));
    console.log("Ssee data", data);
    return data!
  }

  setFilteredHolidays(array: Holiday[]) {
    this.filteredPerMonthSignal.set(array);
  }
}
