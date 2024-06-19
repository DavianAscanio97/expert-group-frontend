import {Component} from '@angular/core';
import {AppComponent} from '../layout/app.component';

@Component({
    selector: 'app-footer',
    template: `
        <div class="layout-footer">
            <div class="footer-logo-container">
                <span class="app-name">XPERT GROUP</span>
            </div>
            <span class="copyright">PRUEBA FULLSTACK | DAVIAN ASCANIO</span>
        </div>
    `
})
export class AppFooterComponent {
    constructor(public app: AppComponent) {}
}
