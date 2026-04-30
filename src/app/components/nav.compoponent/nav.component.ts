import { Component, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { Button } from "primeng/button";

@Component({
  selector: 'app-nav',
  templateUrl:'./nav.component.html',
  standalone: true,
  imports: [AvatarModule, BadgeModule, MenubarModule, InputTextModule, RippleModule, CommonModule, Button],
})
export class MenubarTemplateDemo{
  items: MenuItem[] | undefined;
}
