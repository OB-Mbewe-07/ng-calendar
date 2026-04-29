import { Injectable, signal, computed } from '@angular/core';
import { UserTask } from '../models/tasks.models';

@Injectable({ providedIn: 'root' })
export class TaskStoreService {
  private tasksSignal = signal<UserTask[]>([
    { id: '1', title: 'Team Meeting', date: '2025-04-07' , category: 'work' },
    { id: '2', title: 'Project Deadline', date: '2025-04-15', category: 'work' },
    { id: '3', title: 'Client Review', date: '2025-04-22', category: 'work' }
  ]);
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
