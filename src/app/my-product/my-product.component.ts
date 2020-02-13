import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';
import { MessageServiceService } from '../message-service.service';

@Component({
  selector: 'app-my-product',
  templateUrl: './my-product.component.html',
  styleUrls: ['./my-product.component.scss']
})
export class MyProductComponent implements OnInit {
  products: any;
  baseUrl = 'http://localhost:3000/api';
  naira = '₦';
  constructor(
    private rest: RestApiService,
    private data: DataService,
    private msgService: MessageServiceService
  ) { }

  async ngOnInit() {
    try {
      const data = await this.rest.get(`${this.baseUrl}/seller/products`);
      data['success']
        ? (this.products = data['products'])
        : this.msgService.openSnackbar(data['message'], 'close');
      console.log(this.products);
    } catch (error) {
      this.msgService.openSnackbar(error['message'], 'close');
    }
  }

}

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  constructor() { }
  transform(value: string, limit: number, trail: String = '…'): string {
    let result = value || '';
    if (value) {
      const words = value.split(/\s+/);
      if (words.length > Math.abs(limit)) {
        if (limit < 0) {
          limit *= -1;
          result = trail + words.slice(words.length - limit, words.length).join(' ');
        } else {
          result = words.slice(0, limit).join(' ') + trail;
        }
      }
    }
    return result;
  }
}
