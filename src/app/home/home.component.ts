import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: any;
  categories: any;
  baseUrl: 'http://localhost:3000/api';
  fetching = false;
  constructor(
    private rest: RestApiService,
    private data: DataService
  ) { }

  async ngOnInit() {
    try {
      this.fetching = true;
      const data = await this.rest.get(`http://localhost:3000/api/products`);
      data['success']
        ? (this.products = data['products'])
        : this.data.error('Could not fetch Products');
        console.log(data);
    } catch (error) {
      this.fetching = false;
      this.data.error(error['message']);
    }
    try {
      this.fetching = true;
      const data = await this.rest.get(`http://localhost:3000/api/categories`);
      console.log(data);
      data['success']
        ? (this.categories = data['categories'])
        : this.data.error(data['message']);
    } catch (error) {
      this.fetching = false;
      this.data.error(error['message']);
    }
  }

}
