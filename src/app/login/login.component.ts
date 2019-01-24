import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  btnDisabled = false;
  apiUrl = 'http://localhost:3000/api';


  constructor(
    private router: Router,
    private data: DataService,
    private rest: RestApiService
  ) { }

  ngOnInit() {
  }

  validate() {
    if (this.email) {
      if (this.password) {
        return true;
      } else {
        this.data.error('Password is not entered');
      }
    } else {
      this.data.error('Email field is empty! why?');
    }
  }

  async login() {
    try {
      if (this.validate()) {
        const data = this.rest.post(`${this.apiUrl}/accounts/login`, {
          email: this.email,
          password: this.password
        });
        if (data['success']) {
          localStorage.setItem('token', data['token']);
          this.router.navigate(['/']);
        } else {
          this.data.error(data['message']);
        }
      }
    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }


}
