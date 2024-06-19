import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppMainComponent} from './main/app.main.component';
import { AppAccessdeniedComponent } from '../pages/access-denied/access-denied.component';
import { AppNotfoundComponent } from '../pages/not-found/not-found.component';
import { AppLoginComponent } from '../pages/login/login.component';
import { UserComponent } from '../pages/users/user.component';
import { AuthGuard } from '../domain/guards/auth.guard';
import { GuestGuard } from '../domain/guards/guest.guard';
import { BreedComponent } from '../pages/breeds/breed.component';
@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                canActivate: [AuthGuard],
                children: [
                    { path: '', component: BreedComponent },
                    { path: 'users', component: UserComponent },
                ]
            },
            {path: 'access', component: AppAccessdeniedComponent, canActivate: [GuestGuard]},
            { path: 'notfound', component: AppNotfoundComponent, canActivate: [GuestGuard] },
            { path: 'login', component: AppLoginComponent, canActivate: [GuestGuard] },
            { path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
