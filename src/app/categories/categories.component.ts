import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import { MessageServiceService } from '../message-service.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: any;
  btnDisabled = false;
  newCategory: any;
  toggleReview: boolean;
  checkAddAbility: boolean;
  constructor(
    private data: DataService,
    private rest: RestApiService,
    private msgService: MessageServiceService
  ) { }

  async ngOnInit() {
    console.log('local token', localStorage.getItem('token'));
    if (localStorage.getItem('token')) {
      this.checkAddAbility = true;
    } else {
      this.checkAddAbility = false;
    }
    try {
      const data = await this.rest.get(`${this.data.baseUrl}/categories`);
      data['success']
        ? (this.categories = data['categories'])
        : this.msgService.openSnackbar(data['message'], 'reload page');
    } catch (error) {
      this.msgService.openSnackbar(error['message'], 'retry');
    }
  }

  async addCategory() {
    this.btnDisabled = true;
    try {
      const data = await this.rest.post(`${this.data.baseUrl}/categories`, { category: this.newCategory });
      data['success']
        ? this.msgService.openSnackbar(data['message'], 'okay')
        : this.msgService.openSnackbar(data['message'], 'retry');
    } catch (error) {
      this.msgService.openSnackbar(error['message'], 'errrhm');
    }
    this.btnDisabled = false;
  }

  showAddReview() {
    this.toggleReview = !this.toggleReview;
  }
}
