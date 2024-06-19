import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class UserService {
    API_URL = `${environment.api}/users/`

    constructor(private _httpClient: HttpClient) { }

    all(): Observable<any> {
        return this._httpClient.get<any>(
            `${this.API_URL + 'all'}`
        )
    }

    create(data: any) {
        return this._httpClient.post<any>(
            `${this.API_URL + 'create'}`,
            data
        )
    }

    delete(id: number) {
        return this._httpClient.delete<any>(`${this.API_URL}delete/${id}`)
    }
}
