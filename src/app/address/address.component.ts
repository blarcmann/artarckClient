import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
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
    private rest: RestApiService
  ) { }

  async  ngOnInit() {
    try {
      const data = await this.rest.get(`${this.baseUrl}/accounts/address`);

      if (JSON.stringify(data['address']) === '{}' && this.data.message === '') {
        this.data.warning('You have not entered your shipping address, please do b4 I vex!');
      } else {
        this.currentAddress = data['address'];
      }
    } catch (error) {
      this.data.error(error['message']);
    }
  }

  async updateAddress() {
    this.btnDisabled = true;
    try {
      const res = await this.rest.post(`${this.baseUrl}/accounts/address`, this.currentAddress);
      res['success']
        ? (this.data.success(res['message']), await this.data.getProfile())
        : this.data.error(res['message']);
    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = true;
  }

}
