import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';
import { MessageServiceService } from '../message-service.service';
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
  image = 'https://hd.unsplash.com/photo-1463415268136-e52a5af54519';
  baseUrl = 'http://localhost:3000/api';

  constructor(
    private data: DataService,
    private rest: RestApiService,
    private router: Router,
    private msgService: MessageServiceService
  ) { }

  async ngOnInit() {
    try {
      const data = await this.rest.get(`${this.baseUrl}/categories`);
      data['success']
        ? (this.categories = data['categories'])
        : (this.msgService.openSnackbar(data['message'], 'retry'));
    } catch (error) {
      this.msgService.openSnackbar(error['message'], 'retry');
    }
  }

  fileChange(event: any) {
    this.product.product_picture = event.target.files[0];
  }

  validate(product) {
    if (product.title) {
      if (product.price) {
        if (product.categoryId) {
          if (product.description) {
            if (product.product_picture) {
              return true;
            } else {
              this.msgService.openSnackbar('Please do provide product picture', 'close');
              console.log('Please do provide product picture');
            }
          } else {
            this.msgService.openSnackbar('Please describe your product (work)', 'close');
            console.log('Please describe your product (work)');
          }
        } else {
          this.msgService.openSnackbar('Please do select a category to proceed', 'close');
          console.log('Please do select a category to proceed');
        }
      } else {
        this.msgService.openSnackbar('Give value for the product you\'re bout to sell, will you?', 'close');
        console.log('Give value for the product you\'re bout to sell, will you?');
      }
    } else {
      this.msgService.openSnackbar('The title of your product (work) is compulsory please', 'close');
      console.log('The title of your product (work) is compulsory please');
    }
  }


  async post() {
    this.btnDisabled = true;
    try {
      console.log('post call');
      if (this.validate(this.product)) {
        console.log('product validated');
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
          ? this.router.navigate(['/profile/myproducts'])
            .then(() => this.msgService.openSnackbar(data['message'], 'close'))
            .catch(error => this.msgService.openSnackbar(error, 'retry'))
          : this.msgService.openSnackbar(data['message'], 'retry');
      }
    } catch (error) {
      this.msgService.openSnackbar(error['message'], 'retry');
    }
    this.btnDisabled = false;
  }

}
