import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  baseUrl = 'http://localhost:3000';
  categories: any;
  btnDisabled = false;
  newCategory: any;
  toggleReview: boolean;
  checkAddAbility = false;
  constructor(
    private data: DataService,
    private rest: RestApiService
  ) { }

  async ngOnInit() {
    if (localStorage.getItem('token') != '') {
      this.checkAddAbility = true;
    } else {
      this.checkAddAbility = false;
    }
    try {
      const data = await this.rest.get(`${this.baseUrl}/api/categories`);
      data['success']
        ? (this.categories = data['categories'])
        : this.data.error(data['message']);
    } catch (error) {
      this.data.error(error['message']);
    }
  }

  async addCategory() {
    this.btnDisabled = true;
    try {
      const data = await this.rest.post(`${this.baseUrl}/api/categories`, { category: this.newCategory });
      data['success']
        ? this.data.success(data['message'])
        : this.data.error(data['message']);
    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }

  showAddReview() {
    this.toggleReview = !this.toggleReview;
  }



}
