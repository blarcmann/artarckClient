import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() disableClose = true;
  token = true;
  searchTerm = '';
  reviews: any;
  constructor(
    private router: Router,
    private data: DataService) { }

  ngOnInit() {
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

  rootPage() {
    this.router.navigate(['/']);
  }
}
