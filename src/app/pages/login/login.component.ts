import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppComponent } from 'src/app/root/layout/app.component';
import { AuthService } from 'src/app/domain/service/auth.service';
import { IndexDBService } from 'src/app/domain/service/index-db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppLoginComponent {

    password: string | null = null;
    email: string | null = null;
    message: string | null = null;

    constructor(
        public app: AppComponent,
        private _authService: AuthService,
        private jwtHelper: JwtHelperService,
        private _indexDBService: IndexDBService,
        private router: Router,
    ) {}


    async login() {
        try {
            const response = await this._authService.login({
                email: this.email,
                password: this.password
            }).pipe(
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                })
            ).toPromise();

            const token = response.data.token.accessToken
            const user = response.data.user
            const decodeToken = this.jwtHelper.decodeToken(token)
            const isValidEmail = this.validateEmailToken(decodeToken)
            if (isValidEmail) this.storeToken(token, user)
        } catch (error) {
            if (error instanceof HttpErrorResponse) {
                // Here you can handle the specific error
                this.message = error.error.message || 'Error al iniciar sesión';
            } else {
                console.error('Unexpected error:', error);
                this.message = 'Unexpected error occurred';
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async storeToken(token: string, user: any) {
        // Store in IndexedDB
        await this.storeInIndexedDB(token, user);
        this.message = 'Bienvenido al sistema.';
        this.router.navigateByUrl('/')
    }


    // Function to store token and user data in IndexedDB
    async storeInIndexedDB(token: string, user: any) {
        const db = await this._indexDBService.initDB();
        await db.put('authStore', { token, user });
    }

    validateEmailToken(decode: { sub?: string; email?: string } = {}) {
        if (decode.email !== this.email) {
            this.message = 'El token es inválido';
            return false
        }
        return true
    }

}

