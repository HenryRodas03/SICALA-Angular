import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'http://localhost:8080/api/login';

  constructor(private http: HttpClient) {}

  login(paramas: any) {
    return this.http.post(`${this.url}`, paramas);
  }
}
