
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertRuleService } from '../../../services/AlertRule.service';
import { AlertRule } from '../../../models/AlertRule';
import { SubBaseComponent } from '../../AlertRule/sub.base.component';

@Component({
    selector: 'app-create-alertRule',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateAlertRuleComponent extends SubBaseComponent implements OnInit {

    title = 'Add AlertRule';

    alertRuleForm: FormGroup;
    alertRule: AlertRule;

    constructor( http: HttpClient,
        private alertRuleService: AlertRuleService,
        private fb: FormBuilder,
        private router: Router
) {
        super(http);
        this.alertRuleForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  name: ['', Validators.required],
      expression: ['', Validators.required],
      Tenant: ['', ],
      Streams: ['', ],
      Alerts: ['', ],
      Severity: ['', ]
        });
    }

    
    addAlertRule(name, expression, Tenant, Streams, Alerts, Severity): void {
        this.alertRuleService
        .addAlertRule(name, expression, Tenant, Streams, Alerts, Severity)
            .subscribe(() => {
                this.router.navigate(['/indexAlertRule']);
            });
    }

    ngOnInit(): void {
    }
}