import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../layout/app.component';
import {AppMainComponent} from '../main/app.main.component';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    public model: any[];

    constructor(public app: AppComponent, public appMain: AppMainComponent) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Gatos', icon: 'pi pi-fw pi-github', routerLink: ['/']
            },
            {
                label: 'Administración', icon: 'pi pi-fw pi-cog', routerLink: ['/users'],
                items: [
                    { label: 'Usuarios', icon: 'pi pi-fw pi-users', routerLink: ['/users'] },
                ]
            },
        ];

    }
}
