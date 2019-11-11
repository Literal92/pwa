import { Injectable, Injector } from '@angular/core';
import { of } from 'rxjs';
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
export class crossOriginInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req.clone();
    req.headers.set('Access-Control-Allow-Origin', '*');
    // req.headers.set('X-Frame-Options', 'iframe');
    req.headers.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    req.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, HEAD, DELETE, OPTOINS');

    return next.handle(req);
  }
}
