
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../services/Alert.service';
import { Alert } from '../../../models/Alert';
import { SubBaseComponent } from '../../Alert/sub.base.component';

@Component({
    selector: 'app-create-alert',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateAlertComponent extends SubBaseComponent implements OnInit {

    title = 'Add Alert';

    alertForm: FormGroup;
    alert: Alert;

    constructor( http: HttpClient,
        private alertService: AlertService,
        private fb: FormBuilder,
        private router: Router
) {
        super(http);
        this.alertForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  raisedAt: ['', Validators.required],
      clearedAt: ['', Validators.required],
      message: ['', Validators.required],
      Device: ['', ],
      AlertRule: ['', ],
      Status: ['', ]
        });
    }

    
    addAlert(raisedAt, clearedAt, message, Device, AlertRule, Status): void {
        this.alertService
        .addAlert(raisedAt, clearedAt, message, Device, AlertRule, Status)
            .subscribe(() => {
                this.router.navigate(['/indexAlert']);
            });
    }

    ngOnInit(): void {
    }
}