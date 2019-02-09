import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-my-product',
  templateUrl: './my-product.component.html',
  styleUrls: ['./my-product.component.scss']
})
export class MyProductComponent implements OnInit {
  products: any;
  baseUrl = 'http://localhost:3000/api';
  constructor(
    private rest: RestApiService,
    private data: DataService
  ) { }

  async ngOnInit() {
    try {
      const data = this.rest.get(`${this.baseUrl}/seller/products`);
      data['success']
        ? (this.products = data['products'])
        : this.data.error(data['message']);
    } catch (error) {
      this.data.error(error['message']);
    }
  }

}
