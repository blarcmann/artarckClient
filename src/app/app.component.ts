import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { RestApiService } from './rest-api.service';

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
  baseUrl = 'http://localhost:3000/api';
  userProfile: any;

  constructor (
    private router: Router,
    private rest: RestApiService,
    public data: DataService) {
      this.data.getProfile();
      this.data.cartItems = this.data.getCart().length;
      console.log(data.getProfile());
    }

  async ngOnInit() {
    await this.getUser();
  }

  async getUser() {
    try {
      const data = await this.rest.get(`${this.baseUrl}/accounts/profile`);
      console.log(data);
      data['success']
        ? this.userProfile = data['user']
        : this.data.error('Can\'t seem to get your info, pls FO')
    } catch (error) {
      this.data.error('Failed to get user data ATM');
    }
  }


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

  rootPage() {
    this.router.navigate(['/']);
  }

}

