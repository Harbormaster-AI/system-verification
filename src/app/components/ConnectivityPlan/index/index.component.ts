

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectivityPlanService } from '../../../services/ConnectivityPlan.service';
import { ConnectivityPlan } from '../../../models/ConnectivityPlan';

@Component({
    selector: 'app-index-connectivityPlan',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexConnectivityPlanComponent implements OnInit {

    connectivityPlans: ConnectivityPlan[] = [];

    constructor(
        private router: Router,
        private service: ConnectivityPlanService
) {}

    ngOnInit(): void {
        this.getConnectivityPlans();
}

    getConnectivityPlans(): void {
        this.service.getConnectivityPlans().subscribe((res) => {
        this.connectivityPlans = res;
    });
}

    deleteConnectivityPlan(id: any): void {
        this.service.deleteConnectivityPlan(id)
            .subscribe(() => {
                this.getConnectivityPlans();
            });
    }
}