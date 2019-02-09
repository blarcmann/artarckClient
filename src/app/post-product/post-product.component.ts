import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';
import { FooterRowOutlet } from '@angular/cdk/table';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent implements OnInit {

  product = {
    title: '',
    price: 0,
    categoryId: '',
    description: '',
    product_picture: null
  };
  btnDisabled = false;
  categories: any;
  baseUrl = 'http://localhost:3000/api';

  constructor(
    private data: DataService,
    private rest: RestApiService,
    private router: Router
  ) { }

  async ngOnInit() {
    try {
      const data = await this.rest.get(`${this.baseUrl}/categories`);
      data['success']
        ? (this.categories = data['categories'])
        : (this.data.error(data['message']));
    } catch (error) {
      this.data.error(error['message']);
    }
  }


  validate(product) {
    if (product.title) {
      if (product.price) {
        if (product.categoryId) {
          if (product.description) {
            if (product.product_picture) {
              return true;
            } else {
              this.data.error('Please do provide product picture');
            }
          } else {
            this.data.error('Please describe your product (work)');
          }
        } else {
          this.data.error('Please do select a category to proceed');
        }
      } else {
        this.data.error('Give value for the product you\'re bout to sell, will you?');
      }
    } else {
      this.data.error('The title of your product (work) is compulsory please');
    }
  }


  async post() {
    this.btnDisabled = true;
    try {
      if (this.validate(this.product)) {
        const form = new FormData();
        for (const key in this.product) {
          if (this.product.hasOwnProperty(key)) {
            if (key === 'product_picture') {
              form.append('product_picture', this.product.product_picture, this.product.product_picture.name);
            } else {
              form.append(key, this.product[key]);
            }
          }
        }
        const data = await this.rest.post(`${this.baseUrl}/seller/products`, form);
        data['success']
          ? this.data.success(data['message'])
          : this.data.error(data['message']);
      }
    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }


}
