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
  constructor(
    private rest: RestApiService,
    private data: DataService
  ) { }

  async ngOnInit() {
    try {
      const data = await this.rest.get(`http://localhost:3000/api/products`);
      data['success']
        ? (this.products = data['products'])
        : this.data.error('Could not fetch Products');
        console.log(data);
    } catch (error) {
      this.data.error(error['message']);
    }
    try {
      const data = await this.rest.get(`http://localhost:3000/api/categories`);
      console.log(data);
      data['success']
        ? (this.categories = data['categories'])
        : this.data.error(data['message']);
    } catch (error) {
      this.data.error(error['message']);
    }
  }

  // fetchCategories() {
  //   // try {
  //     const data = this.rest.get(`http://localhost:3000/api/categories`);
  //     console.log(data);
  //     data['success']
  //       ? (this.categories = data['categories'])
  //       : this.data.error('An error occured from our end, Please retry');
  //   // } catch (error) {
  //   //   this.data.error(error['message']);
  //   // }
  // }



}
