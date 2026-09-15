

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TwinChangeEventService } from '../../../services/TwinChangeEvent.service';
import { TwinChangeEvent } from '../../../models/TwinChangeEvent';

@Component({
    selector: 'app-index-twinChangeEvent',
    standalone: false,
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexTwinChangeEventComponent implements OnInit {

    twinChangeEvents: TwinChangeEvent[] = [];

    constructor(
        private router: Router,
        private service: TwinChangeEventService
) {}

    ngOnInit(): void {
        this.getTwinChangeEvents();
}

    getTwinChangeEvents(): void {
        this.service.getTwinChangeEvents().subscribe((res) => {
        this.twinChangeEvents = res;
    });
}

    deleteTwinChangeEvent(id: any): void {
        this.service.deleteTwinChangeEvent(id)
            .subscribe(() => {
                this.getTwinChangeEvents();
            });
    }
}