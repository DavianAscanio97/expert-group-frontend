import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { JwtHelperService } from '@auth0/angular-jwt'
import { IndexDBService } from './index-db.service'
import { Router } from '@angular/router'

@Injectable({ providedIn: 'root' })
export class AuthService {
    API_URL = `${environment.api}/auth/`

    public jwtHelper: JwtHelperService = new JwtHelperService()

    constructor(private _httpClient: HttpClient, private router: Router, private _indexDBService: IndexDBService) { }


    login(data: any): Observable<any> {
        return this._httpClient.post<any>(
            `${this.API_URL + 'login'}`, data
        )
    }

    logout(): Observable<any> {
        const response = this._httpClient.get<any>(`${this.API_URL}logout`)
        this._indexDBService.deleteDataAuthDB()
        this.router.navigateByUrl('login')
        return response
    }

    async isAuthenticated(): Promise<boolean> {
        try {
            const auth = await this._indexDBService.loadDataAuthDB();
            if (!auth || auth.length === 0) {
                return false
            }
            const token = auth[0].token;
            return !this.jwtHelper.isTokenExpired(token ? token : '');
        } catch (error) {
            return false;
        }
    }

}
