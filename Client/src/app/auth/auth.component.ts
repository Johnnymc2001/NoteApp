import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router,} from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import {  ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { NoteService } from '../_services/note.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  user: User;
  loginForm: FormGroup;
  registerForm: FormGroup;
  validationErrors: string[] = [];

  constructor(
    private fb: FormBuilder,
    public accountService: AccountService,
    private noteService: NoteService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(24),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(24),
        ],
      ],
      confirmPassword: [
        '',
        [Validators.required, this.matchValues('password')],
      ],
    });

    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value
        ? null
        : { isMatching: true };
    };
  }

  login() {
    this.accountService.login(this.loginForm.value).subscribe(
      (resp) => {
        this.accountService.currentUser$
          .pipe(take(1))
          .subscribe((user) => (this.user = user));
          this.router.navigateByUrl("/notes");
        this.toastr.success('Logged in as ' + this.user.username, 'Login', {
          timeOut: 5000,
        });
      },
      (err) => {
        this.toastr.error('Username or password is wrong!');
      }
    );
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe(
      (resp) => {
        this.accountService.currentUser$
          .pipe(take(1))
          .subscribe((user) => (this.user = user));
          this.router.navigateByUrl("/");
        this.toastr.success('Logged in as ' + this.user.username, 'Login', {
          timeOut: 5000,
        });
      },
      (err) => {
        this.toastr.error('Username or password is wrong!');
      }
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.accountService.setCurrentUser(null);
    this.noteService.resetNote();
    this.router.navigateByUrl("/");

  }
}
