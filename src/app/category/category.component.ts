import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import { MessageServiceService } from '../message-service.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryId: any;
  category: any;
  page = 1;
  pageSize = 12;
  offset: any;
  naira = '₦';
  constructor(
    private data: DataService,
    private rest: RestApiService,
    private activatedRoute: ActivatedRoute,
    private msgService: MessageServiceService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((res) => {
      this.categoryId = res['id'];
      this.getProducts();
    });
  }

  get lower() {
    return 12 * (this.page - 1) + 1;
  }

  get upper() {
    return Math.min(12 * this.page, this.category.totalProducts);
  }

  async getProducts(event?: any) {
    if (event) {
      this.category = null;
    }
    try {
      const data = await this.rest.get(`${this.data.baseUrl}/categories/${this.categoryId}?page=${this.page - 1}`);
      data['success']
        ? (this.category = data)
        : this.msgService.openSnackbar(data['message'], 'retry');
    } catch (error) {
      this.msgService.openSnackbar(error['message'], 'errhm');
    }
  }


}
