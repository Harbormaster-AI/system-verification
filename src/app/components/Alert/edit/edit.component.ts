
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AlertService } from '../../../services/Alert.service';
import { SubBaseComponent } from '../../Alert/sub.base.component';


@Component({
    selector: 'app-edit-alert',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditAlertComponent extends SubBaseComponent implements OnInit {

    title = 'Edit Alert';

    alertForm: FormGroup;
    alert: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: AlertService,
        private fb: FormBuilder
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

    
    updateAlert(raisedAt, clearedAt, message, Device, AlertRule, Status): void {
        this.route.params.subscribe((params) => {

                        this.service.updateAlert(raisedAt, clearedAt, message, Device, AlertRule, Status, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexAlert']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getAlert(params['id']).subscribe(res => {
                this.alert = res;
            });
        });
    }
}