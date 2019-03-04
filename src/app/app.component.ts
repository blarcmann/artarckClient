import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Where Art Lives!';
  isCollapsed = true;
  searchTerm = '';
  StripeCheckout: any;

  constructor(
    private router: Router,
    public data: DataService
    ) {
      this.data.getProfile();
      this.data.cartItems = this.data.getCart().length;
    }

  ngOnInit() {}


  get token() {
    return localStorage.getItem('token');
  }

  collapse() {
    this.isCollapsed = true;
  }

  closeDropdown(dropdown) {
    dropdown.close();
  }

  logout() {
    this.data.user = {};
    this.data.cartItems = 0;
    localStorage.clear();
    this.router.navigate(['']);
  }

  search() {
    if (this.searchTerm) {
      this.router.navigate(['search', { query: this.searchTerm }]);
      console.log(`${this.searchTerm} entered`);
    }
    console.log(`search triggered`);
  }

}

