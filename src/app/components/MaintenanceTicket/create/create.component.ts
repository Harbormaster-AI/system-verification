
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaintenanceTicketService } from '../../../services/MaintenanceTicket.service';
import { MaintenanceTicket } from '../../../models/MaintenanceTicket';
import { SubBaseComponent } from '../../MaintenanceTicket/sub.base.component';

@Component({
    selector: 'app-create-maintenanceTicket',
    standalone: false,
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateMaintenanceTicketComponent extends SubBaseComponent implements OnInit {

    title = 'Add MaintenanceTicket';

    maintenanceTicketForm: FormGroup;
    maintenanceTicket: MaintenanceTicket;

    constructor( http: HttpClient,
        private maintenanceTicketService: MaintenanceTicketService,
        private fb: FormBuilder,
        private router: Router
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

    
    addMaintenanceTicket(ticketNumber, openedAt, closedAt, Device, Tenant, Priority, Status): void {
        this.maintenanceTicketService
        .addMaintenanceTicket(ticketNumber, openedAt, closedAt, Device, Tenant, Priority, Status)
            .subscribe(() => {
                this.router.navigate(['/indexMaintenanceTicket']);
            });
    }

    ngOnInit(): void {
    }
}