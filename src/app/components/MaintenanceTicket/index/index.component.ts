

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaintenanceTicketService } from '../../../services/MaintenanceTicket.service';
import { MaintenanceTicket } from '../../../models/MaintenanceTicket';

@Component({
    selector: 'app-index-maintenanceTicket',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexMaintenanceTicketComponent implements OnInit {

    maintenanceTickets: MaintenanceTicket[] = [];

    constructor(
        private router: Router,
        private service: MaintenanceTicketService
) {}

    ngOnInit(): void {
        this.getMaintenanceTickets();
}

    getMaintenanceTickets(): void {
        this.service.getMaintenanceTickets().subscribe((res) => {
        this.maintenanceTickets = res;
    });
}

    deleteMaintenanceTicket(id: any): void {
        this.service.deleteMaintenanceTicket(id)
            .subscribe(() => {
                this.getMaintenanceTickets();
            });
    }
}