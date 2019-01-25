import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  name = '';
  email = '';
  password = '';
  password1 = '';
  isSeller = false;
  btnDisabled = false;
  apiUrl = 'http://localhost:3000/api';
  constructor(private rest: RestApiService,
    private data: DataService,
    private router: Router) { }

  ngOnInit() {
  }

  validate() {
    if (this.name) {
      if (this.email) {
        if (this.password) {
          if (this.password1) {
            if (this.password === this.password1) {
              return true;
            } else {
              this.data.error('Password does not match...Check and try again');
            }
          } else {
            this.data.error('Confirmation password is not entered');
          }
        } else {
          this.data.error('Password field is empty');
        }
      } else {
        this.data.error('Please provide your email');
      }
    } else {
      this.data.error('Name is not entered');
    }
  }


  async register() {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        console.log('Data valiadated!');
        const data = await this.rest.post(
          'http://localhost:3000/api/accounts/signup',
          {
            name: this.name,
            email: this.email,
            password: this.password,
            isSeller: this.isSeller
          }
        );
        if (data['success']) {
          localStorage.setItem('token', data['token']);
          this.data.success('Registration Successful');
          console.log('Registration successful!');
        } else {
          this.data.error(data['message']);
        }
      }
    } catch (error) {
      this.data.error(error['message']);
      console.log(error['message']);
      console.log('Registration failed :(');
    }

  }

}
