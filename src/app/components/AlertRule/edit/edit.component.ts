
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AlertRuleService } from '../../../services/AlertRule.service';
import { SubBaseComponent } from '../../AlertRule/sub.base.component';


@Component({
    selector: 'app-edit-alertRule',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditAlertRuleComponent extends SubBaseComponent implements OnInit {

    title = 'Edit AlertRule';

    alertRuleForm: FormGroup;
    alertRule: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: AlertRuleService,
        private fb: FormBuilder
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

    
    updateAlertRule(name, expression, Tenant, Streams, Alerts, Severity): void {
        this.route.params.subscribe((params) => {

                        this.service.updateAlertRule(name, expression, Tenant, Streams, Alerts, Severity, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexAlertRule']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getAlertRule(params['id']).subscribe(res => {
                this.alertRule = res;
            });
        });
    }
}