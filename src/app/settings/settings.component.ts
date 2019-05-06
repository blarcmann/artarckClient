import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import { MessageServiceService } from '../message-service.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  btnDisabled = false;
  currentSettings: any;
  baseUrl = 'http://localhost:3000/api';
  constructor(
    private data: DataService,
    private rest: RestApiService,
    private msgService: MessageServiceService
  ) { }

  async ngOnInit() {
    try {
      if (!this.data.user) {
        await this.data.getProfile();
      }
      this.currentSettings = Object.assign({
        newPwd: '',
        pwdConfirm: ''
      }, this.data.user);
    } catch (error) {
      this.msgService.openSnackbar(error, 'close');
    }
  }


  validate(settings) {
    if (settings['name']) {
      if (settings['email']) {
        if (settings['newPwd']) {
          if (settings['pwdConfirm']) {
            if (settings['newPwd'] === settings['pwdConfirm']) {
              return true;
            } else {
              this.msgService.openSnackbar('Password does not match', 'close');
            }
          } else {
            this.msgService.openSnackbar('Please enter confirmation password', 'close');
          }
        } else {
          if (!settings['pwdConfirm']) {
            return true;
          } else {
            this.msgService.openSnackbar('Please enter your new password', 'close');
          }
        }
      } else {
        this.msgService.openSnackbar('Please enter your email', 'close');
      }
    } else {
      this.msgService.openSnackbar('Please enter your name', 'close');
    }
  }

  async update() {
    this.btnDisabled = true;
    try {
      if (this.validate(this.currentSettings)) {
        const data = this.rest.post(`${this.baseUrl}/accounts/profile`, {
          name: this.currentSettings['name'],
          email: this.currentSettings['email'],
          newPwd: this.currentSettings['newPwd'],
          isSeller: this.currentSettings['isSeller']
        });
        data['success']
          ? (this.data.getProfile(), this.msgService.openSnackbar(data['message'], 'close'))
          : this.msgService.openSnackbar(data['message'], 'retry');
      }
    } catch (error) {
      this.msgService.openSnackbar(error['message'], 'errhm');
    }
    this.btnDisabled = false;
  }


}
