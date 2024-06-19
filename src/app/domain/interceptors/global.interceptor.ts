import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { IndexDBService } from '../service/index-db.service';
import { Router } from '@angular/router';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
    constructor(private readonly _indexDBService: IndexDBService, private readonly router: Router) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return from(this._indexDBService.loadDataAuthDB()).pipe(
            switchMap(auth => {
                const token = auth[0]?.token;
                if (token) {
                    let header;
                    const file = request.params.get('file');
                    if (file) {
                        header = {
                            'X-localization': 'es',
                            'Accept': '*/*',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
                            'Access-Control-Max-Age': '3600',
                            'Access-Control-Allow-Headers':
                                'Origin, X-Requested-With, Content-Range, Content-Disposition, Content-Type, Authorization',
                            'enctype': 'multipart/form-data',
                            'Authorization': `Bearer ${token}`,
                        };
                    } else {
                        header = {
                            'X-localization': 'es',
                            'Accept': '*/*',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
                            'Access-Control-Max-Age': '3600',
                            'Access-Control-Allow-Headers':
                                'Origin, X-Requested-With, Content-Range, Content-Disposition, Content-Type, Authorization',
                            'Authorization': `Bearer ${token}`,
                        };
                    }
                    request = request.clone({
                        setHeaders: header,
                    });
                }

                return next.handle(request).pipe(
                    catchError((error: HttpErrorResponse) => {
                        if (error.status === 401) {
                            this._indexDBService.deleteDataAuthDB();
                            this.router.navigate(['/login']);
                        }
                        return throwError(() => error.error);
                    })
                );
            })
        );
    }
}
