import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import { MessageServiceService } from '../message-service.service';

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
    private rest: RestApiService,
    private msgService: MessageServiceService
  ) { }

  ngOnInit() {
  }

  validate() {
    if (this.email) {
      if (this.password) {
        return true;
      } else {
        this.msgService.openSnackbar('Password is not entered', 'close');
      }
    } else {
      this.msgService.openSnackbar('Email field is empty! why?', 'close');
    }
  }

  async login() {
    try {
      if (this.validate()) {
        const data = await this.rest.post(`${this.apiUrl}/accounts/login`, {
          email: this.email,
          password: this.password
        });
        if (data['success']) {
          localStorage.setItem('token', data['token']);
          this.data.getProfile();
          this.router.navigate(['/']);
        } else {
          this.msgService.openSnackbar(data['message'], 'retry');
        }
      }
    } catch (error) {
      this.msgService.openSnackbar(error['message'], 'errhm');
    }
    this.btnDisabled = false;
  }
}
