

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/Alert.service';
import { Alert } from '../../../models/Alert';

@Component({
    selector: 'app-index-alert',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexAlertComponent implements OnInit {

    alerts: Alert[] = [];

    constructor(
        private router: Router,
        private service: AlertService
) {}

    ngOnInit(): void {
        this.getAlerts();
}

    getAlerts(): void {
        this.service.getAlerts().subscribe((res) => {
        this.alerts = res;
    });
}

    deleteAlert(id: any): void {
        this.service.deleteAlert(id)
            .subscribe(() => {
                this.getAlerts();
            });
    }
}