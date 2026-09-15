
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MaintenanceTicketService } from '../../../services/MaintenanceTicket.service';
import { SubBaseComponent } from '../../MaintenanceTicket/sub.base.component';


@Component({
    selector: 'app-edit-maintenanceTicket',
    standalone: false,
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditMaintenanceTicketComponent extends SubBaseComponent implements OnInit {

    title = 'Edit MaintenanceTicket';

    maintenanceTicketForm: FormGroup;
    maintenanceTicket: any;

    constructor( http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private service: MaintenanceTicketService,
        private fb: FormBuilder
) {
        super(http);
        this.maintenanceTicketForm = this.createForm();
    }

    createForm(): FormGroup {
        return this.fb.group({
                  ticketNumber: ['', Validators.required],
      openedAt: ['', Validators.required],
      closedAt: ['', Validators.required],
      Device: ['', ],
      Tenant: ['', ],
      Priority: ['', ],
      Status: ['', ]
        });
    }

    
    updateMaintenanceTicket(ticketNumber, openedAt, closedAt, Device, Tenant, Priority, Status): void {
        this.route.params.subscribe((params) => {

                        this.service.updateMaintenanceTicket(ticketNumber, openedAt, closedAt, Device, Tenant, Priority, Status, params['id'])
                            .subscribe(() => {
                    this.router.navigate(['/indexMaintenanceTicket']);
                });
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.service.getMaintenanceTicket(params['id']).subscribe(res => {
                this.maintenanceTicket = res;
            });
        });
    }
}