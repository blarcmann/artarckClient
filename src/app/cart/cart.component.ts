import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';
import { MessageServiceService } from '../message-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  btnDisabled = false;
  handler: any;
  quantities = [];
  // StripeCheckout: any;
  baseUrl = 'http://localhost:3000/api';
  constructor(
    private router: Router,
    private rest: RestApiService,
    private data: DataService,
    private msgService: MessageServiceService
  ) { }

  ngOnInit() {
    this.cartItems.forEach(data => {
      this.quantities.push(1);
    });
    console.log(this.cartItems);
    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      image: 'assets/icons/logo.png',
      locale: 'auto',
      token: async stripeToken => {
        let products;
        products = [];
        this.cartItems.forEach((d, index) => {
          products.push({
            product: d['_id'],
            quantity: this.quantities[index]
          });
        });

        try {
          const data = await this.rest.post(`${this.baseUrl}/payment`, {
            totalPrice: this.cartTotal,
            products,
            stripeToken
          });
          data['success']
            ? (this.data.clearCart(), this.msgService.openSnackbar('Purchase successful!', 'close'))
            : this.msgService.openSnackbar(data['message'], 'retry');
        } catch (error) {
          this.msgService.openSnackbar(error['message'], 'retry');
        }
      }
    });
  }

  trackByCartItems(index: number, item: any) {
    return item._id;
  }

  get cartItems() {
    return this.data.getCart();
  }

  get cartTotal() {
    let total = 0;
    this.cartItems.forEach((data, index) => {
      total += data['price'] * this.quantities[index];
    });
    return total;
  }

  removeProduct(index, product) {
    this.quantities.splice(index, 1);
    this.data.removeFromCart(product);
  }

  validate() {
    if (!this.quantities.every(data => data > 0)) {
      this.msgService.openSnackbar('Quantity cannot be less than one :(', 'close');
    } else if (!localStorage.getItem('token')) {
      this.router.navigate(['/login'])
        .then(() => {
          this.msgService.openSnackbar('Nigga, login before purchasing na, 419 oshi :{', 'close');
        });
    } else if (!this.data.user['address']) {
      this.router.navigate(['/profile/address'])
        .then(() => {
          this.msgService.openSnackbar('Login before purchasing please!', 'close');
        });
    } else {
      this.data.message = '';
      return true;
    }
  }

  checkout() {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        this.handler.open({
          name: 'artarckrc',
          description: 'Checkout Payment',
          amount: this.cartTotal * 100,
          closed: () => {
            this.btnDisabled = false;
          }
        });
      } else {
        this.btnDisabled = false;
      }
    } catch (error) {

    }
  }

}
