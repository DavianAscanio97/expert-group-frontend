import { Component } from '@angular/core';
import { AppComponent } from 'src/app/root/layout/app.component';

@Component({
  selector: 'app-notfound',
  templateUrl: './not-found.component.html',
})
export class AppNotfoundComponent {
    constructor(public app: AppComponent) {}
}
