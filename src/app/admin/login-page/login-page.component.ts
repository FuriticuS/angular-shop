import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthService} from "../../shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: any | FormGroup;
  submitted = false;

  constructor(
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  submit(){
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true,
    }

    this.auth.login(user).subscribe(res => {
      console.log(res)
      this.form.reset;
      this.router.navigate(['/admin', 'dashboard']);
      this.submitted = false;
    }, () => {
      this.submitted = false;
    })
  }

}
