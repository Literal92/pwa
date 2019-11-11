import { Injectable, Injector } from '@angular/core';
import { of } from 'rxjs';
import { LocalStorage } from '@ngx-pwa/local-storage';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable()
export class checkInternetInterceptor implements HttpInterceptor {
  constructor(protected localStorage: LocalStorage) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req.clone();
    console.log(authReq);
    return next.handle(authReq).pipe(
      map((event: HttpEvent<any>) => {
        if (event.type !== 0) {
          debugger;
          // this.localStorage.setItem(req.url, JSON.stringify(event)).subscribe(() => {});
          let item = localStorage.getItem(req.url);
          if (item != null) {
            localStorage.removeItem(req.url);
            localStorage.setItem(req.url, JSON.stringify(event));
          } else {
            localStorage.setItem(req.url, JSON.stringify(event));
          }

          // localStorage.setItem(req.url, JSON.stringify(event));
        }
        //  event['body'] = localStorage.getItem(req.url);
        // console.log(event['body']);
        return event;
      }));

    // send the newly created request
    // return next.handle(authReq) as any;
  }
}
