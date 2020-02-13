import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';
import { MessageServiceService } from '../message-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: any;
  categories: any;
  fetching = false;
  naira = '₦';
  constructor(
    private rest: RestApiService,
    private data: DataService,
    private msgService: MessageServiceService
  ) { }

  async ngOnInit() {
    try {
      this.fetching = true;
      const data = await this.rest.get(`${this.data.baseUrl}/products`);
      data['success']
        ? (this.products = data['products'])
        : this.msgService.openSnackbar('Could not fetch Products', 'retry');
      console.log(data);
    } catch (error) {
      this.fetching = false;
      this.msgService.openSnackbar(error['message'], 'retry');
    }
    try {
      this.fetching = true;
      const data = await this.rest.get(`${this.data.baseUrl}/categories`);
      console.log(data);
      data['success']
        ? (this.categories = data['categories'])
        : this.msgService.openSnackbar(data['message'], 'errhm');
    } catch (error) {
      this.fetching = false;
      this.msgService.openSnackbar(error['message'], 'retry');
    }
  }

}
