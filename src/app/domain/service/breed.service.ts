import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class BreedService {
    API_URL = `${environment.api}/breeds/`

    constructor(private _httpClient: HttpClient) { }

    breedsById(search: string): Observable<any> {
        return this._httpClient.get<any>(
            `${this.API_URL}${search}`
        )
    }
    breedsSearch(search: string): Observable<any> {
        return this._httpClient.get<any>(
            `${this.API_URL}search/${search}`
        )
    }
    breedsAll(): Observable<any> {
        return this._httpClient.get<any>(
            `${this.API_URL}`
        )
    }

    breedImages(search: string): Observable<any> {
        return this._httpClient.get<any>(
            `${this.API_URL}images/${search}`
        )
    }

}
