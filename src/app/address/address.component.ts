import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { MessageServiceService } from '../message-service.service';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  currentAddress = {
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  };
  btnDisabled = false;
  baseUrl = 'http://localhost:3000/api';

  constructor(
    private data: DataService,
    private router: Router,
    private rest: RestApiService,
    private msgService: MessageServiceService
  ) { }

  async  ngOnInit() {
    try {
      const data = await this.rest.get(`${this.baseUrl}/accounts/address`);

      if (JSON.stringify(data['address']) === '{}' && this.data.message === '') {
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
      if (res['success']) {
        (this.msgService.openSnackbar(res['message'], 'close'), await this.data.getProfile());
        this.router.navigate(['/profile']);
      } else {
        this.msgService.openSnackbar(res['message'], 'retry');
      }
    } catch (error) {
      this.msgService.openSnackbar(error['message'], 'retry');
    }
    this.btnDisabled = true;
  }

}
