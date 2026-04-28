import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html' ,
  standalone: true,
  imports: [ButtonModule, DialogModule, InputTextModule],
})
export class AddTaskComponent  {
  visible: boolean = false;
  showDialog() {
    this.visible = true;
  }
}
