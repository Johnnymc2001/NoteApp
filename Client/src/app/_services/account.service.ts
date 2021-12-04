import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { pipe, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  login(user: User) {
    return this.http.post(this.baseUrl + 'user/login', user).pipe(
      map((response: User) => {
        const user = response;
        console.log(response);
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  register(user: User) {
    return this.http.post(this.baseUrl + 'user/register', user).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
          this.toastr.success("Account registered!");
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }
}
