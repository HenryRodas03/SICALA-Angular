import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private url = 'https://backend-sicala.onrender.com/api/aplications';

  constructor(private http: HttpClient) {}

  getApplications() {
    return this.http.get(`${this.url}`);
  }

  changeApplicationState(params: any) {
    return this.http.put(this.url, params);
  }
}
