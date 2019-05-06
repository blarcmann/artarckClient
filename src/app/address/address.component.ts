import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { MessageServiceService } from '../message-service.service';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  currentAddress = '';
  btnDisabled = false;
  baseUrl  = 'http://localhost:3000/api';

  constructor(
    private data: DataService,
    private rest: RestApiService,
    private msgService: MessageServiceService
  ) { }

  async  ngOnInit() {
    try {
      const data = await this.rest.get(`${this.baseUrl}/accounts/address`);

      if (JSON.stringify(data['address']) === '{}' && this.data.message === '') {
        this.msgService.openSnackbar('You have not entered your shipping address, please do b4 I vex!', 'close');
      } else {
        this.currentAddress = data['address'];
      }
    } catch (error) {
      this.msgService.openSnackbar(error['message'], 'retry');
    }
  }

  async updateAddress() {
    this.btnDisabled = true;
    try {
      const res = await this.rest.post(`${this.baseUrl}/accounts/address`, this.currentAddress);
      res['success']
        ? (this.msgService.openSnackbar(res['message'], 'close'), await this.data.getProfile())
        : this.msgService.openSnackbar(res['message'], 'retry');
    } catch (error) {
      this.msgService.openSnackbar(error['message'], 'retry');
    }
    this.btnDisabled = true;
  }

}
