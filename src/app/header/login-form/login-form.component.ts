import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  formLogin!: FormGroup;
  constructor(private fb: FormBuilder) { }

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
    console.log(this.formLogin);
  }
}
