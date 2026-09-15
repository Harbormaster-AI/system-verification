
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TwinChangeEventService } from '../../../services/TwinChangeEvent.service';
import { SubBaseComponent } from '../../TwinChangeEvent/sub.base.component';


@Component({
    selector: 'app-edit-twinChangeEvent',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditTwinChangeEventComponent extends SubBaseComponent implements OnInit {

    title = 'Edit TwinChangeEvent';

    twinChangeEventForm: FormGroup;
    twinChangeEvent: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: TwinChangeEventService,
        private fb: FormBuilder
) {
        super(http);
        this.twinChangeEventForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  eventId: ['', Validators.required],
      occurredAt: ['', Validators.required],
      Twin: ['', ],
      ChangeType: ['', ]
        });
    }

    
    updateTwinChangeEvent(eventId, occurredAt, Twin, ChangeType): void {
        this.route.params.subscribe((params) => {

                        this.service.updateTwinChangeEvent(eventId, occurredAt, Twin, ChangeType, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexTwinChangeEvent']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getTwinChangeEvent(params['id']).subscribe(res => {
                this.twinChangeEvent = res;
            });
        });
    }
}