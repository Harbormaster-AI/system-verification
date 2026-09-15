
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DigitalTwinService } from '../../../services/DigitalTwin.service';
import { DigitalTwin } from '../../../models/DigitalTwin';
import { SubBaseComponent } from '../../DigitalTwin/sub.base.component';

@Component({
    selector: 'app-create-digitalTwin',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateDigitalTwinComponent extends SubBaseComponent implements OnInit {

    title = 'Add DigitalTwin';

    digitalTwinForm: FormGroup;
    digitalTwin: DigitalTwin;

    constructor( http: HttpClient,
        private digitalTwinService: DigitalTwinService,
        private fb: FormBuilder,
        private router: Router
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

    
    addDigitalTwin(twinId, desiredStateVersion, reportedStateVersion, lastSyncAt, Device, Gateway, Template, ChangeEvents): void {
        this.digitalTwinService
        .addDigitalTwin(twinId, desiredStateVersion, reportedStateVersion, lastSyncAt, Device, Gateway, Template, ChangeEvents)
            .subscribe(() => {
                this.router.navigate(['/indexDigitalTwin']);
            });
    }

    ngOnInit(): void {
    }
}