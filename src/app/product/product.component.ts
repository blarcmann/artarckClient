import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: any;
  baseUrl = 'http://localhost:3000/api';
  myReview = {
    title: '',
    description: '',
    rating: 0
  }
  btnDisabled = false;
  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute,
    private rest: RestApiService,
    private router: Router

  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((res) => {
      this.rest.get(`${this.baseUrl}/product/${res['id']}`)
        .then(data => {
          console.log( data['product'])
          data['success']
            ? (this.product = data['product'])
            : this.router.navigate(['/']);
        })
        .catch(error => this.data.error(error['message']));
    })
  }

  async postReview() {
    this.btnDisabled = true;
    try {
      const data = this.rest.post(`${this.baseUrl}/review`, {
        productId: this.product._id,
        title: this.myReview.title,
        description: this.myReview.description,
        rating: this.myReview.rating
      });
      data['success']
        ? this.data.success(data['message'])
        : this.data.error(data['message'])
    } catch (error) {
      this.data.error(error['message'])
    }
    this.btnDisabled = false;
  }

  addToCart() {
    this.data.addToCart(this.product)
      ? this.data.success('Product Successfully added to cart!')
      : this.data.error('Seems, there\'s recursion, please retry!')
  }

}
