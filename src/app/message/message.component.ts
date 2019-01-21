import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';

import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  message = '';
  constructor(private data: DataService,
              public snackbar: MatSnackBar) { }

  ngOnInit() {
    this.message = this.data.message;
    if (this.message) {
      this.openSnackbar(this.message, 'close');
    }
  }

  openSnackbar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 4500,
    });
  }

}
