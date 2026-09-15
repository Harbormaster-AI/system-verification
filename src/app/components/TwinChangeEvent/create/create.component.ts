
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TwinChangeEventService } from '../../../services/TwinChangeEvent.service';
import { TwinChangeEvent } from '../../../models/TwinChangeEvent';
import { SubBaseComponent } from '../../TwinChangeEvent/sub.base.component';

@Component({
    selector: 'app-create-twinChangeEvent',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateTwinChangeEventComponent extends SubBaseComponent implements OnInit {

    title = 'Add TwinChangeEvent';

    twinChangeEventForm: FormGroup;
    twinChangeEvent: TwinChangeEvent;

    constructor( http: HttpClient,
        private twinChangeEventService: TwinChangeEventService,
        private fb: FormBuilder,
        private router: Router
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

    
    addTwinChangeEvent(eventId, occurredAt, Twin, ChangeType): void {
        this.twinChangeEventService
        .addTwinChangeEvent(eventId, occurredAt, Twin, ChangeType)
            .subscribe(() => {
                this.router.navigate(['/indexTwinChangeEvent']);
            });
    }

    ngOnInit(): void {
    }
}