import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = localStorage.getItem('jwt');
    req.headers.set('Content-type', 'application/json');
    let request: any = 'request';
    console.log('[JWT]: ', jwt);
    if (jwt) {
      req.headers.set('Authorization', jwt);
      console.log(jwt);
      request = req.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${jwt}`
        })
      });
    }
    console.log(request);
    return next.handle(request);
  }
}
