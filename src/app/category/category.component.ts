import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';

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
  // pageEvent: PageEvent;
  baseUrl = 'http://localhost:3000/api'
  constructor(
    private data: DataService,
    private rest: RestApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((res) => {
      this.categoryId = res['id'];
      this.getProducts();
    })
  }

  get lower() {
    return 12 * (this.page - 1) + 1;
  }

  get upper() {
    return Math.min(12 * this.page, this.category.totalProducts);
  }

  async getProducts(event?: any) {
    if (event) {
      this.category = null
    }
    try {
      const data = await this.rest.get(`${this.baseUrl}/categories/${this.categoryId}?page=${this.page - 1}`);
      data['success']
        ? (this.category = data)
        : this.data.error(data['message']);
    }
    catch (error) {
      this.data.error(error['message']);
    }
  }


}
