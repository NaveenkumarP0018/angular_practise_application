
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AlertMessageService {
    constructor(private snackBar: MatSnackBar) { }
    showAlert(msg: string) {
        const config = new MatSnackBarConfig();
        config.duration = 3000;
        this.snackBar.open(msg, 'ok', config);
    }
}