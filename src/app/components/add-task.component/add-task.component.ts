import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TaskStoreService } from '../../shared/store/tasks.store';
import { UserTask } from '../../shared/models/tasks.models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html' ,
  standalone: true,
  imports: [ButtonModule, DialogModule, InputTextModule, FormsModule],
})
export class AddTaskComponent  {
  private store = inject(TaskStoreService);
  taskTitle: string = '';
  taskDate: string = '';
  taskCategory: string = '';
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  addTask() {
    const newTask: UserTask = {
      id: (this.store.tasks().length + 1).toString(),
      title: this.taskTitle,
      date: this.taskDate,
      category: this.taskCategory,
    };

    this.store.addTask(newTask);
    this.resetForm();
    this.visible = false;
  }

  private resetForm() {
    this.taskTitle = '';
    this.taskDate = '';
    this.taskCategory = '';
  }
}

