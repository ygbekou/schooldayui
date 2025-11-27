import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable()
export class SchoolInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
    console.log('Interceptor ...')
    const token = localStorage.getItem('authToken')

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      })
      return next.handle(cloned)
    }

    return next.handle(req)
  }
}