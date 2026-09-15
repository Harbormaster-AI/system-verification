

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertRuleService } from '../../../services/AlertRule.service';
import { AlertRule } from '../../../models/AlertRule';

@Component({
    selector: 'app-index-alertRule',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexAlertRuleComponent implements OnInit {

    alertRules: AlertRule[] = [];

    constructor(
        private router: Router,
        private service: AlertRuleService
) {}

    ngOnInit(): void {
        this.getAlertRules();
}

    getAlertRules(): void {
        this.service.getAlertRules().subscribe((res) => {
        this.alertRules = res;
    });
}

    deleteAlertRule(id: any): void {
        this.service.deleteAlertRule(id)
            .subscribe(() => {
                this.getAlertRules();
            });
    }
}