import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'https://backend-sicala.onrender.com/api/login';

  constructor(private http: HttpClient) {}

  login(paramas: any) {
    return this.http.post(`${this.url}`, paramas);
  }
}
