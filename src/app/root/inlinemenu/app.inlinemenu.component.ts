import {Component} from '@angular/core';
import {AppMainComponent} from '../main/app.main.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { IndexDBService } from 'src/app/domain/service/index-db.service';
import { AuthService } from 'src/app/domain/service/auth.service';

@Component({
    selector: 'app-inlinemenu',
    templateUrl: './app.inlinemenu.component.html',
    animations: [
        trigger('inline', [
            state('hidden', style({
                height: '0px',
                overflow: 'hidden'
            })),
            state('visible', style({
                height: '*',
            })),
            state('hiddenAnimated', style({
                height: '0px',
                overflow: 'hidden'
            })),
            state('visibleAnimated', style({
                height: '*',
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppInlineMenuComponent {

    name: string = '';
    profileImage: string = '';

    constructor(public appMain: AppMainComponent, private readonly _indexDBService: IndexDBService, private readonly _authService: AuthService) {
        this.loadUser()
    }

    loadUser(){
        this._indexDBService.loadDataAuthDB().then((auth) => {
            this.name = auth[0].user.names
            this.profileImage = 'https://ui-avatars.com/api/?background=random&name=' + this.name
        })
    }

    logout(){
        this._authService.logout()
    }

}
