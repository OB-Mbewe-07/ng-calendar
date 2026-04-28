import { Injectable, signal, computed } from '@angular/core';
import { UserTask } from '../models/tasks.models';

@Injectable({ providedIn: 'root' })
export class TaskStoreService {
  private tasksSignal = signal<UserTask[]>([]);
  readonly tasks = this.tasksSignal.asReadonly();
  readonly totalReminders = computed(() => this.tasksSignal().length);

  addTask(task: UserTask) {
    this.tasksSignal.update((current) => [...current, task]);
    this.saveToLocal();
  }

  deleteTask(id: string) {
    this.tasksSignal.update((current) => current.filter((t) => t.id !== id));
    this.saveToLocal();
  }

  private saveToLocal() {
    localStorage.setItem('my_tasks', JSON.stringify(this.tasksSignal()));
  }

  loadFromLocal() {
    const data = localStorage.getItem('my_tasks');
    if (data) this.tasksSignal.set(JSON.parse(data));
  }
}
