import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute } from '@angular/router';
import { MessageServiceService } from '../message-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  query: string;
  page = 1;
  content: any;
  naira = '₦';
  noResult = false;
  constructor(
    private data: DataService,
    private rest: RestApiService,
    private activatedRoute: ActivatedRoute,
    private msgService: MessageServiceService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((res) => {
      this.query = res['query'];
      this.page = 1;
      this.getProducts();
    });
    if (!this.content) {
      setTimeout(() => {
        this.noResult = true;
      }, 10000);
    }
  }

  get lower() {
    return 1 + this.content.hitsPerPage * this.content.page;
  }

  get upper() {
    return Math.min(this.content.hitsPerPage * (this.content.page * 1), this.content.nbHits);
  }

  async getProducts() {
    this.content = null;
    try {
      const data = await this.rest.get(`${this.data.baseUrl}/search/q?queryParam=${this.query}&page=${this.page - 1}`);
      console.log('data', data);
      this.data = this.content;
      data['success']
        ? (this.content = data)
        : this.msgService.openSnackbar(data['message'], 'close');
    } catch (error) {
      this.msgService.openSnackbar(error['message'], 'retry');
    }
  }

}
