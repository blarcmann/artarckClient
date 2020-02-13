import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import { MessageServiceService } from '../message-service.service';

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
  constructor(
    private rest: RestApiService,
    private data: DataService,
    private router: Router,
    private msgService: MessageServiceService
  ) { }

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
              this.msgService.openSnackbar('Password does not match...Check and try again', 'close');
            }
          } else {
            this.msgService.openSnackbar('Confirmation password is not entered', 'close');
          }
        } else {
          this.msgService.openSnackbar('Password field is empty', 'close');
        }
      } else {
        this.msgService.openSnackbar('Please provide your email', 'close');
      }
    } else {
      this.msgService.openSnackbar('Name is not entered', 'close');
    }
  }


  async register() {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        console.log('Data valiadated!');
        const data = await this.rest.post(
          `${this.data.baseUrl}/accounts/signup`,
          {
            name: this.name,
            email: this.email,
            password: this.password,
            isSeller: this.isSeller
          }
        );
        if (data['success']) {
          localStorage.setItem('token', data['token']);
          console.log('Registration Successful, redirecting to address setup');
          await this.data.getProfile();
          this.router.navigate(['/profile/address'])
            .then(() => {
              this.msgService.openSnackbar('Registration Success, Please enter your shipping address info', 'errhm');
            }).catch(error => this.msgService.openSnackbar(error, 'retry'));
        } else {
          this.msgService.openSnackbar(data['message'], 'retry');
        }
      }
    } catch (error) {
      this.msgService.openSnackbar(error['message'], 'retry');
      console.log(error['message']);
      console.log('Registration failed :(');
    }

  }

}
