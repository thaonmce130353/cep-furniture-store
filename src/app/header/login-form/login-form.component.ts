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

  loading = false;
  submitted = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
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
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formLogin.invalid) {
      return;
    }

    this.loading = true;
    console.log(this.username.value, this.password.value);

    this.authenticationService.login(this.username.value, this.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from route parameters or default to '/'
          const returnUrl = this.route.snapshot.queryParams['home'] || '/';
          this.router.navigate([returnUrl]);
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }
}
