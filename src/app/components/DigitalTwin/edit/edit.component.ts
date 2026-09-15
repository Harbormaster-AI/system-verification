
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DigitalTwinService } from '../../../services/DigitalTwin.service';
import { SubBaseComponent } from '../../DigitalTwin/sub.base.component';


@Component({
    selector: 'app-edit-digitalTwin',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditDigitalTwinComponent extends SubBaseComponent implements OnInit {

    title = 'Edit DigitalTwin';

    digitalTwinForm: FormGroup;
    digitalTwin: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: DigitalTwinService,
        private fb: FormBuilder
) {
        super(http);
        this.digitalTwinForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  twinId: ['', Validators.required],
      desiredStateVersion: ['', Validators.required],
      reportedStateVersion: ['', Validators.required],
      lastSyncAt: ['', Validators.required],
      Device: ['', ],
      Gateway: ['', ],
      Template: ['', ],
      ChangeEvents: ['', ]
        });
    }

    
    updateDigitalTwin(twinId, desiredStateVersion, reportedStateVersion, lastSyncAt, Device, Gateway, Template, ChangeEvents): void {
        this.route.params.subscribe((params) => {

                        this.service.updateDigitalTwin(twinId, desiredStateVersion, reportedStateVersion, lastSyncAt, Device, Gateway, Template, ChangeEvents, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexDigitalTwin']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getDigitalTwin(params['id']).subscribe(res => {
                this.digitalTwin = res;
            });
        });
    }
}