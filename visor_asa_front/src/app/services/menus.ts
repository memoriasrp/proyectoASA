import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenusService {
  private apiUrl = 'http://localhost:3000/menus';

  constructor(private http: HttpClient) { }
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  getMenus(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }

  getMenu(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createMenu(menu: any): Observable<any> {
    return this.http.post(this.apiUrl, menu, { headers: this.getHeaders() });
  }

  updateMenu(id: number, menu: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, menu, { headers: this.getHeaders() });
  }

  deleteMenu(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
