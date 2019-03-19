import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  private apiUrl:string = 'http://localhost:4000';
  
  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/users/authenticate`, {username, password})
    .pipe(
      map(user => {
        if(user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      })
    )
  }

  logout() {
        localStorage.removeItem('currentUser');
    }
}
