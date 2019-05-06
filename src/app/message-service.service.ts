import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {
  constructor(private snackbar: MatSnackBar) { }

  openSnackbar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 4500,
    });
  }


}
