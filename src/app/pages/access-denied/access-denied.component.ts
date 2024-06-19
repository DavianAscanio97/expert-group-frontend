import { Component } from '@angular/core';
import { AppComponent } from 'src/app/root/layout/app.component';

@Component({
  selector: 'app-accessdenied',
  templateUrl: './access-denied.component.html',
})
export class AppAccessdeniedComponent {
    constructor(public app: AppComponent) {}
}
