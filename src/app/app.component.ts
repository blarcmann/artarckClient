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

  constructor(
    private router: Router,
    private data: DataService
    ) {
      this.data.getProfile();
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

