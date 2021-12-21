import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  formLogin!: FormGroup;

  // loading = false;
  submitted = false;
  error = '';
  isLogin: boolean = false;

  public userAuthenticated = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    if (this.authenticationService.currentUserValue) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }

    this.authenticationService.loginChanged
      .subscribe(userAuthenticated => {
        this.userAuthenticated = userAuthenticated;
      })
  }

  get username() {
    return this.formLogin.get('txtUsername');
  }

  get password() {
    return this.formLogin.get('txtPassword');
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      txtUsername: ['', Validators.required],
      txtPassword: ['', Validators.required],
      cbRememberMe: [false]
    })

    this.authenticationService.isAuthenticated()
      .then(userAuthenticated => {
        this.userAuthenticated = userAuthenticated;
      })
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.formLogin.invalid) {
      this.error = "Please enter username and password";
      return;
    }

    // this.loading = true;

    this.authenticationService.login(this.username.value, this.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from route parameters or default to '/'
          const returnUrl = this.route.snapshot.queryParams['home'] || '/';
          this.isLogin = true;
          this.formLogin.reset();
          this.error = "";
          this.router.navigate([returnUrl]);
        },
        error: error => {
          this.error = error;
          // this.loading = false;
        }
      });
  }

  logout() {
    this.authenticationService.logout();
    this.isLogin = false;
    this.router.navigate(['/']);
  }

  loginIdentityServer4() {
    this.authenticationService.loginOIDC();
  }

  logoutIdentityServer4() {

  }
}
