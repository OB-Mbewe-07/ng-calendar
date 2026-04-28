import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ButtonModule } from "primeng/button";

@Component({
    selector: 'app-calendar-grid',
    standalone: true,
    templateUrl: './calendar-grid.component.html',
    imports: [ButtonModule, CommonModule]
})
export class CalendarGridCompnent {
  
}